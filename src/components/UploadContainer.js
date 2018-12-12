import React, { Component } from 'react';
import { InputContainer } from './InputContainer';
import { UploadButtonContainer } from './UploadButtonContainer';
import './styles.css';

export class UploadContainer extends Component {
  render() {
    return (
      <div className='upload-container'>
        <InputContainer/>
        <UploadButtonContainer/>
      </div>
    );
  }
}
