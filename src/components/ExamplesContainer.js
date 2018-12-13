import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCodeExamples, getSelectedLanguage} from '../selectors';
import * as actions from '../ducks';
import ExampleCode from './ExampleCode';

import './ExamplesContainer.css';

class ExamplesContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {codeExamples, selectedLanguage, updateExample} = this.props;

    return (
      <div className="bx--row">
        {codeExamples.map(c => (
          <ExampleCode
            key={c.operationId}
            {...c}
            onCodeChange={newCodeExample =>
              updateExample(c.path, c.method, selectedLanguage, newCodeExample.target.value)
            }
          />
        ))}
      </div>
    );
  }
}

ExamplesContainer.defaultProps = {
  codeExamples: [],
};

const mapStateToProps = state => ({
  codeExamples: getCodeExamples(state),
  selectedLanguage: getSelectedLanguage(state),
});

const mapDispatchToProps = {
  updateExample: actions.updateExample,
  updateSwagger: actions.updateSwagger,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamplesContainer);
