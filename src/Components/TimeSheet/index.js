import React, { useState } from 'react'
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import {
    range,
    minutesToHour
} from "../../Helpers";

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


function AutoFill(props) {


    const options = range(0, (24*60)-15, 15);

    const [start, setStart] = useState(7*60);
    const [end, setEnd] = useState(15.25*60);

    const [startOptions, setStartOptions] = useState(options);
    const [endOptions, setEndOptions] = useState(range(start, (24*60)-15, 15));
    const [job, setJob] = useState('');


    const changeStart = (value) => {
        setStart(value)
        setEndOptions(range(value, (24*60)-15, 15))
    }

    const changeEnd = (value) => {
        setEnd(value)
    }


    const changeJob = (job) => {
        setJob(job)
    }

    const sendAutoFill = () => {
        props.changeAutofill({start: start, end: end, job: job})
    }

    return (
        <React.Fragment>
        <h2>Auto Fill</h2>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Start</InputLabel>
              <Select
                labelId="select-company-label"

                onChange={(e) => changeStart(e.target.value)}
                value={start}
              >
                  <MenuItem value={''}>-</MenuItem>
                  {
                    startOptions.map(hour => (
                            <MenuItem key={hour} value={hour}>{minutesToHour(hour)}</MenuItem>
                        )
                    )
                  }
              </Select>
            </FormControl>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">End</InputLabel>
              <Select
                onChange={(e) => changeEnd(e.target.value)}
                value={end}
              >
                  <MenuItem value={''}>-</MenuItem>
                  {endOptions.map(hour => (
                      <MenuItem key={hour} value={hour}>{minutesToHour(hour)}</MenuItem>
                  ))

                  }
              </Select>
            </FormControl>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Job</InputLabel>
              <Select
                onChange={(e) => changeJob(e.target.value)}
                value={job}
              >
                  <MenuItem value={''}>-</MenuItem>
                  {props.jobs.map(job => (
                      <MenuItem key={job.id} value={job.id}>{job.description}</MenuItem>
                  ))

                  }
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={sendAutoFill}>
                Auto Fill
            </Button>

        </React.Fragment>
    )
}


function Day(props) {
    const jobs = range(1, 4, 1)
    //const autofill = {start: props.autofill.start, end: props.autofill.end, job: props.autofill.job}
    const [hoursDay, setHoursDay] = useState("")
    const [jobsObj, setJobsObj] = useState(range(1, 4, 1).map(job => (
        {
            number: job,
            start: 0,
            end: 0,
            hours: 0,
            normal: 0,
            extra_15: 0,
            extra_20: 0
        }

    )))

    const updateHours = (jobNumber, hours) => {
        let total = jobsObj.reduce( ( accumulator, currentValue ) => accumulator + currentValue.hours,0)
        let normal = Math.min(8*60, total);
        console.log("extra_15", total-normal)
        let extra_15 = Math.min(2*60, total-normal);
        let extra_20 = Math.max(0, total-(normal+extra_15));

        let jobsChanged = jobsObj.map((job) => job.number === jobNumber ?  Object.assign({}, job, {hours: hours, normal: normal, extra_15: extra_15, extra_20: extra_20}) : job);

        setJobsObj(jobsChanged)

        props.updateDay(props.day, jobsChanged, jobsChanged.reduce( ( accumulator, currentValue ) => accumulator + currentValue.hours,0))

    }

    return (
        <React.Fragment>
            <div>
                <h2>{props.day}</h2>
                {jobs.map(job => (
                    <Job key={job} jobs={props.jobs} jobNumber={job} autofill={props.autoFill} updateHours={updateHours}/>
                ))}
            </div>
            <br/>
            <div>
                <div>
                <TextField
                    label="Normal Hours"
                    variant="outlined"
                    InputLabelProps={{ shrink: true}}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="name"
                    value={minutesToHour(jobsObj.reduce( ( accumulator, currentValue ) => accumulator + currentValue.normal,0))}
                />
                <TextField
                    label="Hours 1.5 Hours"
                    variant="outlined"
                    InputLabelProps={{ shrink: true}}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="name"
                    value={minutesToHour(jobsObj.reduce( ( accumulator, currentValue ) => accumulator + currentValue.extra_15,0))}
                />

                </div>
                <br/>
                <div>
                <TextField
                    label="Hours 2.0 Hours"
                    variant="outlined"
                    InputLabelProps={{ shrink: true}}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="name"
                    value={minutesToHour(jobsObj.reduce( ( accumulator, currentValue ) => accumulator + currentValue.extra_20,0))}
                />

                <TextField
                    label="Total Hours"
                    variant="outlined"
                    InputLabelProps={{ shrink: true}}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="name"
                    value={minutesToHour(jobsObj.reduce( ( accumulator, currentValue ) => accumulator + currentValue.hours,0))}
                />
                </div>

            </div>


        </React.Fragment>
    )
}

