import React, { Component } from 'react'

import { Route } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar';
import  Home from './Scenes/Home'
import Jobs from './Scenes/Jobs';
import Users from './Scenes/Users';
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
import { Qas } from './Scenes/Qa';
import { QaReport } from './Reports/Qa/QaReport';
import AddQa from './Scenes/Qa/add';
import Login from './Scenes/Login';
import EditQa from './Scenes/Qa/edit';
import TimeSheets from './Scenes/TimeSheet';
import TimeSheetReport from './Reports/TimeSheets/TimeSheetReport';





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
        console.log(process.env.PUBLIC_URL, "here");
      }


    render() {


        return (
          <div className="App">

            <NavBar {...this.props}/>


              <Route exact path={`/login`} component={Login}/>

              <PrivateRoute exact path="/" component={Home}/>


              <PrivateRoute exact path={`/jobs`} component={Jobs}/>
              <PrivateRoute exact path={`/jobs/add`} component={AddJob}/>
              <PrivateRoute exact path={`/jobs/edit/:id`} component={EditJob}/>

              <PrivateRoute exact path={`/qa`} component={Qas}/>
              <PrivateRoute exact path={`/qa/add`} component={AddQa}/>
              <PrivateRoute exact path={`/qa/edit/:id`} component={EditQa}/>
              <PrivateRoute exact path={`/qa/report/:id`} component={QaReport}/>


              <PrivateRoute exact path={`/jobs/penetrations/:job`} component={Penetrations}/>
              <PrivateRoute exact path={`//jobs/penetrations/:job/add`} component={AddPenetration}/>
              <PrivateRoute exact path={`/jobs/penetrations/:job/edit/:id`} component={EditPenetration}/>

              <PrivateRoute exact path={`/jobs/qas/:job`} component={Qas}/>

              <PrivateRoute exact path={`/users`}component={Users}/>
              <PrivateRoute exact path={`/users/add`} component={AddUser}/>
              <PrivateRoute exact path={`/users/edit/:id`} component={EditUser}/>

              <PrivateRoute exact path={`/employees`} component={Employees}/>
              <PrivateRoute exact path={`/employees/add`} component={AddEmployee}/>
              <PrivateRoute exact path={`/employees/:id`} component={EditEmployee}/>

              <PrivateRoute exact path={`/reports/employees`} component={ListEmployees}/>
              <PrivateRoute exact path={`/reports/jobs/fire/:id`} component={FireRegister}/>

              <PrivateRoute exact path={`/timesheets`}component={TimeSheets}/>
              <PrivateRoute exact path={`/timesheets/print`}component={TimeSheetReport}/>
              <PrivateRoute exact path={`/timesheets/print/:id`}component={TimeSheetReport}/>


          </div>
        );
      }
}


export default withRouter(App);
