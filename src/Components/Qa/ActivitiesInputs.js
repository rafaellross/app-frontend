import React from 'react'


import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const classes = {
    reference: {

    }
}

export default function ActivitiesInputs(props) {
    return (
        props.activities.map((row, index) => (
            <TableRow key={row.id}>
                <TableCell>({row.order}){row.description}</TableCell>
                <TableCell>{row.at}</TableCell>
                <TableCell>{row.requirements}</TableCell>
                <TableCell>
                    <TextField id={`${row.id}`} value={row.reference} variant="outlined" name={`reference`} type="text" className={"reference"} onChange={props.handleChange}/>
                </TableCell>
                <TableCell>
                    <TextField select value={row.yes_no} variant="outlined" name={`${row.id}-yes_no`} className={"yes_no"} onChange={props.handleChange}>
                            <option value={'yes'} id={`${row.id}`}>Yes</option>
                            <option value={'no'} id={`${row.id}`}>No</option>
                    </TextField>
                </TableCell>
                <TableCell>
                    <TextField id={`${row.id}`} value={row.installed_by} variant="outlined" name={`installed_by`} type="text" className={"installed_by"} onChange={props.handleChange}/>
                </TableCell>
                <TableCell>
                    <TextField id={`${row.id}`} value={row.checked_by} variant="outlined" name={`checked_by`} type="text" className={"check_by"} onChange={props.handleChange}/>
                </TableCell>
                <TableCell>
                    <TextField id={`${row.id}`} value={row.activity_date} variant="outlined" name={`activity_date`} type="date" className={"activity_date"} onChange={props.handleChange}/>
                </TableCell>
            </TableRow>

        ))

    )
}
