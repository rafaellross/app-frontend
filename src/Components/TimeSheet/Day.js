import React, { useState } from 'react'
import {
    range,
    minutesToHour
} from "../../Helpers"
import Job from './Job'
import TextField from '@material-ui/core/TextField'


export default function Day(props) {
    const jobs = range(1, 4, 1)
    //Remove or Fix
    //const autofill = {start: props.autofill.start, end: props.autofill.end, job: props.autofill.job}

    const [total, setTotal] = useState(0)
    const [normal, setNormal] = useState(0)
    const [extraFifty, setExtraFifty] = useState(0)
    const [extraDouble, setExtraDouble] = useState(0)
    const [jobsObj, setJobsObj] = useState(range(1, 4, 1).map(job => (
        {
            number: job,
            start: 0,
            end: 0,
            hours: 0,
            total: 0
        }
    )))

    const updateHours = (jobNumber, hours) => {

        let jobs = jobsObj.map((job) => job.number === jobNumber ?  Object.assign({}, job, {hours: hours}) : job);

        setJobsObj(jobs)

        setTotals(jobs)

    }

    const setTotals = (jobs) => {

        let total = jobs.reduce( ( accumulator, currentValue ) => accumulator + currentValue.hours,0)
        setTotal(total)

        let normal = Math.min(8*60, total)
        setNormal(normal)

        console.log("extraFifty", total-normal)

        let extraFifty = Math.min(2*60, total-normal)
        setExtraFifty(extraFifty)

        let extraDouble = Math.max(0, total-(normal+extraFifty))
        setExtraDouble(extraDouble)

        props.updateDay(props.day, total, normal, extraFifty, extraDouble, jobs)
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
                    value={minutesToHour(normal)}
                />
                <TextField
                    label="Hours 1.5 Hours"
                    variant="outlined"
                    InputLabelProps={{ shrink: true}}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="name"
                    value={minutesToHour(extraFifty)}
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
                </div>

            </div>


        </React.Fragment>
    )
}
