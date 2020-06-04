import React, { Component } from 'react';
import { Chart } from 'react-charts'
import * as API from "../../Api";

export class JobsByHours extends Component {

  constructor(props) {
    super(props)

    this.state = {
       data: [
        {
          label: 'Job: 001 - Series 1',
          data: [['31/05/2020', 1], [1, 2], [2, 4], [3, 2], [4, 7], [9, 50]]
        },
        {
          label: 'Job: 001 - Series 1',
          data: [['31/05/2020', 1], [1, 2], [2, 4], [3, 2], [4, 7], [9, 50]]
        },
        {
          label: 'Job: 002 - Series 2',
          data: [['31/05/2020', 3], [1, 1], [2, 5], [3, 6], [4, 4], [9, 5]]
        }
      ],
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

      API.getAll('timesheets/charts')
      .then((timesheets) => {

        let jobs = Object.keys(timesheets)

        let reduced = jobs.map((job) => {
          return (
            {
              label: job,
              data:
                Object.keys(timesheets[job]).map((week) => {
                  return ([new Date(week).toLocaleDateString(), timesheets[job][week]/60])
                })
            }
          )
        })
        console.log(reduced)
        this.setState(() => ({
            data: reduced,
            isLoading: false
          }))

      })

      //const jobs =

      //console.log(jobs)


    }


  render() {
    if (this.state.isLoading) {
      return (
        <h2>Loading...</h2>
      )
    }

    return (
      <div
      style={{
        width: '800px',
        height: '600px'
      }}
    >
      <Chart data={this.state.data} axes={this.state.axes} series={this.state.series} tooltip/>
    </div>

    )
  }
}

export default JobsByHours
