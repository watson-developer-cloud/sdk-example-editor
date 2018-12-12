import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {CodeSnippet} from 'carbon-components-react';

import './ExamplesContainer.css';

export class ExamplesContainer extends Component {
  constructor(props) {
    super(props);
    this.codeSnippet = `
IamOptions iamOptions = new IamOptions.Builder().apiKey("{apikey}").build();
Assistant service = new Assistant("2018-11-08", iamOptions);

MessageInput input = new MessageInput.Builder()
  .messageType("text")
  .text("Hello")
  .build();

MessageOptions options = new MessageOptions.Builder("{assistant_id}", "{session_id}")
  .input(input)
  .build();

MessageResponse response = service.message(options).execute();

System.out.println(response);
`;
  }
  render() {
    console.log(this.codeSnippet);
    return (
      <div className="bx--tile">
        <div className="bx--row">
          <div className="bx--col-xs-12 bx--col-md-12">
            <h3>message</h3>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-xs-12 bx--col-md-12">
            <p>Send user input to an assistant.</p>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-xs-12 bx--col-md-6">
            <CodeSnippet type="multi" feedback="Copied">
              {this.codeSnippet}
            </CodeSnippet>
          </div>
          <div className="bx--col-xs-12 bx--col-md-6">
            <SyntaxHighlighter language="javascript">
              {this.codeSnippet}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}
