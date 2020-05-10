import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
  SearchState

} from '@devexpress/dx-react-grid';


import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  SearchPanel,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';






export function DevDataTable(props) {
    
    const [selection, setSelection] = useState([]);
    if (props.isLoading) {
        return (
            <h3>Loading...</h3>
        )
    }
    return (
        <div>
          <span>
            Total rows selected:
            {' '}
            {selection.length}
          </span>
          <Paper>
            <Grid
              rows={props.rows}
              columns={props.columns}
            >
            <SortingState
                defaultSorting={[{ columnName: 'product', direction: 'asc' }]}
            />
            <SearchState defaultValue="Market" />
            <IntegratedSorting />                
              <PagingState
                defaultCurrentPage={0}
                pageSize={6}
              />
              <SelectionState
                selection={selection}
                onSelectionChange={setSelection}
              />
              <IntegratedPaging />
              <IntegratedSelection />
              <Table />
              <TableHeaderRow showSortingControls/>
              <TableSelection showSelectAll />
              <PagingPanel />
              <Toolbar />
              <SearchPanel />              
              
            </Grid>
          </Paper>
        </div>
      );    
}


