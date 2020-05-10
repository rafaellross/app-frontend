import React, { Component } from 'react'

import MaterialTable, {MTableToolbar} from 'material-table'



import Divider from '@material-ui/core/Divider';

class DataTable extends Component {

    render() {
      return (
        <div>

          <MaterialTable
          style={this.props.style}
          title={this.props.title}
          columns={this.props.columns}
          data={this.props.data}
          options={{
            selection: true,
            exportButton: true,
            pageSizeOptions: [30, 60, 120, 240, 1000],
            pageSize: 30,

          }}

          components={{
            Toolbar: props => (

              <div>

                <MTableToolbar {...props} />
                <Divider variant="middle" style={{marginBottom: 10}}/>
                {this.props.toolBar}
              </div>
            ),
          }}




          actions={[
              {
                tooltip: 'Remove All Selected Users',
                icon: 'delete',
                onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
              },
              {
                icon: 'print',
                tooltip: 'Print Selecteds',
                onClick: (event, data) => alert("You printed " + data.length)
              }

          ]}
        />
        </div>

      )
    }
  }
export default DataTable
