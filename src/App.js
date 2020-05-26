import React, { Component } from 'react'

import { Route } from 'react-router-dom'
import { Link, withRouter, Redirect, MemoryRouter as Router } from 'react-router-dom'
import NavBar from './Components/NavBar';
import  Home from './Scenes/Home'
import Jobs from './Scenes/Jobs';
import Users from './Scenes/Users';
import Employees from './Scenes/Employees';
import EditEmployee from './Scenes/Employees/edit';
import AddEmployee from './Scenes/Employees/add';

import Pdf from './Reports/PDF';
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
            
         
              <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>  

              <PrivateRoute exact path="/" component={Home}/>      
              

              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/jobs`} component={Jobs}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/jobs/add`} component={AddJob}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/jobs/edit/:id`} component={EditJob}/>    
              
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/qa`} component={Qas}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/qa/add`} component={AddQa}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/qa/report/:id`} component={QaReport}/>    


              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/jobs/penetrations/:job`} component={Penetrations}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}//jobs/penetrations/:job/add`} component={AddPenetration}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/jobs/penetrations/:job/edit/:id`} component={EditPenetration}/>    


              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/users`}component={Users}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/users/add`} component={AddUser}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/users/edit/:id`} component={EditUser}/>    

              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/employees`} component={Employees}/>    
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/employees/add`} component={AddEmployee}/>   
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/employees/:id`} component={EditEmployee}/>   

              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/reports/employees`} component={ListEmployees}/>   
              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/reports/jobs/fire/:id`} component={FireRegister}/>   

              <PrivateRoute exact path={`${process.env.PUBLIC_URL}/pdf`} component={Pdf}/>                     


          </div>
        );
      }
}


export default withRouter(App);
