import React from 'react'
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';

export default function Project(props) {
    return (
        <React.Fragment>
        <div>
            <TextField
            variant="outlined"
            name="customer"
            label="Customer"
            value={props.project.customer}
            />
            <TextField
            variant="outlined"
            name="project"
            label="Project Name"
            value={props.project.name}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Due Date"
                format="MM/dd/yyyy"
                value={props.project.due_dt}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
            <TextField
            variant="outlined"
            name="street_address"
            label="Street Address"
            value={props.project.street_address}
            />
          <TextField
            variant="outlined"
            name="suburb"
            label="Suburb"
            value={props.project.suburb}
            />
          <TextField
            variant="outlined"
            name="state"
            label="State"
            value={props.project.state}
            />
          <TextField
            variant="outlined"
            name="post_code"
            label="State"
            value={props.project.post_code}
            />

        </div>
        </React.Fragment>
    )
}