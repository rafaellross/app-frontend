import React, { Component } from 'react'
import Print from '@material-ui/icons/Print';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import Image from '@material-ui/icons/Image';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { connect } from 'react-redux'
import DataTable from '../../Components/DataTable/DataTable'
import {
    handleDeleteQa
 } from "../../Redux/Actions/qas";


export class Qas extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.state = {
            columns: [
                { title: '#', field: 'id', type: 'numeric'},
                { title: 'username', field: 'username' },
                { title: 'Q.A Type', field: 'qa_type'},
                { title: 'Job', field: 'job'},
                { title: 'Customer', field: 'customer'},
                { title: 'Site Manager', field: 'site_manager'},
                { title: 'Update Date', field: 'updated_at'},
                {
                    field: 'edit',
                    title: 'Edit',
                    render: rowData => (
                        <Link to={`/qa/edit/${rowData.id}`}><Edit /></Link>
                    )
                } ,
                {
                    field: 'print_qa',
                    title: 'Print Q.A',
                    render: rowData => (
                            <Link to={`/qas/report/${rowData.id}`} target="_blank"><Print /></Link>
                        )
                } ,
                {
                    field: 'photos',
                    title: 'Photo',
                    render: rowData => (
                        <div>
                              {rowData.photos > 0 ? <Tooltip title={`This Q.A has ${rowData.photos} photo(s)`} aria-label="photo"><Image/></Tooltip> : <Tooltip title="No Photo" aria-label="photo"><HighlightOff color="secondary"/></Tooltip>}
                        </div>
                        )
                } ,
            ],
        }
    }

    toggleColumn(columnToggle) {
        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    handleDelete = (selecteds) => {
        this.props.dispatch(handleDeleteQa(selecteds))
    }

    render() {
        return (
                <DataTable
                    addPath={'/qas/add'}
                    filters={[]}
                    toggleColumn={this.toggleColumn}
                    style={{maxWidth: '100%', padding: 20}}
                    columns={this.state.columns}
                    title="Q.A Sign Off "
                    data={this.props.qas}
                    isLoading={this.state.loading}
                    handleDelete={this.handleDelete}
                />
        )
    }
}

export default connect((state) => ({
    qas: state.qas,
    loading: state.loading
  }))(Qas)
