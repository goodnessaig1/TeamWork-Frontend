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



const App = () => {


  return (
    <>
      <Switch>
        <Route path="/sign_in" exact component={Login}/>
        <Route path="/create-user" exact component={Register}/>
        <Route path="/registration_success" exact component={RegistrationSuccess}/>
        <Layout>
          <div className='routes'>
            {/* Home Routes         */}
              <Route path="/" exact component={Home}/>
              <AuthRoute path="/dashboard" exact component={MainPage}/>
            {/* Routes Would go here */}
          </div>
        </Layout>
      </Switch>
    </>
  )
}


export default App;