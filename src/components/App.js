import React, {Component} from 'react';
import {UploadContainer} from './UploadContainer';
import {ExamplesContainer} from './ExamplesContainer';
import {ExportContainer} from './ExportContainer';
import {LanguageContainer} from './LanguageContainer';
import '../../node_modules/carbon-components/css/carbon-components.css';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-xs-12 bx--col-md-12">
            <UploadContainer />
          </div>
        </div>
        <div class="bx--row">
          <div class="bx--col-xs-12 bx--col-md-12">
            <LanguageContainer />
          </div>
        </div>
        <div class="bx--row">
          <div class="bx--col-xs-12 bx--col-md-12">
            <ExamplesContainer />
          </div>
        </div>
        <div class="bx--row">
          <div class="bx--col-xs-12 bx--col-md-12">
            <ExportContainer />
          </div>
        </div>
      </div>
    );
  }
}