function Job(props) {

    const options = range(0, (24*60)-15, 15);

    const [start, setStart] = useState(props.autofill.start);
    const [end, setEnd] = useState(props.autofill.end);
    const [job, setJob] = useState(props.autofill.job);

    const [startOptions, setStartOptions] = useState(options);
    const [endOptions, setEndOptions] = useState(range(start, (24*60)-15, 15));

    const [hours, setHours] = useState("");

    const changeStart = (value) => {
        setStart(value)
        setEndOptions(range(value, (24*60)-15, 15))
    }

    const changeEnd = (value) => {
        setEnd(value)
        const changedHours = props.jobNumber === 1 ? (value-start)-15 : value-start
        setHours(changedHours)
        props.updateHours(props.jobNumber, changedHours)
    }


    const changeJob = (job) => {
        setJob(job)
    }


    return (
        <React.Fragment>
        <h1 style={{display: 'none'}}>Jobs autofill: {JSON.stringify(props.autofill)} | Start: {start} | End: {end}</h1>
        <h3>Job {props.jobNumber}</h3>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Start</InputLabel>
              <Select
                labelId="select-company-label"

                onChange={(e) => changeStart(e.target.value)}
                value={start}
              >
                  <MenuItem value={''}>-</MenuItem>
                  {
                    startOptions.map(hour => (
                            <MenuItem key={hour} value={hour}>{minutesToHour(hour)}</MenuItem>
                        )
                    )
                  }
              </Select>
            </FormControl>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">End</InputLabel>
              <Select
                onChange={(e) => changeEnd(e.target.value)}
                value={end}
              >
                  <MenuItem value={''}>-</MenuItem>
                  {endOptions.map(hour => (
                      <MenuItem key={hour} value={hour}>{minutesToHour(hour)}</MenuItem>
                  ))

                  }
              </Select>
            </FormControl>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Job</InputLabel>
              <Select
                onChange={(e) => changeJob(e.target.value)}
                value={job}
              >
                  <MenuItem value={''}>-</MenuItem>
                  {props.jobs.map(job => (
                      <MenuItem key={job.id} value={job.id}>{job.description}</MenuItem>
                  ))

                  }
              </Select>
            </FormControl>
            <TextField
                            label="Hours"
                            variant="outlined"
                            InputLabelProps={{ shrink: true}}
                            InputProps={{
                                readOnly: true,
                            }}
                            name="name"
                            value={minutesToHour(hours)}
                        />

        </React.Fragment>
    )
}


function TimeSheet(props) {
    const classes = useStyles();

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
                extra_15: 0,
                extra_20:0

            }
        )
    ))

    const updateDays = (dayParam, jobsParam, hoursParam) => {
        let daysChanged = daysObj.map((day) => day.day === dayParam ?  Object.assign({}, day, {jobs: jobsParam, hours: hoursParam}) : day);
        setDaysObj(daysChanged)
    }



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
            </form>
            <AutoFill jobs={props.jobs} changeAutofill={changeAutofill}/>
            {daysObj.map(day => (
                <Day key={day.day} jobs={props.jobs} day={day.day} autoFill={autoFill} updateDay={updateDays}/>
            ))}
            <TextField
                            label="Total Hours"
                            variant="outlined"
                            InputLabelProps={{ shrink: true}}
                            InputProps={{
                                readOnly: true,
                            }}
                            name="name"
                            value={minutesToHour(daysObj.reduce( ( accumulator, currentValue ) => accumulator + currentValue.hours,0))}
                        />

        </div>
    )
}


export default connect((state) => ({
    jobs: state.jobs,
    loading: state.loading
  }))(TimeSheet)