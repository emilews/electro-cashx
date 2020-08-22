import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavMenu from './Drawer';
import * as Store from '../../utils/Store';
import { BITBOX } from 'bitbox-sdk';
let bitbox = new BITBOX();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        balanceText: {
            marginLeft: 'auto'
        }
    }),
);

export default function Topbar() {
    const [balance, setBalance] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setBalance(Store.getSavedBalance());
        setInterval(() => {
            Store.getLiveBalance().then((response: number) => {
                setBalance(response);
                Store.saveBalance(response);
            });
        },5000);
        setPrice(Store.getLatestPrice());
        setInterval(() => {
            bitbox.Price.current('usd').then((response: number) => {
                setPrice(response/100);
                Store.setLatestPrice(response/100);
            });
        }, 10000);
    }, []);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <NavMenu />
                    <Typography variant="h6" color="inherit">
                        CashX
                     </Typography>
                     <Typography className={classes.balanceText}>
                        1BCH={price}USD
                     </Typography>
                     <Typography className={classes.balanceText}>
                         Available: {balance}BCH
                     </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
