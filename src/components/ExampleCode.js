import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {TextArea} from 'carbon-components-react';
import {solarizedDark} from 'react-syntax-highlighter/dist/styles/hljs';

import './ExampleCode.css';

const ExampleCode = ({code, operationId, summary, language, onCodeChange}) => {
  return (
    <div className="bx--tile bx--row">
      <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-6">
        <TextArea
          hideLabel={false}
          labelText={operationId}
          invalidText="A valid code snippet is required"
          helperText={summary}
          placeholder="Type code snippet here..."
          cols={100}
          rows={20}
          onChange={onCodeChange}
          value={code}
        />
      </div>
      <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-6">
        <SyntaxHighlighter
          className="example-container--code"
          language="javascript"
          style={solarizedDark}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

ExampleCode.defaultProps = {
  code: '<p></p>',
  operationId: 'unknown',
  summary: 'The operation summary',
  language: 'node',
  updateExample: () => {},
};

export default ExampleCode;
