import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {TextArea} from 'carbon-components-react';
import {solarizedDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {convertToDisplayString} from '../utils/utils';
import './ExampleCode.css';

const ExampleCode = ({name, code, language, onCodeChange}) => {
  return (
    <div className="endpoint-example">
      <p>{name}</p>
      <div className="text-area-wrapper">
        <div className="text-area">
          <TextArea
            labelText={name}
            hideLabel={true}
            invalidText="A valid code snippet is required"
            placeholder="Type code snippet here..."
            cols={100}
            rows={24}
            onChange={onCodeChange}
            value={convertToDisplayString(code)}
          />
        </div>
        <div className="text-area">
          <SyntaxHighlighter
            className="example-container--code"
            language={language}
            style={solarizedDark}
          >
            {convertToDisplayString(code)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

ExampleCode.defaultProps = {
  code: [],
  language: 'node',
  updateExample: () => {},
};

export default ExampleCode;
