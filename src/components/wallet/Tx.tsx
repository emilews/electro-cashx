import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as Store from '../../utils/Store';
import NoContent from '../general/NoContent';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const Tx: React.FC = () => {
    const [txs, setTxs] = useState([]);
    useEffect(() => {
        setInterval(() => {
            Store.getTxs().then((response:any) =>{
                setTxs(response);
            });
        },5000);
    }, []);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>TXID</TableCell>
                        <TableCell>Receiver</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(txs.length !== 0) ? 
                    txs.map((item:any, key:number) => (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row">
                                {item.txid}
                            </TableCell>
                            <TableCell>{item.receiver}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                        </TableRow> 
                    ))
                    :
                    <NoContent/>
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tx;