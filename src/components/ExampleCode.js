import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { TextArea } from 'carbon-components-react';
import { solarizedDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { convertToDisplayString } from '../utils/utils';

import './ExampleCode.scss';

const ExampleCode = ({ name, code, language, onCodeChange }) => {
  const _language = language === 'dotnet-standard' ? 'cs' : language;
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
            cols={80}
            rows={20}
            onChange={onCodeChange}
            value={convertToDisplayString(code)}
          />
        </div>
        <div className="text-area">
          <SyntaxHighlighter
            className="example-container--code"
            language={_language}
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

export default React.memo(
  ExampleCode,
  (prev, next) => prev.code === next.code && prev.language === next.language
);
