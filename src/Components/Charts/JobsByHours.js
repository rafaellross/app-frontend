import React, { Component } from 'react';
import { Chart } from 'react-charts'
import * as API from "../../Api";
import { connect } from 'react-redux'
import { handleTimeSheetChart } from '../../Redux/Actions/charts';
export class JobsByHours extends Component {

  constructor(props) {
    super(props)

    this.state = {
       data: [],
      axes: [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
       isLoading: true,
       series: {
        type: 'bar'
      }
    }
  }

    componentDidMount() {

        const { dispatch } = this.props
        dispatch(handleTimeSheetChart())

    }

  compileData = (timesheets) => {
    let jobs = Object.keys(timesheets)

        return jobs.map((job) => {
          return (
            {
              label: job.toUpperCase(),
              data:
                Object.keys(timesheets[job]).map((week) => {
                  return ([new Date(week).toLocaleDateString(), timesheets[job][week]/60])
                })
            }
          )
        })
  }

  render() {
    if (this.props.isLoading) {
      return (
        <h2>Loading...</h2>
      )
    }

    return (
      <div
      style={{
        width: '100%',
        height: '600px'
      }}
    >
      <Chart data={this.compileData(this.props.data)} axes={this.state.axes} series={this.state.series} tooltip/>
    </div>

    )
  }
}

export default connect((state) => ({
  data: state.charts,
  isLoading: state.loading
}))(JobsByHours)
