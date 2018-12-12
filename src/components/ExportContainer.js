import React, {Component} from 'react';
import {Button} from 'carbon-components-react';
import './ExportContainer.css';

export class ExportContainer extends Component {
  render() {
    return (
      <div className="export-container">
        <Button
          onChange={() => {
            console.log('Download OpenAPI');
          }}
        >
          Download
        </Button>
      </div>
    );
  }
}
