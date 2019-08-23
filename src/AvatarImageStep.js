import React, { Component } from 'react'
import PropTypes from 'prop-types'
import userData, { BOT_CODE } from './UserData'

class AvatarImageStep extends Component {
  render () {
    return (
      <div><img style={{
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 2px 0px',
        margin: '2px 0 0 0'
      }
      } width={165} height={220}
                src={`images/${userData.get(BOT_CODE)}_large.png`}
                alt="Chatbot's avatar"/></div>
    )
  }
}

AvatarImageStep.propTypes = {}

export default AvatarImageStep
