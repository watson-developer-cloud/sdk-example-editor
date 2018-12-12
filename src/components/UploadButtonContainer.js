import React, { Component } from 'react';
import { Button } from 'carbon-components-react';
import './styles.css';

export class UploadButtonContainer extends Component {
  render() {
    return (
      <div className='upload-button-container'>
        <Button id='upload-button'>Upload</Button>
      </div>
    );
  }
}
