import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEndpointExamples, getSelectedLanguage} from '../selectors';
import * as actions from '../ducks';
import ExampleCode from './ExampleCode';

import './ExamplesContainer.css';

class ExamplesContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {endpointExamples, selectedLanguage, updateExample} = this.props;

    return (
      <div className="examples-container">
        {endpointExamples.map(endpoint => (
          <div
            className="examples-container__endpoint bx--tile"
            key={endpoint.operationId}
          >
            <div className="endpoint-description">
              <h2>{endpoint.operationId}</h2>
              <h3>{endpoint.summary}</h3>
            </div>
            {endpoint.examples.map((example, index) => (
              <ExampleCode
                key={example.name}
                code={example.code}
                name={example.name}
                language={selectedLanguage}
                onCodeChange={newCodeExample =>
                  updateExample(
                    endpoint.path,
                    endpoint.method,
                    selectedLanguage,
                    index,
                    newCodeExample.target.value,
                  )
                }
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

ExamplesContainer.defaultProps = {
  endpointExamples: [],
};

const mapStateToProps = state => ({
  endpointExamples: getEndpointExamples(state),
  selectedLanguage: getSelectedLanguage(state),
});

const mapDispatchToProps = {
  updateExample: actions.updateExample,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamplesContainer);
