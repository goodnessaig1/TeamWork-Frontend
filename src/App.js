import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Hoc/Layout'
import './App.css';
import Home from './Components/Home/Home';


const App = () => {
  return (
    <>
      <Switch>
          {/* Home Routes         */}
        <Route path="/" exact component={Home}/>
        <div className='route'>
          <Layout>
            {/* Routes Would go here */}
          </Layout>
        </div>
      </Switch>
    </>
  )
}

export default App