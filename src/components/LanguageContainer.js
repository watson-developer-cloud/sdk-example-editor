import React, {Component} from 'react';
import {Select, SelectItem} from 'carbon-components-react';

import './LanguageContainer.css';

export class LanguageContainer extends Component {
  render() {
    return (
      <div className="language-container bx--tile">
        <Select
          hideLabel={false}
          invalidText="A valid value is required"
          helperText="Select the programming language to work with."
          onChange={() => {
            console.log('programing language change');
          }}
          id="programming-language"
          defaultValue="java"
        >
          <SelectItem value="java" text="Java" />
          <SelectItem value="node" text="Node" />
        </Select>
      </div>
    );
  }
}
