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

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps, sendMessage } = this.props;
    console.log(steps);
    const query = sendMessage ? sendMessage : steps.user.value;

    fetch(`http://jiangenhe.com:8001/?query=${query}${UserData.get(SESSION_ID) ? `&sessionId=${UserData.get(SESSION_ID)}` : ''}`, {mode: "cors"})
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!UserData.get(SESSION_ID)) {
          if (data.sessionId) {
            UserData.set(SESSION_ID, data.sessionId)
          }
        }
        if (data.fulfillmentText) {
          self.setState({ loading: false, result: data.fulfillmentText });
        } else {
          self.setState({ loading: false, result: 'Not found.' });
        }
      });
  }

  componentDidMount () {
    this.triggetNext()
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

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
