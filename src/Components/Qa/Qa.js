import React, { Component } from 'react'
import { Typography, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            display: 'flex',
            flexWrap: 'wrap'

        },
    },
    paper: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 40,
        marginBottom: 40
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },

});



export class Qa extends Component {

    render() {
        return (<h1>QA</h1>)                
    }
}

export default withRouter(withStyles(styles)(Qa));