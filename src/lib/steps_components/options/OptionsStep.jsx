import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

import userData, {RID,STUDY_ID} from '../../../UserData'

class OptionsStep extends Component {
  onOptionClick = ({ value }) => {
    const { triggerNextStep } = this.props;
    if (value === 'Take me to the Survey.'){
      window.open(`https://umdsurvey.umd.edu/jfe/form/SV_50IxOfTo7nE6Wfr?ScreenRId=${userData.get(RID)}&StudyId=${userData.get(STUDY_ID)}`, '_self')
      return;
    }
    triggerNextStep({ value });

  };

  renderOption = option => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { value, label } = option;

    return (
      <Option key={value} className="rsc-os-option">
        <OptionElement
          className="rsc-os-option-element"
          style={bubbleOptionStyle}
          user={user}
          onClick={() => this.onOptionClick({ value })}
        >
          {label}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step, previousValue } = this.props;
    let { options } = step;
    if (previousValue && previousValue.options) {
      console.log(previousValue);
      options = previousValue.options
    }
    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {Object.keys(options).map(key => options[key]).map(this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};

export default OptionsStep;
