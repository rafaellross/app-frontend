import React, { Component } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import * as API from '../../Api'
import { Link } from 'react-router-dom'
import Edit from '@material-ui/icons/Edit'
import { connect } from 'react-redux'
import {
    handleReceiveEstimates
  }
   from '../../Redux/Actions/estimates';


export class Estimates extends Component {

    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);

        this.state = {
            loading: true,
            selecteds: [],
            estimates: [],
            columns: [
                { hidden: true, title: '#', field: 'id', width: 5,  cellStyle: {width: 2}},
                { hidden: false, title: 'Customer', field: 'customer'},
                { hidden: false, title: 'Project', field: 'name'},
                { hidden: false, title: 'Date Added', field: 'add_dt', type: 'date'},
                { hidden: false, title: 'Due Date', field: 'due_dt', type: 'date'},
                { hidden: false, title: 'Street Address', field: 'street_address'},
                { hidden: false, title: 'Suburb', field: 'suburb'},
                { hidden: false, title: 'State', field: 'state'},
                { hidden: false, title: 'Post Code', field: 'post_code'},
                {
                  field: 'edit',
                  hidden: false, title: 'Edit',
                  export: false,
                  render: rowData => (
                      <div>
                          <Link to={`/estimates/edit/${rowData.id}`}><Edit /></Link>
                      </div>
                      )
              }
            ]
        }
        this.handlePrint = this.handlePrint.bind(this);
    }

    componentDidMount(){
      const { dispatch } = this.props
      dispatch(handleReceiveEstimates())
    }

    handlePrint(selecteds) {
      /*
        const idsToPrint = selecteds.map(item => item.id);
        this.props.history.push({
            pathname: '/timesheets/print',
            state: { timesheets: idsToPrint }
          })
          */
    }

    toggleColumn(columnToggle) {

        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    render() {

        return (
                <DataTable
                    addPath={'/estimates/add'}
                    filters={[]}
                    handlePrint={this.handlePrint}
                    toggleColumn={this.toggleColumn}
                    style={{maxWidth: '100%', padding: 10}}
                    columns={this.state.columns}
                    title="Estimates"
                    data={this.props.estimates}
                    isLoading={this.state.loading}
                />
        )
    }
}


export default connect((state) => ({
    estimates: state.estimates,
    loading: state.loading
  }))(Estimates)
