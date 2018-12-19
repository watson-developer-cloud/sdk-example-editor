import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select, SelectItem} from 'carbon-components-react';
import {getLanguages} from '../selectors';
import * as actions from '../ducks';

import './LanguageContainer.css';

class LanguageContainer extends Component {
  componentDidUpdate(prevProps) {
    const {languages, selectLanguage} = this.props;

    // when we first get languages, default to first
    if (prevProps.languages.length === 0 && languages.length > 0) {
      selectLanguage(languages[0]);
    }
  }

  render() {
    const {languages, selectLanguage} = this.props;

    return (
      <div className="language-container bx--tile">
        <Select
          disabled={languages.length === 0}
          hideLabel={false}
          invalidText="A valid value is required"
          helperText="Select the programming language to work with."
          onChange={event => {
            selectLanguage(event.target.value);
          }}
          id="programming-language"
          defaultValue="java"
        >
          {languages.map(language => (
            <SelectItem
              key={language}
              text={language.charAt(0).toUpperCase() + language.slice(1)}
              value={language}
            />
          ))}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
});

const mapDispatchToProps = {
  selectLanguage: actions.selectLanguage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageContainer);
