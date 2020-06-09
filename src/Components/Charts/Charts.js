import React, { useState, useEffect  } from 'react';
import { Chart } from 'react-charts'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux'
import {
  handleReceiveCharts
}
 from '../../Redux/Actions/charts';



import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { ResizableBox } from 'react-resizable';
import './style.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(20),
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  grid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: theme.spacing(20),
  },
}));




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

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded)
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
      if (!loaded) {
        setLoaded(true)
      }
      return result

    } else {
      return []
    }
  }
  const classes = useStyles()
  return (
    <React.Fragment>
      <div className={classes.root}>
          <Grid container spacing={3} className={classes.grid}>
              <Grid item xs={12} sm={12} lg={12}>
                <Button color="secondary" variant="outlined" onClick={() => props.dispatch(handleReceiveCharts())}>Refresh</Button>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <Paper className={classes.paper} elevation={3}>
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
                  </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <Paper className={classes.paper} elevation={3}>
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
                  </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <Paper className={classes.paper} elevation={3}>
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
                  </Paper>
              </Grid>

          </Grid>
      </div>
    </React.Fragment>
  )
}

export default connect((state) => ({
  byjob: state.charts.byjob,
  byemployee: state.charts.byemployee,
  byovertimejob: state.charts.byovertimejob,
  loading: state.loading
}))(Charts)
