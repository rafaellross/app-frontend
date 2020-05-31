import React, { Component } from 'react'
import MaterialTable, {MTableToolbar} from 'material-table'
import Divider from '@material-ui/core/Divider';
import ColumnFilter from './ColumnFilter';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
                <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 10+'px'}}>
                {this.props.buttons.map(button => (
                    <Button
                      key={button.path}
                      variant="contained"
                      color={button.color}
                      style={{width: '100%', padding: '10px'}}
                      component={Link}
                      to={button.path}>Add</Button>
                ))}
                </ButtonGroup>
                {this.props.filters.map(filter => (
                  <FormControl style={{width: 200}}  key={filter.description}>
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
                tooltip: 'Remove All Selected Users',
                icon: 'delete',
                onClick: (evt, data) => this.props.handleDelete(data)
              },
              {
                icon: 'print',
                tooltip: 'Print Selecteds',
                onClick: (event, data) => this.props.handlePrint ? this.props.handlePrint(data) : console.log('No Print Handler'),
                hidden: this.props.handlePrint ? false : true
              },

              {
                icon: () => <ColumnFilter columns={this.props.columns} handleToggle={(e)=> this.handleToggle(e)}/>,
                tooltip: 'Hide/Show Columns',
                isFreeAction: true,
                onClick: () => null
              },



          ]}

          detailPanel={this.props.detailPanel}
          onRowClick={(event, rowData, togglePanel) => {try{ togglePanel() } catch {console.log('no data')}}}
        />
        </div>

      )

  }
  }

  DataTable.propTypes = {
    toggleColumn: PropTypes.func.isRequired,
    buttons: PropTypes.array.isRequired,
    filters: PropTypes.array.isRequired
  };

export default DataTable
