import React, { useState, useEffect  } from 'react';
import { Chart } from 'react-charts'
import { connect } from 'react-redux'
import {
  handleReceiveCharts
}
 from '../../Redux/Actions/charts';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { ResizableBox } from 'react-resizable';
import './style.css';

function Box(props) {

  const [width, setWidth] = useState(950)
  const [height, setHeight] = useState(450)
  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width)
    setHeight(size.height)
  };

 return (
      <ResizableBox height={height} width={width} onResize={onResize}
      axis="both"
      minConstraints={[100, 100]} >
      <div className="box" style={{ width: width-60 + 'px', height: height-60 + 'px' }}>
        {props.children}
      </div>
    </ResizableBox>
 )
}

function Charts(props) {
  const axes = [
    { primary: true, type: 'ordinal', position: 'bottom' },
    { position: 'left', type: 'linear', stacked: false }
  ]

  useEffect(() => {
    props.dispatch(handleReceiveCharts())
  });



  const series = {type: 'bar' }

  const compileData = (timesheets) => {
    if (timesheets) {
      let jobs = Object.keys(timesheets)
      let result = jobs.map((job) => {
        return (
          {
            label: job.toUpperCase(),
            data:
              Object.keys(timesheets[job]).map((week) => {
                return ([new Date(week).toLocaleDateString('en-AU'), timesheets[job][week] / 60])
              })
          }
        )
      })
      return result

    } else {
      return []
    }
  }

  return (
    <React.Fragment>
      <Box style={{height: '100vh'}}>
          <Typography variant="h3" component="h2" style={{ textAlign: 'center' }}>
            HOURS BY JOB
          </Typography>
          <Chart
            data={compileData(props.byjob)}
            axes={axes}
            series={series}
            tooltip
          />
      </Box>
      <Box>
          <Typography variant="h3" component="h2" style={{ textAlign: 'center' }}>
            OVERTIME BY EMPLOYEE
          </Typography>
          <Chart
            data={compileData(props.byemployee)}
            axes={axes}
            series={series}
            tooltip
          />
      </Box>
      <Box>
          <Typography variant="h3" component="h2" style={{ textAlign: 'center' }}>
            OVERTIME BY JOB
          </Typography>
          <Chart
            data={compileData(props.byovertimejob)}
            axes={axes}
            series={series}
            tooltip
          />
      </Box>

      <Button color="secondary" variant="outlined" onClick={() => props.dispatch(handleReceiveCharts())}>Refresh</Button>
    </React.Fragment>
  )
}

export default connect((state) => ({
  byjob: state.charts.byjob,
  byemployee: state.charts.byemployee,
  byovertimejob: state.charts.byovertimejob,
  loading: state.loading
}))(Charts)
