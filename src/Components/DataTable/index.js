import React, { Component } from 'react'
import MaterialTable, {MTableToolbar} from 'material-table'
import Divider from '@material-ui/core/Divider';
import ColumnFilter from './ColumnFilter';
import PropTypes from 'prop-types';


class DataTable extends Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }


   async handleToggle(column) {
      await this.props.toggleColumn(column)
      

    }

    render() {
      if(this.props.loading || !this.props.data) {
        return <h3 style={{textAlign: 'center'}}>Loading...</h3>
    } else {

    
      return (

        <div style={{marginTop: 10}}>

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
            maxBodyHeight: '80vh',
            padding: 'dense'

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
                onClick: (event, data) => console.log(data)
              },

              {
                icon: () => <ColumnFilter columns={this.props.columns} handleToggle={(e)=> this.handleToggle(e)}/>,
                tooltip: 'Hide/Show Columns',
                isFreeAction: true,
                onClick: () => null
              },

              

          ]}

          detailPanel={this.props.detailPanel}
          onRowClick={(event, rowData, togglePanel) => this.togglePanel.bind(this)}
        />
        </div>

      )
    }
  }
  }

  DataTable.propTypes = {
    toggleColumn: PropTypes.func.isRequired
  };

export default DataTable
