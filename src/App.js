import React, { Component } from 'react'

import { Route, HashRouter } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar';
import  Home from './Scenes/Home'
import Jobs from './Scenes/Jobs';
import Users from './Scenes/Users';
import Qas from './Scenes/Qa';
import Employees from './Scenes/Employees';
import EditEmployee from './Scenes/Employees/edit';
import AddEmployee from './Scenes/Employees/add';


import ListEmployees from './Reports/Employees/list';
import FireRegister from './Reports/Job/FireRegister';
import AddUser from './Scenes/Users/add';
import EditUser from './Scenes/Users/edit';
import AddJob from './Scenes/Jobs/add';
import EditJob from './Scenes/Jobs/edit';
import { Penetrations } from './Scenes/Jobs/Penetrations';
import AddPenetration from './Scenes/Jobs/Penetrations/add';
import EditPenetration from './Scenes/Jobs/Penetrations/edit';
import './App.css';

import QaReport from './Reports/Qa/QaReport';
import AddQa from './Scenes/Qa/add';
import Login from './Scenes/Login';
import EditQa from './Scenes/Qa/edit';
import TimeSheets from './Scenes/TimeSheet';
import TimeSheetReport from './Reports/TimeSheets/TimeSheetReport';
import { connect } from 'react-redux'
import {
  handleInitialData
} from './Redux/Actions/shared'
import AddTimeSheet from './Scenes/TimeSheet/add';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
export const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    !localStorage.token
    ? <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />

    : <Component {...props} />
  )} />
)


class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleInitialData())
      }


    render() {
        return (
          <React.Fragment>

              <NavBar {...this.props}/>
                <Route exact path={`./login`} component={Login}/>
                <PrivateRoute exact path="/" component={Home}/>
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
                <PrivateRoute exact path={`/users`}component={Users}/>
                <PrivateRoute exact path={`/users/add`} component={AddUser}/>
                <PrivateRoute exact path={`/users/edit/:id`} component={EditUser}/>
                <PrivateRoute exact path={`/employees`} component={Employees}/>
                <PrivateRoute exact path={`/employees/edit/:id`} component={EditEmployee}/>
                <PrivateRoute exact path={`/employees/add`} component={AddEmployee}/>
                <PrivateRoute exact path={`/reports/employees`} component={ListEmployees}/>
                <PrivateRoute exact path={`/reports/jobs/fire/:id`} component={FireRegister}/>
                <PrivateRoute exact path={`/timesheets`}component={TimeSheets}/>
                <PrivateRoute exact path={`/timesheets/add`}component={AddTimeSheet}/>
                <PrivateRoute exact path={`/timesheets/print`}component={TimeSheetReport}/>
                <PrivateRoute exact path={`/timesheets/print/:id`}component={TimeSheetReport}/>
          </React.Fragment>
        );
      }
}


export default connect((state) => ({
  loading: state.loading
}))(withRouter(App))
