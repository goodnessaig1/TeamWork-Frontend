import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Hoc/Layout'
import './App.css';
import Home from './Components/Home/Home';


const App = () => {
  return (
    <>
      <Layout>
        <div className='route'>
          <Switch>
          {/* Home Routes         */}
            <Route path="/" exact component={Home}/>
            {/* Routes Would go here */}
          </Switch>
        </div>
      </Layout>
    </>
  )
}

export default App