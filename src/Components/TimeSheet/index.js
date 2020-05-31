import React from 'react'
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';


  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


function AutoFill(params) {
    return (
        <div>AutoFill</div>
    )
}


function Day(params) {
    return (
        <React.Fragment>
            <div>Day</div>
            <Job/>
        </React.Fragment>
    )
}

function Job(params) {
    return (
        <div>Job</div>
    )
}


export default function TimeSheet(props) {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h3" component="h2" style={{textAlign: 'center'}}>
                {props.action}
            </Typography>

            <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            label="Name"
                            variant="outlined"
                            InputLabelProps={{ shrink: true}}
                            InputProps={{
                                readOnly: true,
                            }}
                            name="name"
                            value="Rafael Ross"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="dd/MM/yyyy"
                                    value={"2020-05-31"}
                                    onChange={function(){}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                        </MuiPickersUtilsProvider>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2020-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
            </form>
            <AutoFill/>
            <Day/>
        </div>
    )
}
