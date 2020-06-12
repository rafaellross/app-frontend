import React, { Component } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import Divider from '@material-ui/core/Divider';
import ColumnFilter from './ColumnFilter';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom'
import PublishIcon from '@material-ui/icons/Publish';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
class DataTable extends Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  async handleToggle(column) {
    await this.props.toggleColumn(column)
  }

  render() {

    return (
      <div style={{ marginTop: 10 }}>
        <MaterialTable
          style={this.props.style}
          title={this.props.title}
          columns={[{ hidden: false, title: '#', field: 'id', headerStyle: { width: '200px' } }, ...this.props.columns]}
          data={this.props.data}
          options={{
            selection: true,
            exportButton: true,
            pageSizeOptions: this.props.data && Math.max(60, this.props.data.length) > 60 ? [30, 60, this.props.data.length] : [30, 60],
            pageSize: 30,
            maxBodyHeight: '80vh',
            padding: 'dense'
          }}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <Divider variant="middle" style={{ marginBottom: 10 }} />
                {this.props.switch}
                {this.props.filters.map(filter => (
                  <FormControl style={{ width: 200 }} key={filter.description}>
                    <InputLabel id="demo-simple-select-label">{filter.description}</InputLabel>
                    <Select
                      labelId="select-company-label"
                      id="select-company-label"
                      onChange={(e) => filter.onChange(e.target.value)}
                      value={filter.value}
                    >
                      {
                        filter.options.map(option => (
                          <MenuItem key={option.value} value={option.value}>{option.description}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                ))}
              </div>
            ),
          }}
          actions={[
            {
              tooltip: 'Add New Record',
              hidden: !this.props.addPath ? true : false,
              icon: () => <Link to={this.props.addPath}><AddIcon/></Link>,
              isFreeAction: true,
              onClick: (evt, data) => this.props.handleAdd
            },

            {
              tooltip: 'Remove All Selected Users',
              icon: 'delete',
              hidden: !this.props.handleDelete ? true : false,
              onClick: (evt, data) => console.log('Disabled') //this.props.handleDelete(data)
            },
            {
              icon: 'print',
              tooltip: 'Print Selecteds',
              onClick: (event, data) => this.props.handlePrint ? this.props.handlePrint(data) : console.log('No Print Handler'),
              hidden: this.props.handlePrint ? false : true
            },
            {
              icon: () => <ColumnFilter columns={this.props.columns} handleToggle={(e) => this.handleToggle(e)} />,
              tooltip: 'Hide/Show Columns',
              isFreeAction: true,
              hidden: !this.props.toggleColumn ? true : false,
              onClick: () => null
            },
            {
              icon: 'publish',
              tooltip: 'Import',
              hidden: !this.props.import ? true : false,
              onClick: (evt, data) => this.props.handleImport(data)
            },
            {
              tooltip: 'Refresh',
              hidden: !this.props.handleRefresh ? true : false,
              icon: 'refresh',
              isFreeAction: true,
              onClick: (evt, data) => this.props.handleRefresh
            },


          ]}
          detailPanel={this.props.detailPanel}
          onRowClick={(event, rowData, togglePanel) => { try { togglePanel() } catch { console.log('no data') } }}
        />
      </div>
    )
  }
}

DataTable.propTypes = {
  filters: PropTypes.array.isRequired
};

export default DataTable
