import React, { useState } from 'react'
import {
    range,
    minutesToHour
} from "../../Helpers"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

export default function AutoFill(props) {


    const options = range(0, (24*60)-15, 15);

    const [start, setStart] = useState(7*60);
    const [end, setEnd] = useState(15.25*60);

    const [startOptions, setStartOptions] = useState(options);
    const [endOptions, setEndOptions] = useState(range(Number(start), (24*60)-15, 15));
    const [job, setJob] = useState('');


    const changeStart = (value) => {
        setStart(value)
        setEndOptions(range(Number(value), (24*60)-15, 15))
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
              <InputLabel>Start</InputLabel>
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
            <Button variant="contained" color="primary" onClick={sendAutoFill}>
                Auto Fill
            </Button>

        </React.Fragment>
    )
}

