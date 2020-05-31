import React, { Component } from 'react'
import TimeSheet from "../../Components/TimeSheet";
export class AddTimeSheet extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <TimeSheet action="New Time Sheet"/>
            </div>
        )
    }
}

export default AddTimeSheet
