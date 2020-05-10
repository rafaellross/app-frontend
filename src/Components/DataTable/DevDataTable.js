import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SearchState,
  IntegratedFiltering,
  IntegratedSelection,
  SelectionState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  VirtualTable,
  TableSelection,  
  PagingPanel,  
  ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui';


export default (props) => {

  const [searchValue, setSearchState] = useState('');
  const [selection, setSelection] = useState([]);
  const {rows, columns } = props;
  const [sorting, setSorting] = useState([]);
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [hiddenColumnNames, setHiddenColumnNames] = useState([]);
  
  return (

<div>
<span>
  Total rows selected:
  {' '}
  {selection.length}
</span>
<Paper>
  <Grid
    rows={rows}
    columns={columns}
  >
  <SearchState
    value={searchValue}
    onValueChange={setSearchState}
  />

    <SelectionState
      selection={selection}
      onSelectionChange={setSelection}
    />
    <PagingState
      defaultCurrentPage={0}
      
      currentPage={currentPage}
      onCurrentPageChange={setCurrentPage}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}      
    />

      <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <IntegratedSorting />

    <IntegratedSelection />
    <VirtualTable />              
    <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames}
          onHiddenColumnNamesChange={setHiddenColumnNames}
        />    
    <IntegratedFiltering />      
    <IntegratedPaging />
    <Table />
    <TableHeaderRow showSortingControls/>
    <TableSelection showSelectAll />
    <PagingPanel pageSizes={pageSizes}/>
    <Toolbar />
    <SearchPanel />    
    <ColumnChooser />
  </Grid>
</Paper>
</div>    
  );
};
