import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {TextArea} from 'carbon-components-react';
import {solarizedDark} from 'react-syntax-highlighter/dist/styles/hljs';

import './ExampleCode.css';

const ExampleCode = ({name, code, language, onCodeChange}) => {
  return (
    <div className="endpoint-example">
      <p>{name}</p>
      <div className="text-areas">
        <div className="editable-area">
          <TextArea
            invalidText="A valid code snippet is required"
            placeholder="Type code snippet here..."
            cols={100}
            rows={20}
            onChange={onCodeChange}
            value={code}
          />
        </div>
        <div className="result-area">
          <SyntaxHighlighter
            className="example-container--code"
            language="javascript"
            style={solarizedDark}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

ExampleCode.defaultProps = {
  code: '<p></p>',
  language: 'node',
  updateExample: () => {},
};

export default ExampleCode;
