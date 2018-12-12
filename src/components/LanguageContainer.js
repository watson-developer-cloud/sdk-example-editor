import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select, SelectItem} from 'carbon-components-react';
import {getLanguages} from '../selectors/language-selectors';

import './LanguageContainer.css';

class LanguageContainer extends Component {
  render() {
    const {languages} = this.props;
    console.log(languages);

    return (
      <div className="language-container bx--tile">
        <Select
          hideLabel={false}
          invalidText="A valid value is required"
          helperText="Select the programming language to work with."
          onChange={() => {
            console.log('programing language change');
          }}
          id="programming-language"
          defaultValue="java"
        >
          <SelectItem value="java" text="Java" />
          <SelectItem value="node" text="Node" />
        </Select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
});

export default connect(mapStateToProps)(LanguageContainer);
