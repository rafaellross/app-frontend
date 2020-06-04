import React, { Component } from 'react'
import * as API from '../../Api';


export class TimeSheetReport extends Component {

    constructor(props) {
        super(props)

        this.state = {
             file: '',
             isLoading: true
        }
    }

    componentDidMount() {

        let idsToPrint = this.props.location.state !== undefined ? this.props.location.state.timesheets.join(",") : this.props.match.params.id
        API.getAll('timesheets/print', idsToPrint)
        .then((file) => {

            this.setState(() => ({
                file: file.path
            }))

        }).then(()=> {
            window.open(this.state.file);
            window.history.back();
        })
    }

    render() {
        if(this.state.isLoading) {
            return <h1>Loading</h1>
        }
        return (
            <div>
                No Data
            </div>
        )
    }
}

export default TimeSheetReport



