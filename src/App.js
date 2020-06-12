import React, { useEffect, useState  } from 'react'

import { withRouter, Redirect, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar';
import  Home from './Scenes/Home/Home'
import Jobs from './Scenes/Jobs/Jobs';
import Users from './Scenes/Users/Users';
import Qas from './Scenes/Qa/Qas';
import Employees from './Scenes/Employees/Employees';
import EditEmployee from './Scenes/Employees/EditEmployee';
import AddEmployee from './Scenes/Employees/AddEmployee';

import ListEmployees from './Reports/Employees/list';
import FireRegister from './Reports/Job/FireRegister';
import AddUser from './Scenes/Users/AddUser';
import EditUser from './Scenes/Users/EditUser';
import AddJob from './Scenes/Jobs/AddJob';
import EditJob from './Scenes/Jobs/EditJob';
import Penetrations  from './Scenes/Jobs/Penetrations/Penetrations';
import AddPenetration from './Scenes/Jobs/Penetrations/AddPenetration';
import EditPenetration from './Scenes/Jobs/Penetrations/EditPenetration';
import './App.css';

import QaReport from './Reports/Qa/QaReport';
import AddQa from './Scenes/Qa/AddQa';
import Login from './Scenes/Login/Login';
import EditQa from './Scenes/Qa/EditQa';
import TimeSheets from './Scenes/TimeSheet/TimeSheets';
import TimeSheetReport from './Reports/TimeSheets/TimeSheetReport';
import { connect } from 'react-redux'
import {
  handleInitialData
} from './Redux/Actions/shared'
import AddTimeSheet from './Scenes/TimeSheet/AddTimeSheet';
import Charts from './Components/Charts/Charts';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Estimates from './Scenes/Estimates/Estimates';
import Costx from './Scenes/Estimates/Costx';
import EditEstimate from './Scenes/Estimates/EditEstimate';
import { setLoading } from "./Redux/Actions/shared";
import { AnimatedRoute } from 'react-router-transition';


export const PrivateRoute = ({ component: Component, ...rest }) => (

  <AnimatedRoute
  atEnter={{ offset: -100 }}
  atLeave={{ offset: -100 }}
  atActive={{ offset: 0 }}
  mapStyles={(styles) => ({
    transform: `translateX(${styles.offset}%)`,
  })}

    {...rest}
    render={(props) => (
    !localStorage.token
    ? <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />

    : <Component {...props} />
  )} />
)

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 100
  },
}));

function App (props) {
  useEffect(() => {
    const { dispatch } = props
    if (localStorage.token && !loadedInitialData) {
      dispatch(handleInitialData())
      .then(() => {
        setLoadedInitialData(true)
        dispatch(setLoading(false))
      })
    }
  });

  const [loadedInitialData, setLoadedInitialData] = useState(false)

  const classes = useStyles()

  return (
    <React.Fragment>
          <Backdrop className={classes.backdrop} open={props.loading}>
            <CircularProgress color="primary" />
          </Backdrop>
          <NavBar {...props}/>
          <Route exact path={`/login`} component={Login}/>
          <PrivateRoute exact path="/" component={Home}/>
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute exact path={`/jobs`} component={Jobs}/>
          <PrivateRoute exact path={`/jobs/add`} component={AddJob}/>
          <PrivateRoute exact path={`/jobs/edit/:id`} component={EditJob}/>
          <PrivateRoute exact path={`/qas`} component={Qas}/>
          <PrivateRoute exact path={`/qas/add`} component={AddQa}/>
          <PrivateRoute exact path={`/qas/edit/:id`} component={EditQa}/>
          <PrivateRoute exact path={`/qas/report/:id`} component={QaReport}/>
          <PrivateRoute exact path={`/jobs/penetrations/:job`} component={Penetrations}/>
          <PrivateRoute exact path={`/jobs/penetrations/:job/add`} component={AddPenetration}/>
          <PrivateRoute exact path={`/jobs/penetrations/:job/edit/:id`} component={EditPenetration}/>
          <PrivateRoute exact path={`/jobs/qas/:job`} component={Qas}/>
          <PrivateRoute exact path={`/users`} component={Users}/>
          <PrivateRoute exact path={`/users/add`} component={AddUser}/>
          <PrivateRoute exact path={`/users/edit/:id`} component={EditUser}/>
          <PrivateRoute exact path={`/employees`} component={Employees}/>
          <PrivateRoute exact path={`/employees/edit/:id`} component={EditEmployee}/>
          <PrivateRoute exact path={`/employees/add`} component={AddEmployee}/>
          <PrivateRoute exact path={`/reports/employees`} component={ListEmployees}/>
          <PrivateRoute exact path={`/reports/jobs/fire/:id`} component={FireRegister}/>
          <PrivateRoute exact path={`/timesheets`} component={TimeSheets}/>
          <PrivateRoute exact path={`/timesheets/add`} component={AddTimeSheet}/>
          <PrivateRoute exact path={`/timesheets/print`} component={TimeSheetReport}/>
          <PrivateRoute exact path={`/timesheets/print/:id`} component={TimeSheetReport}/>
          <PrivateRoute exact path={`/charts`} component={Charts}/>

          <PrivateRoute exact path={`/estimates`} component={Estimates}/>
          <PrivateRoute exact path={`/estimates/edit/:id`} component={EditEstimate}/>
          <PrivateRoute exact path={`/estimates/import`} component={Costx}/>

    </React.Fragment>
  );

}

export default connect((state) => ({
  loading: state.loading
}))(withRouter(App))
