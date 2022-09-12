import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Hoc/Layout'
import './App.css';
import Home from './Components/Home/Home';


const App = () => {
  return (
    <>
        <div className='route'>
      <Layout>
          <Switch>
          {/* Home Routes         */}
            <Route path="/" exact component={Home}/>
            {/* Routes Would go here */}
          </Switch>
      </Layout>
        </div>
    </>
  )
}

export default App