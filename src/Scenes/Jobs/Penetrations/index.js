import React, { Component } from 'react'
import DataTable from '../../../Components/DataTable'
import * as API from '../../../Api'
import CustomModal from '../../../Components/Shared/CustomModal'


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


export class Penetrations extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.openModalPrint = this.openModalPrint.bind(this);
        this.closeModalPrint = this.closeModalPrint.bind(this);
        
        this.state = {
            selecteds: [],
            modalPrint: false,
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
                              {rowData.photo_path ? <Tooltip title="This penetration has a photo" aria-label="photo"><Image/></Tooltip> : <Tooltip title="No Photo" aria-label="photo"><HighlightOff/></Tooltip>}                      
                        </div>
                        )
                } ,                           
    
                
            ],        
        }
    
    }
    
 async loadData (table) {
        await API.getAll(table, this.props.match.params.job)
        .then((data) => {            
            this.setState(() => ({
                data: data,
                loading: false
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
                    {rowData.photo_path ? <img src={rowData.photo_path}/> : <h3>No Photo</h3>}  
                    
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
        
        const toolBar = <div>{buttons}</div>
        if(this.state.loading || !this.state.data) {
            return <h3 style={{textAlign: 'center'}}>Loading...</h3>
        } else {
            return (
                <div>
                    <DataTable handlePrint={this.openModalPrint} detailPanel={this.state.data ? detailPanel : {}} toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} table={"fire_identifications"} title="Penetrations" data={this.state.data} isLoading={this.state.loading}/>
                    <CustomModal children={<FireRegister data={this.state.selecteds}/>} open={this.state.modalPrint} handleClose={() => this.closeModalPrint()}/>
                </div>
            )    
        }

    }
}

export default Penetrations


