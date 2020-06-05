import React, { Component } from 'react'
import DataTable from '../../../Components/DataTable/DataTable'
import * as API from '../../../Api'
import CustomModal from '../../../Components/Shared/CustomModal'
import Switch from '@material-ui/core/Switch';

import Edit from '@material-ui/icons/Edit';
import Image from '@material-ui/icons/Image';
import HighlightOff from '@material-ui/icons/HighlightOff';

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import SplitButton from '../../../Components/Shared/SplitButton';
import AddMultiplePenetrations from '../../../Components/Job/Penetration/AddMultiplePenetrations';
import FireRegister  from '../../../Reports/Job/FireRegister';

import { PDFDownloadLink } from '@react-pdf/renderer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CircularProgress from '@material-ui/core/CircularProgress';

const Report = (props) => (
    <CustomModal open={props.open} handleClose={props.handleClose}>
      <PDFDownloadLink document={<FireRegister data={props.data} project={props.project}/>} fileName={props.project.description}>
        {({ blob, url, loading, error }) => (loading ? <CircularProgress disableShrink style={{marginLeft: '50%', left: '-4em'}} /> : 'Download now!')}
      </PDFDownloadLink>
    </CustomModal>
  )


export class Penetrations extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.openModalPrint = this.openModalPrint.bind(this);
        this.closeModalPrint = this.closeModalPrint.bind(this);
        this.openReport = this.openReport.bind(this);
        this.toggleMissingPhoto = this.toggleMissingPhoto.bind(this);

        this.state = {
            selecteds: [],
            drawings: [],
            selectedDrawing: 'A',
            missingPhotos: false,
            modalPrint: false,
            job: {},
            modalAdd: true,
            columns: [

                { title: '#', field: 'id', type: 'numeric', searchable: false},
                { title: 'Drawing', field: 'drawing' },
                { title: 'Fire Seal Ref.', field: 'fire_number'},
                { title: 'Fire Resistance Level (FRL)', field: 'fire_resist_level'},
                { title: 'Installed By', field: 'install_by'},
                { title: 'Installed Date', field: 'install_dt', type: 'date'},

                {
                    field: 'edit',
                    title: 'Edit',
                    render: rowData => (
                        <div>
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/jobs/penetrations/${this.props.match.params.job}/edit/${rowData.id}`}><Edit /></Link>
                        </div>
                        )
                } ,
                {
                    field: 'fire_photo',
                    title: 'Photo',
                    render: rowData => (
                        <div>
                              {rowData.photo_path ? <Tooltip title="This penetration has a photo" aria-label="photo"><Image/></Tooltip> : <Tooltip title="No Photo" aria-label="photo"><HighlightOff color="secondary"/></Tooltip>}
                        </div>
                        )
                } ,


            ],
        }

    }


    toggleMissingPhoto() {
        this.setState((prevState, props) => ({
            missingPhotos: !prevState.missingPhotos
        }))
        this.loadData('fire_identifications')

    }

 async loadData (table) {


        await API.getAll(table, this.props.match.params.job)
        .then((data) => {
            this.setState(() => ({
                data: this.filterPenetrations(data),
                loading: false,
                drawings: this.getDrawings(data)
          }))
        })
    }

    toggleColumn(columnToggle) {

        console.log(columnToggle)


        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    getDrawings(data) {
        return [...new Set(data.map(penetration => penetration.drawing))].sort()
    }



    openModalPrint(data) {

        this.setState((prevState, props) => ({
            modalPrint: true,
            selecteds: data
        }))
    }

    closeModalPrint() {
        this.setState(() => ({
            modalPrint: false
        }))

    }

    componentDidMount() {
        API.get('jobs', this.props.match.params.job)
        .then((job) => {
            this.setState(() => ({
                job: job
          }))
        })

        this.loadData('fire_identifications')
    }

    openReport(data) {


        this.setState((prevState, props) => ({
            modalPrint: true,
            selecteds: data
        }))

    }


    filterDrawing(data) {
        console.log('Filter Job', this.state.selectedDrawing);
        if (this.state.selectedDrawing === 'A') {
            console.log('Returned all Penetrations');
            return data;
        } else {
            console.log('Returned Drawing', this.state.selectedDrawing);
            return data.filter(penetration => penetration.drawing === this.state.selectedDrawing)
        }
    }

    filterMissingPhoto(data) {
        if (this.state.missingPhotos) {
            return data.filter(penetration => !penetration.photo_path)
        } else {
            return data;
        }
    }



    filterPenetrations(data) {

        let filterMissing = this.filterMissingPhoto(data);
        let filterDrawing = this.filterDrawing(filterMissing);
        return filterDrawing;
    }


    changeDrawing(drawing) {
        console.log('Method change drawing: ', drawing);
        this.setState(() => ({
            selectedDrawing: drawing
        }))

        this.loadData('fire_identifications')
    }

    render() {
        const detailPanel=[
            {
              tooltip: 'Show Photo',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                    }}
                  >
                    {rowData.photo_path ? <img src={rowData.photo_path} alt=""/> : <h3>No Photo</h3>}

                  </div>
                )
              },
            },
          ]

        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 1+'px'}}>
                            <SplitButton
                                title={"Add Penetrations"}
                                buttons={
                                    [
                                        {title: 'Add Single Penetration', action: <Button><Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/jobs/penetrations/${this.props.match.params.job}/add`}>Add Single Penetration</Link></Button>},
                                        {title: 'Add Multiple Penetrations', action: <AddMultiplePenetrations/>}]}/>
                        </ButtonGroup>


        const showMissingPhoto = <FormControlLabel value="inactives" control={<Switch checked={this.state.missingPhotos} onChange={(e) => this.toggleMissingPhoto(e)} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>} label="Show Photos Missing Only" labelPlacement="bottom" />;

        const selectDrawing =     <FormControl style={{width: 200, marginLeft: 10}} >
                                    <InputLabel id="demo-simple-select-label">Select Drawing</InputLabel>
                                    <Select
                                    labelId="select-drawing-label"
                                    id="select-drawing-label"
                                    onChange={(e) => this.changeDrawing(e.target.value)}
                                    value={this.state.selectedDrawing}
                                    >
                                    <MenuItem value="A">All</MenuItem>
                                    {this.state.drawings.map(drawing => {
                                    return (<MenuItem key={drawing} value={drawing}>{drawing}</MenuItem>)
                                    })}


                                    </Select>
                                </FormControl>

        const toolBar = <div>{buttons} {showMissingPhoto} {selectDrawing}</div>
        if(this.state.loading || !this.state.data) {
            return <h3 style={{textAlign: 'center'}}>Loading...</h3>
        } else {
            return (
                <div>

                    <Report
                        data={this.state.selecteds}
                        fileName="file.pdf"
                        project={this.state.job}
                        open={this.state.modalPrint} handleClose={this.closeModalPrint}/>

                    <DataTable
                        handlePrint={this.openReport}
                        filters={[]}
                        buttons={[{color: 'primary', path: `/jobs/penetrations/${this.props.match.params.job}/add`}]}
                        detailPanel={this.state.data ? detailPanel : {}}
                        toggleColumn={this.toggleColumn}
                        toolBar={toolBar}
                        style={{maxWidth: '80%', marginLeft: '10%', padding: 10}}
                        columns={this.state.columns} table={"fire_identifications"}
                        title="Penetrations"
                        data={this.state.data}
                        isLoading={this.state.loading}/>
                </div>
            )
        }

    }
}

export default Penetrations


