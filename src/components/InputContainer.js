import React, {Component} from 'react';
import {FileUploader, TextInput} from 'carbon-components-react';
import './InputContainer.css';

export class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.readFileContent = this.readFileContent.bind(this);
  }

  handleFileChange(evt) {
    const file = evt.target.files[0];
    let fileContents;
    this.readFileContent(file)
      .then((content) => {
        fileContents = JSON.parse(content);
        console.log(fileContents);
      })
      .catch(error => console.log(error));
  }

  readFileContent(file) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = event => resolve(event.target.result);
      fileReader.onerror = error => reject(error);
      fileReader.readAsText(file);
    });
  }

  render() {
    return (
      <div className="input-container">
        <FileUploader
          buttonLabel="Select Swagger file"
          filenameStatus="edit"
          onChange={this.handleFileChange}
        />
        <TextInput
          className="url-input"
          id="url-input"
          labelText="Add URL for Swagger file"
        />
      </div>
    );
  }
}
