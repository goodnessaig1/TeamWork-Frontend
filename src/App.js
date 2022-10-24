import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Hoc/Layout'
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Register-Login/Login/Login';
import Register from './Components/Register-Login/Register/Register';
import RegistrationSuccess from './Components/Register-Login/Register/RegistrationSuccess';
import AuthRoute from './Auth/AuthRoute';
import MainPage from './Components/Dashboard/MainPage';
import UserProfile from './Components/Profile/UserProfile';
import LoginSuccess from './Components/Register-Login/Login/LoginSuccess';



const App = () => {


  return (
    <>
      <Switch>
        
        <Route path="/sign_in" exact component={Login}/>
        <Route path="/create-user" exact component={Register}/>
        <Route path="/registration_success" exact component={RegistrationSuccess}/>
        <Route path="/login_success" exact component={LoginSuccess}/>
        
        <Layout>
          <div className='routes'>
            {/* Home Routes         */}
              <Route path="/" exact component={Home}/>
              <Route path="/dashboard" exact component={MainPage}/>
              <AuthRoute path="/profile" exact component={UserProfile}/>
            {/* Routes Would go here */}
          </div>
        </Layout>
      </Switch>
    </>
  )
}


export default App;