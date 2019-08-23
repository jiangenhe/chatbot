import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'react-simple-chatbot';
import UserData, {SESSION_ID} from './UserData'

class DialogFlowStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

  }

  componentWillMount() {
    const self = this;
    const { sendMessage, previousStep } = this.props;
    const query = sendMessage ? sendMessage : previousStep.value;

    fetch(`http://jiangenhe.com:8001/?query=${query}${UserData.get(SESSION_ID) ? `&sessionId=${UserData.get(SESSION_ID)}` : ''}`, {mode: "cors"})
      .then(response => {
        return response.json();
      })
      .then((data) => {
        if (!UserData.get(SESSION_ID)) {
          if (data.sessionId) {
            UserData.set(SESSION_ID, data.sessionId)
          }
        }

        let messages;
        if (data.fulfillmentText) {
          messages = data.fulfillmentText.split('\n').map(m => ({message: m}));
          if (data.fulfillmentMessages) {
            for (let i in data.fulfillmentMessages) {
              let message = data.fulfillmentMessages[i];
              if (message.payload) {
                if (message.payload.fields) {
                  if (message.payload.fields.options) {
                    console.log(message.payload.fields.options);
                    if (message.payload.fields.options.listValue) {
                      let options = message.payload.fields.options.listValue.values;
                      messages.push({options: options.map(option => ({value: option.stringValue, label: option.stringValue}))});
                    }
                  }
                }
              }
            }
          }
          if (messages.length === 1){
            self.setState({ loading: false, result: data.fulfillmentText });
            this.setState({ trigger: true }, () => {
              this.props.triggerNextStep({trigger: 'user'});
            });
          } else {
            console.log(messages[0].message);
            self.setState({ loading: false, result: messages[0].message });
            const restMessages = messages.slice(1);
            if (restMessages[0].options) {
              this.setState({trigger: true}, () => {
                this.props.triggerNextStep({
                  trigger: 'options',
                  value: {options: restMessages[0].options}
                });
              });
            } else {
              this.setState({ trigger: true }, () => {
                this.props.triggerNextStep({trigger: 'multiple', value: messages.slice(1)});
              });
            }
          }
        }



        // else {
        //   self.setState({ loading: false, result: 'Not found.' });
        // }
      });
  }

  render() {
    const { loading, result } = this.state;

    return (
      <div>
        { loading ? <Loading /> : result }
      </div>
    );
  }
}

DialogFlowStep.propTypes = {
  sendMessage: PropTypes.string
}

DialogFlowStep.defaultProps = {
  sendMessage: null
}

export default DialogFlowStep
