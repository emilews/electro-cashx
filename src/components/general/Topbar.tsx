import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavMenu from './Drawer';
import * as Store from '../../utils/Store';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

export default function Topbar() {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        Store.getBalance().then((response:number) => {
            setBalance(response);
        })
    },[])
    const classes = useStyles();



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <NavMenu />
                    <Typography variant="h6" color="inherit">
                        {balance}
                     </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
