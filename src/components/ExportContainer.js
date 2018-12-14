import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'carbon-components-react';
import FileSaver from 'file-saver';
import {getSwagger} from '../selectors/index';
import {buildSwaggerFile} from '../utils/utils';
import './ExportContainer.css';

class ExportContainer extends Component {
  render() {
    const {swagger} = this.props;

    return (
      <div className="export-container">
        <Button
          className="export-button"
          onClick={() => {
            FileSaver.saveAs(buildSwaggerFile(swagger));
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
