import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';
import ChatBot from './lib/index';
import { ThemeProvider } from 'styled-components';
import DialogFlowStep from './DialogFlowStep'
import userData, {BOT_CODE, USER_NAME} from './UserData'
import botConfig from './BotConfig'
let steps;

if (userData.get(BOT_CODE)) {
  steps = [
    {
      id: 'welcome-text',
      message: `Hi there :wave: I'm ${botConfig[userData.get(BOT_CODE)].name}`,
      trigger: 'welcome-image',
    },
    {
      id: 'welcome-image',
      component: <div><img style={{
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 2px 0px'
      }
      } width={165} height={220}
                           src={`images/${userData.get(BOT_CODE)}_large.png`}
                           alt="Chatbot's avatar"/></div>,
      trigger: 'welcome-user-hi'
    },
    {
      id: 'welcome-user-hi',
      options: [
        {
          value: 0,
          label: `Hi ${botConfig[userData.get(BOT_CODE)].name}`,
          trigger: 'welcome-name'
        }],
    },
    {
      id: 'welcome-name',
      message: 'What\'s your first name? :pencil2:',
      trigger: 'welcome-user-name'
    },
    {
      id: 'welcome-user-name',
      user: true,
      trigger: (value) => {
        userData.set(USER_NAME, value.value)
        return 'welcome-compliment';
      }
    },
    {
      id: 'welcome-compliment',
      message: `{previousValue}. That's a nice name`,
      trigger: 'welcome-bot-intro'
    },
    {
      id: 'welcome-bot-intro',
      message: 'I am emotional assistant',
      trigger: 'user'
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
    if (userData.get(BOT_CODE)) {
      return (
        <div style={{width: '420px', margin: '10px auto'}}>
          <ThemeProvider theme={theme}>
            <ChatBot width='420px' height='750px' steps={steps} botAvatar={`images/${userData.get(BOT_CODE)}_small.png`} botName={botConfig[userData.get(BOT_CODE)].name}/>
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
