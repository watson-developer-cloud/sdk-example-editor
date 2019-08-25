import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FileUploaderButton} from 'carbon-components-react';
import yaml from 'js-yaml';
import './ButtonContainer.css';
import * as actions from '../ducks';

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.readFileContent = this.readFileContent.bind(this);
  }

  handleFileChange(evt) {
    const file = evt.target.files[0];

    // set file type for exporting later
    const isJson = file.name.split('.').pop() === 'json';
    this.props.isJson(isJson);

    let fileContents;
    this.readFileContent(file)
      .then(content => {
        // we'll assume it's YAML if it's not JSON
        if (isJson) {
          fileContents = JSON.parse(content);
        } else {
          fileContents = yaml.safeLoad(content);
        }
        this.props.updateSwagger(fileContents);
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
      <div className="container">
        <FileUploaderButton
          labelText="Select Swagger file"
          className="button"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  isJson: actions.isJson,
  updateSwagger: actions.updateSwagger,
};

export default connect(
  null,
  mapDispatchToProps,
)(InputContainer);
