import React, { Component } from 'react'
import './App.css';
import ChatBot from './lib/index';
import { ThemeProvider } from 'styled-components';
import DialogFlowStep from './DialogFlowStep'
import userData, {BOT_CODE} from './UserData'
import botConfig from './BotConfig'
let steps;

if (userData.get(BOT_CODE)) {
  steps = [
    {
      id: 'welcome-text',
      message: `Welcome :wave: I'm ${botConfig[userData.get(BOT_CODE)].name}`,
      trigger: 'welcome-image',
    },
    {
      id: 'welcome-image',
      component: <div><img style={{
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 2px 0px',
        margin: '2px 0 0 0'
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
          trigger: 'welcome-intro-1'
        }],
    },
    {
      id: 'welcome-intro-1',
      message: 'I\'m an Artificial Intelligence, or, a bot. :robot_face:',
      trigger: 'welcome-intro-2'
    },
    {
      id: 'welcome-intro-2',
      message: 'I listen to your story and help you better cope with life. :smile:',
      trigger: 'dialog-welcome'
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
