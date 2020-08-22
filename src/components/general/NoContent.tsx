import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            alignContent: 'center'
        },
    }),
);

const NoContent: React.FC = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            No data
        </div>
    );
} 

export default NoContent;