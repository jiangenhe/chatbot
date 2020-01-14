import React, { Component } from 'react'
import './App.css';
import ChatBot from './lib/index';
import { ThemeProvider } from 'styled-components';
import DialogFlowStep from './DialogFlowStep'
import userData, {BOT_CODE} from './UserData'
import botConfig from './BotConfig'
import AvatarImageStep from './AvatarImageStep'
import MultipleSteps from './MultipleSteps'

let steps;

if (userData.get(BOT_CODE)) {
  steps = [
    {
      id: 'welcome-text',
      message: `Welcome! :wave: I'm ${botConfig[userData.get(BOT_CODE)].name}`,
      trigger: 'welcome-image'
    },
    {
      id: 'welcome-image',
      component: <AvatarImageStep/>,
      trigger: 'welcome-user-hi',
      delay: 2000
    },
    {
      id: 'welcome-user-hi',
      options: [
        {
          value: 0,
          label: `Hi ${botConfig[userData.get(BOT_CODE)].name}`,
          trigger: 'welcome-intro-1'
        }],
      delay: 2000
    },
    {
      id: 'welcome-intro-1',
      message: 'Nice to meet you!',
      trigger: 'welcome-intro-2',
      delay: 1000
    },
    {
      id: 'welcome-intro-2',
      message: 'I know I\'m not real, but I\'m here to listen to you and help you through life.',
      trigger: 'welcome-intro-3',
      delay: 2000
    },
    {
      id: 'welcome-intro-3',
      message: 'Think of me as a texting buddy that gets better every time we talk!',
      trigger: 'dialog-welcome',
      delay: 2000
    },
    {
      id: 'dialog-welcome',
      component: <DialogFlowStep sendMessage='hello'/>,
      waitAction: true,
      trigger: 'user',
      asMessage: true
    },
    {
      id: 'user',
      user: true,
      trigger: 'dialog-flow'
    },
    {
      id: 'options',
      options: [],
      asOption: true
    },
    {
      id: 'dialog-flow',
      component: <DialogFlowStep/>,
      waitAction: true,
      asMessage: true,
      delay: 1500
    },
    {
      id: 'multiple',
      component: <MultipleSteps/>,
      asMessage: true,
      waitAction: true,
      delay: 2000
    },
    {
      id: 'bye',
      message: 'Bye!',
      end: true
    }
  ];
}

const theme = {
  background: '#f4f5f5',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#2bb59a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#fff',
  botFontColor: '#111',
  userBubbleColor: '#2bb59a',
  userFontColor: '#fff',
};

class App extends Component {
  render () {
    document.title = `Chat with ${botConfig[userData.get(BOT_CODE)].name}`;
    if (userData.get(BOT_CODE)) {
      return (
        <div style={{width: '420px', margin: '10px auto'}}>
          <ThemeProvider theme={theme}>
            <ChatBot headerTitle={`Chat with ${botConfig[userData.get(BOT_CODE)].name}`} width='420px' height='750px' steps={steps} botAvatar={`images/${userData.get(BOT_CODE)}_small.png`} botName={botConfig[userData.get(BOT_CODE)].name}/>
          </ThemeProvider>
        </div>
      )
    } else {
      return (<div/>)
    }
  }
}

App.propTypes = {}

export default App
