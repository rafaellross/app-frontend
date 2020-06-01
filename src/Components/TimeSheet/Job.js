import React, { useState } from 'react'
import {
    range,
    minutesToHour
} from "../../Helpers"
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

export default function Job(props) {

    const options = range(0, (24*60)-15, 15);

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [job, setJob] = useState('');

    const [startOptions, setStartOptions] = useState(options);
    const [endOptions, setEndOptions] = useState(range(Number(start), (24*60)-15, 15));

    const [hours, setHours] = useState("");

    const changeStart = (value) => {
        setStart(value)
        setEndOptions(range(Number(value), (24*60)-15, 15))
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

    const clear = () => {
        setStart('')
        setStartOptions(options)
        setEnd('')
        setEndOptions(options)

    }

    return (
        <React.Fragment>
        <h1 style={{display: 'none'}}>Jobs autofill: {JSON.stringify(props.autofill)} | Start: {start} | End: {end}</h1>
        <h3>Job {props.jobNumber}</h3>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Start</InputLabel>
              <Select
                native
                onChange={(e) => changeStart(e.target.value)}
                value={start}
              >
                  <option value={''}>-</option>
                  {
                    startOptions.map(hour => (
                            <option key={hour} value={hour}>{minutesToHour(hour)}</option>
                        )
                    )
                  }
              </Select>
            </FormControl>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">End</InputLabel>
              <Select
                native
                onChange={(e) => changeEnd(e.target.value)}
                value={end}
              >
                  <option value={''}>-</option>
                  {endOptions.map(hour => (
                      <option key={hour} value={hour}>{minutesToHour(hour)}</option>
                  ))

                  }
              </Select>
            </FormControl>
            <FormControl style={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Job</InputLabel>
              <Select
                native
                onChange={(e) => changeJob(e.target.value)}
                value={job}
              >
                  <option value={''}>-</option>
                  {props.jobs.map(job => (
                      <option key={job.id} value={job.id}>{job.description}</option>
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
            <Button variant="outlined" color="secondary" onClick={clear}>Clear</Button>
        </React.Fragment>
    )
}
