import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound';
import NavBar from './components/Header/NavBar';
import UserNavBar from './components/UserHeader/UserNavBar';
import CreateUser from './views/CreateUser/CreateUser';
import User from './views/User/User';
import Login from './views/Login/Login';
import NewAppointment from './views/NewAppointment/NewAppointment';
import Admin from './views/Admin/Admin';
import RescheduleAppointment from './views/RescheduleAppointment/RescheduleAppointment';
import ContactAndFindUs from './views/ContactAndFindUs/ContactAndFindUs';
import Appointment from './views/Appointment/Appointment';
import NewAppointmentAdmin from './views/NewAppointmentAdmin/NewAppointmentAdmin';
import 'antd/dist/antd.css';

const Auth = {
  isAuthenticated: false,
  update(change) {
    this.isAuthenticated = change;
  }
}

const AdminAuth = {
  isAuthenticated: false,
  update(change) {
    this.isAuthenticated = change;
  }
}

const PrivateRoute = ({ component: Component, authorized: auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {exactpath: rest[0]}  // TODO: Pass in a state of where they were going so it wouldnt have to bring them to user page.
    }} />
  )} />
)
const PrivateHomeRoute = ({ component: Component, authorized: auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ?  <Redirect to='/User'/>
      : <Component {...props}/>
  )} />
)

const PrivateAdminRoute = ({ component: Component, adminAuthorized: adminAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    adminAuth === true
      ?  <Redirect to='/Admin'/>
      : <PrivateRoute component= {Component} {...props}/>
  )} />
)


const DecideNavBar = (props) => {
  const isLoggedIn = props.authorized;
  if (isLoggedIn) {
    return <UserNavBar 
      exact path='' 
      user = {props.user} 
      updateAuthorization = {props.updateAuthorization}
      updateAdminAuthorization = {props.updateAdminAuthorization}
      updateAccount = {props.updateAccount}/>;
  }
  return <NavBar exact path='' />;
}


const App = (props) => {
  const [account, setAccount] = useState('');
  const [authorizedAdmin, setAuthorizedAdmin] = useState(false);
  const updateAccount =  (value) => {
    setAccount(value);
};
const updateAuthorization = (value) => {
  Auth.update(value);
};
const updateAdminAuthorization = (value) => {
  AdminAuth.update(value);
};
  return (
    <div>
      <Switch>
        <DecideNavBar 
          authorized ={Auth.isAuthenticated} 
          user={account} 
          updateAuthorization = {updateAuthorization} 
          updateAdminAuthorization = {updateAdminAuthorization} 
          updateAccount = {updateAccount}/>
      </Switch>
      <Switch>
        <PrivateHomeRoute exact path='/Home' component={Home} />
        <Route exact path="/ContactAndFindUs" component={ContactAndFindUs} />
        <Route 
          exact path='/CreateUser' 
          component={() => 
          <CreateUser 
            set={e =>updateAccount(e)} 
            setAuthorized= {e=>updateAuthorization(e)} 
          />}
        />
        <Route 
          exact path='/Login' 
          component={() => 
          <Login 
            set={e =>updateAccount(e)} 
            exactpath = {'/User'}
            authorized={Auth.isAuthenticated}
            AdminAuthorized={AdminAuth.isAuthenticated}
            setAuthorized= {e=>updateAuthorization(e)} 
            setAdminAuthorized= {e=>updateAdminAuthorization(e)}
            />}
        />
        <PrivateAdminRoute exact path='/User' 
          adminAuthorized = {AdminAuth.isAuthenticated} 
          authorized = {Auth.isAuthenticated}
          component={() => <User email={account} />}
        />
        <PrivateRoute exact path="/NewAppointment" email = {account} component={() => <NewAppointment email={account}/>} />
        <PrivateRoute exact path="/NewAppointmentAdmin" component={() => <NewAppointmentAdmin/>} />
        <PrivateRoute exact path="/Admin" component={Admin} />
        <PrivateRoute exact path="/RescheduleAppointment" component={RescheduleAppointment} />
        
        <PrivateRoute exact path="/Appointment/:value" component={(matchProps) => <Appointment email={account} {...matchProps} {...props}/>} />

        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );

};

export default App;
