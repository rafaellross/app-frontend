import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import blueGrey from '@material-ui/core/colors/blueGrey';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: blueGrey
  },
  container: {
    backgroundColor: blueGrey
  }
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function DataTableDetails(props) {
  const classes = useStyles();
  const { rows, columns } = props
  return (
    <TableContainer component={Paper} className={classes.container} style={{backgroundColor: blueGrey}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.name} align="left">{column.title}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody className={classes.container}>

        {rows.map((row) => (
            <StyledTableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={`${row.id} - ${column.name}`} align="left">{row[column.name]}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}