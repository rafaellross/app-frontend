import React, { useState, useEffect } from 'react';
import { Chart } from 'react-charts'
import * as API from "../../Api";


export default function JobsByHours() {
  const data = React.useMemo(
    () => [
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
    []
  )

    const [dataAPI, setDataAPI] = useState(null)
    const [loaded, setLoaded] = useState(false)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!loaded) {

      API.getAll('timesheets/charts')
      .then((timesheets) => (
       reduceData(timesheets)

      ))
      setLoaded(true)
    }
    // Update the document title using the browser API
  });

  const reduceData = (data) => {

    setDataAPI(data)
  }


  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )

  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} series={series} tooltip/>
    </div>

  )
}