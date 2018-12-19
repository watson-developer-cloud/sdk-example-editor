import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'carbon-components-react';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import {getSwagger, getSelectedLanguage} from '../selectors/index';
import './ButtonContainer.css';

class ExportContainer extends Component {
  constructor(props) {
    super(props);
    this.buildOutputFile = this.buildOutputFile.bind(this);
  }

  buildOutputFile(swagger, selectedLanguage) {
    const zip = new JSZip();
    zip.file(
      'new-swagger.json',
      new Blob([JSON.stringify(swagger, null, 2)], {type: 'application/json'}),
    );

    const exampleFolder = zip.folder('examples');
    Object.entries(swagger.paths).forEach(([_, pathInfo]) => {
      Object.entries(pathInfo).forEach(([_, methodInfo]) => {
        // this is something we don't want, like a parameters array
        if (Array.isArray(methodInfo)) {
          return;
        }

        const sdkExamples = methodInfo['x-sdk-operations'];
        if (
          sdkExamples &&
          sdkExamples['request-examples'] &&
          sdkExamples['request-examples'][selectedLanguage]
        ) {
          let blobArray = [];
          sdkExamples['request-examples'][selectedLanguage].forEach(example => {
            blobArray.push(
              JSON.stringify(example['example'][0]['source'], null, 2),
            );
          });
          exampleFolder.file(
            `${methodInfo.operationId}.json`,
            new Blob(blobArray, {type: 'application/json'}),
          );
        }
      });
    });

    zip
      .generateAsync({type: 'blob'})
      .then(blob => FileSaver.saveAs(blob, 'examples.zip'));
  }

  render() {
    const {selectedLanguage, swagger} = this.props;

    return (
      <div className="container">
        <Button
          className="button"
          disabled={swagger == null}
          onClick={() => {
            this.buildOutputFile(swagger, selectedLanguage);
          }}
          type="submit"
        >
          Download
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: getSelectedLanguage(state),
  swagger: getSwagger(state),
});

export default connect(mapStateToProps)(ExportContainer);
