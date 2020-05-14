import React, { Component } from 'react'
import DataTable from '../../../Components/DataTable'
import * as API from '../../../Api'
import Fireplace from '@material-ui/icons/Fireplace';

import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SplitButton from '../../../Components/Shared/SplitButton';
import AddMultiplePenetrations from '../../../Components/Job/Penetration/AddMultiplePenetrations';


export class Penetrations extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        
        this.state = {
            modalAdd: false,
            columns: [
                    
                { title: '#', field: 'id', type: 'numeric'},
                { title: 'Drawing', field: 'drawing' },
                { title: 'Fire Seal Ref.', field: 'fire_seal_ref'},
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
    
                
            ],        
        }
    
    }
    
    loadData (table) {
        API.getAll(table, this.props.match.params.job)
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



    componentDidMount() {
        
        this.loadData('fire_identifications')
    }

    render() {
        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 1+'px'}}>
                            <SplitButton 
                                title={"Add Penetrations"} 
                                buttons={
                                    [
                                        {title: 'Add Single Penetration', action: <Button><Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/jobs/penetrations/${this.props.match.params.job}/add`}>Add Single Penetration</Link></Button>}, 
                                        {title: 'Add Multiple Penetrations', action: <AddMultiplePenetrations/>}]}/>
                        </ButtonGroup>
        
        const toolBar = <div>{buttons}</div>

        return (
            <div>
                <DataTable toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} table={"fire_identifications"} title="Penetrations" data={this.state.data} isLoading={this.state.loading}/>
            </div>
        )
    }
}

export default Penetrations


