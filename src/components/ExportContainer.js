import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'carbon-components-react';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import {getSwagger} from '../selectors/index';
import {convertToDisplayString, languageToExtension} from '../utils/utils';
import './ButtonContainer.css';

class ExportContainer extends Component {
  constructor(props) {
    super(props);
    this.buildOutputFile = this.buildOutputFile.bind(this);
  }

  buildOutputFile(swagger) {
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
        if (sdkExamples && sdkExamples['request-examples']) {
          // create sub-folders for examples in each language
          Object.entries(sdkExamples['request-examples']).forEach(
            ([language, languageExample]) => {
              if (language === 'curl') {
                return;
              }
              const langaugeFolder = exampleFolder.folder(language);

              let blobArray = [];
              languageExample.forEach(example => {
                blobArray.push(
                  convertToDisplayString(example['example'][0]['source']),
                );
              });
              langaugeFolder.file(
                `${methodInfo.operationId}${languageToExtension[language]}`,
                new Blob(blobArray),
              );
            },
          );
        }
      });
    });

    zip
      .generateAsync({type: 'blob'})
      .then(blob => FileSaver.saveAs(blob, 'examples.zip'));
  }

  render() {
    const {swagger} = this.props;

    return (
      <div className="container">
        <Button
          className="button"
          disabled={swagger == null}
          onClick={() => {
            this.buildOutputFile(swagger);
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
  swagger: getSwagger(state),
});

export default connect(mapStateToProps)(ExportContainer);
