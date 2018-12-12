import React, { Component } from 'react';
import { FileUploader, TextInput } from 'carbon-components-react';
import '../../node_modules/carbon-components/css/carbon-components.css';
import './styles.css';

export class InputContainer extends Component {
  render() {
    return (
      <div className='input-container'>
        <FileUploader buttonLabel='Select Swagger file' filenameStatus='edit' />
        <TextInput className='url-input' id='url-input' labelText='Add URL for Swagger file'/>
      </div>
    );
    // has file upload button and text input vertically
  }
}
