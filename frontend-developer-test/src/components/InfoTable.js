import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const InfoTable = ({ users, fetchData, changeTable, loading, error, table }) => {

    const [ sorting, setSorting ] = useState(true);

    const comparator = (a, b) => {
        if(sorting ? a.timestamp > b.timestamp : a.timestamp < b.timestamp){
            return -1;
        }
        else if(a.timestamp === b.timestamp){
            return 0;
        }
        return 1;
    };

    const changeTableAndSort = () => {
      setSorting(true);
      changeTable();
    };

    return (
    <TableContainer className="table" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date<Button className="sort-btn" onClick={() => setSorting(!sorting)}>{sorting ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> }</Button></TableCell>
            <TableCell>{!table ? "User ID" : "Project ID"}</TableCell>
            <TableCell>Old value</TableCell>
            <TableCell>New Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
        {users.sort(comparator).map(row => {
            const date = new Date(row.timestamp);
            return (
            <TableRow id={row.id} data-testid={row.id} key={row.id}>
              <TableCell component="th" scope="row">
                {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
              </TableCell>
              <TableCell className="id-field">{row.id}</TableCell>
              <TableCell>{row.diff[0].oldValue}</TableCell>
              <TableCell>{row.diff[0].newValue}</TableCell>
            </TableRow>
          )})}
        </TableBody>
        <TableFooter>
        <TableRow>
            <TableCell>
                {error ? <p className="error" style={{ color: "red", fontFamily: "sans-serif" }}>We had problems fetching your data. Please try again.</p> : null }
                { loading ?
                <CircularProgress className="progress" /> :
                <Button className="load-btn" onClick={() => fetchData()} align="right" variant="contained" color="primary">
                    {!error ? "Load more": "Retry"}
                </Button> }
            </TableCell>
            <TableCell>
                <Button className="change-btn" onClick={() => changeTableAndSort()} >Change table</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    )
}

export default InfoTable;