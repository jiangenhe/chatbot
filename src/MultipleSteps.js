import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'react-simple-chatbot';
import UserData, {SESSION_ID} from './UserData'

class MultipleSteps extends Component {
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
    const { steps, previousStep } = this.props;
    const currentStep = previousStep.value[0];
    const restSteps = previousStep.value.slice(1)

    if (currentStep.message) {
      self.setState({ loading: false, result: currentStep.message });
      if (restSteps.length) {
        if (restSteps[0].message){
          this.setState({ trigger: true }, () => {
            this.props.triggerNextStep({trigger: 'multiple', value: restSteps});
          });
        } else if (restSteps[0].options) {
          this.setState({trigger: true}, () => {
            this.props.triggerNextStep({
              trigger: 'options',
              value: {options: restSteps[0].options}
            });
          });
        }
      } else {
        this.setState({ trigger: true }, () => {
          this.props.triggerNextStep({trigger: 'user'});
        });
      }
    }
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


export default MultipleSteps
