import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Hoc/Layout'
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Register-Login/Login/Login';


const App = () => {
  return (
    <>
      <Switch>
        <Route path="/sign_in" exact component={Login}/>
          <Layout>
            <div className='route'>
            {/* Home Routes         */}
              <Route path="/" exact component={Home}/>
            {/* Routes Would go here */}
          </div>
        </Layout>
      </Switch>
    </>
  )
}

export default App