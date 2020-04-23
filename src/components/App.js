import React, { Component } from 'react';
import InputContainer from './InputContainer';
import {
  Header,
  HeaderName,
} from 'carbon-components-react/lib/components/UIShell';

import FileList from './FileList';

import './App.scss';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header aria-label="IBM Examples Editor">
          <HeaderName href="#" prefix="IBM">
            SDK Examples Editor
          </HeaderName>
        </Header>
        <div className="bx--grid App__content">
          <div className="bx--row">
            <div className="bx--col">
              <InputContainer />
              <FileList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
