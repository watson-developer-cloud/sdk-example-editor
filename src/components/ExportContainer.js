import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'carbon-components-react';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import yaml from 'js-yaml';
import {getSwagger, isJson} from '../selectors/index';
import {convertToDisplayString, languageToExtension} from '../utils/utils';
import './ButtonContainer.css';

class ExportContainer extends Component {
  constructor(props) {
    super(props);
    this.buildOutputFile = this.buildOutputFile.bind(this);
  }

  buildOutputFile(isJson, swagger) {
    const serviceName = swagger.info.title.toLowerCase().replace(/ /g, '-');
    const zip = new JSZip();

    if (isJson) {
      zip.file(
        `${serviceName}.json`,
        new Blob([JSON.stringify(swagger, null, 2)], {
          type: 'application/json',
        }),
      );
    } else {
      zip.file(
        `${serviceName}.yaml`,
        new Blob([yaml.safeDump(swagger)], {
          type: 'application/x-yaml',
        }),
      );
    }

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

              languageExample.forEach((example, index) => {
                // ignore other examples types like markdown
                if (!example.example) {
                  return;
                }
                let jsonArray = example['example'][0]['source'];
                // handle cases where some examples are nested for whatever reason
                while (Array.isArray(jsonArray[0])) {
                  jsonArray = jsonArray[0];
                }
                langaugeFolder.file(
                  `${methodInfo.operationId}${index > 0 ? index : ''}${
                    languageToExtension[language]
                  }`,
                  new Blob([convertToDisplayString(jsonArray)]),
                );
              });
            },
          );
        }
      });
    });

    zip
      .generateAsync({type: 'blob'})
      .then(blob => FileSaver.saveAs(blob, `${serviceName}.zip`));
  }

  render() {
    const {isJson, swagger} = this.props;

    return (
      <div className="container">
        <Button
          className="button"
          disabled={swagger == null}
          onClick={() => {
            this.buildOutputFile(isJson, swagger);
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
  isJson: isJson(state),
  swagger: getSwagger(state),
});

export default connect(mapStateToProps)(ExportContainer);
