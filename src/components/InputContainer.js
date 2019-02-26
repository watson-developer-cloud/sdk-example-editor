import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FileUploaderButton} from 'carbon-components-react';
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
    let fileContents;
    this.readFileContent(file)
      .then(content => {
        fileContents = JSON.parse(content);
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
  updateSwagger: actions.updateSwagger,
};

export default connect(
  null,
  mapDispatchToProps,
)(InputContainer);
