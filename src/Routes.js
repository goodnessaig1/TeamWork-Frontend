import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Hoc/Layout'
import './App.css';


const Routes = () => {
  return (
    
    <Layout>
      <div className='route'>
        <Switch>
          {/* Routes Would go here */}
        </Switch>
      </div>
    </Layout>
  )
}

export default Routes