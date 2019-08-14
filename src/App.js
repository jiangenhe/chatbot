import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';
import ChatBot from './lib/index';
import {RemoteTextStep} from './lib/steps_components/'
import DialogFlowStep from './DialogFlowStep'

const steps = [
  {
    id: 'welcome',
    message: 'Welcome, order coffee?',
    trigger: 'user',
  },
  {
    id: 'user',
    user: true,
    trigger: 'dialog-flow'
  },
  {
    id: 'dialog-flow',
    component: <DialogFlowStep/>,
    waitAction: true,
    trigger: 'user',
    asMessage: true
  },
];



class App extends Component {
  render () {
    return (
      <div style={{width:'350px', margin:'40px auto'}}>
        <ChatBot steps={steps} />
      </div>
    )
  }
}

App.propTypes = {}

export default App
