import React, { useState } from 'react'
import 'typeface-roboto';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import { connect } from 'react-redux'
import {
    minutesToHour
} from "../../Helpers";
import AutoFill from './AutoFill';
import Day from './Day'
import { handleAddTimesheet } from '../../Redux/Actions/timesheets';


function TimeSheet(props) {

    const [autoFill, setAutoFill] = useState({start: 0, end: 0, job: ''})

    const changeAutofill = (autofillValues) => {
        setAutoFill({start: autofillValues.start, end: autofillValues.end, job: autofillValues.job})
    }

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    const [daysObj, setDaysObj] = useState(days.map(day => (
            {
                day: day,
                jobs: [],
                hours: 0,
                extraFifty: 0,
                extraDouble: 0,
                total: 0

            }
        )
    ))

    const [total, setTotal] = useState(0)
    const [normal, setNormal] = useState(0)
    const [extraFifty, setExtraFifty] = useState(0)
    const [extraDouble, setExtraDouble] = useState(0)

    const updateDays = (dayParam, total, normal, extraFifty, extraDouble, jobs) => {
        let days = daysObj.map((day) => day.day === dayParam ?
                    Object.assign({}, day, {
                                            total: total,
                                            normal: normal,
                                            extraFifty: extraFifty,
                                            extraDouble: extraDouble,
                                            jobs: jobs
                    }) : day)
        setDaysObj(days)
        setTotals(days)
    }

    const setTotals = (days) => {
        console.log("setTotals", days)
        let total = days.reduce( ( accumulator, currentValue ) => accumulator + currentValue.total,0)
        setTotal(total)

        let normal = Math.min(8*60, total)
        setNormal(normal)

        let extraFifty = Math.min(2*60, total-normal)
        setExtraFifty(extraFifty)

        let extraDouble = Math.max(0, total-(normal+extraFifty))
        setExtraDouble(extraDouble)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        const { dispatch } = props
        dispatch(handleAddTimesheet(daysObj))
    }

    return (
        <div>
            <Typography variant="h3" component="h2" style={{textAlign: 'center'}}>
                {props.action}
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                                label="Week End"
                                format="dd/MM/yyyy"
                                value={"2020-05-31"}
                                onChange={function(){}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                    </MuiPickersUtilsProvider>
                </div>
                <AutoFill
                    jobs={props.jobs}
                    changeAutofill={changeAutofill}/>
            {daysObj.map(day => (
                <Day
                    key={day.day}
                    jobs={props.jobs}
                    day={day.day}
                    autoFill={autoFill}
                    updateDay={updateDays}
                />
            ))}
            <h2>Totals</h2>
            <TextField
                label="Total Normal"
                variant="outlined"
                InputLabelProps={{ shrink: true}}
                InputProps={{
                    readOnly: true,
                }}
                name="name"
                value={minutesToHour(normal)}
            />
            <TextField
                label="Extra 1.5"
                variant="outlined"
                InputLabelProps={{ shrink: true}}
                InputProps={{
                    readOnly: true,
                }}
                name="name"
                value={minutesToHour(extraFifty)}
            />

            <TextField
                label="Extra 2.0"
                variant="outlined"
                InputLabelProps={{ shrink: true}}
                InputProps={{
                    readOnly: true,
                }}
                name="name"
                value={minutesToHour(extraDouble)}
            />

            <TextField
                label="Total Hours"
                variant="outlined"
                InputLabelProps={{ shrink: true}}
                InputProps={{
                    readOnly: true,
                }}
                name="name"
                value={minutesToHour(total)}
            />

            <TextField
                label="Total Hours"
                variant="outlined"
                InputLabelProps={{ shrink: true}}
                InputProps={{
                    readOnly: true,
                }}
                name="name"
                value={minutesToHour(total)}
            />
            <Button>Cancel</Button>
            <Button type="submit">Submit</Button>
            </form>



        </div>
    )
}


export default connect((state) => ({
    jobs: state.jobs,
    loading: state.loading
  }))(TimeSheet)