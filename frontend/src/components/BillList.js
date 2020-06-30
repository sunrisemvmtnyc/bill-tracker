import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { palette } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import BillListItem from './BillListItem';

const useStyles = makeStyles({
  header: { color: 'white' },
  list: { background: "transparent", },
  table: { tableLayout: 'fixed' },
  paper: { width: '90%' },
  tableHeader: { fontSize: '1.1rem' },
});

export default function BillList(props) {
  const c = useStyles();

  return (
    <Box display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      p={0}
      bgcolor="background.paper"
      className={c.list}
    >
      <Box padding={3} color="text.primary">
        <Typography gutterBottom className={c.header} variant="h4">
          Progress of Police Reform Legislative Package
        </Typography>
      </Box>

      <Paper className={c.paper}>
        <TableContainer>
          <Table className={c.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center" className={c.tableHeader} colspan={2}></TableCell>
              <TableCell align="center" className={c.tableHeader}>Introduced</TableCell>
              <TableCell align="center" className={c.tableHeader}>In Committee</TableCell>
              <TableCell align="center" className={c.tableHeader}>On Floor Calendar</TableCell>
              <TableCell align="center" className={c.tableHeader}>Passed Senate</TableCell>
              <TableCell align="center" className={c.tableHeader}>Passed Assembly</TableCell>
              <TableCell align="center" className={c.tableHeader}>Delivered to Governor</TableCell>
              <TableCell align="center" className={c.tableHeader}>Signed by Governor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bills.map((value, index) => {
                return <BillListItem key={index} year={value[0]} bill={value[1]} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}
