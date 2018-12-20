import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Select, SelectItem, TextInput} from 'carbon-components-react';
import {getLanguages, getSwagger} from '../selectors';
import * as actions from '../ducks';

import './LanguageContainer.css';

class LanguageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {newLanguage: ''};
    this.handleNewLanguage = this.handleNewLanguage.bind(this);
  }

  handleNewLanguage() {
    const {addLanguage} = this.props;
    const {newLanguage} = this.state;

    if (newLanguage.length > 0) {
      addLanguage(newLanguage.toLowerCase());
      this.setState({newLanguage: ''});
    }
  }

  componentDidUpdate(prevProps) {
    const {languages, selectLanguage} = this.props;

    // when we first get languages, default to first
    if (prevProps.languages.length === 0 && languages.length > 0) {
      selectLanguage(languages[0]);
    }
  }

  render() {
    const {languages, selectLanguage, swagger} = this.props;
    const {newLanguage} = this.state;

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
        <div className="new-language-container">
          <TextInput
            disabled={swagger == null}
            helperText="The language name will be lowercased and added to the new API definition."
            id="programming-language-input"
            labelText="Add new language"
            onChange={event => {
              this.setState({newLanguage: event.target.value});
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.handleNewLanguage();
              }
            }}
            value={newLanguage}
          />
          <Button
            className="add-language"
            disabled={swagger == null}
            onClick={() => {
              this.handleNewLanguage();
            }}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
  swagger: getSwagger(state),
});

const mapDispatchToProps = {
  addLanguage: actions.addLanguage,
  selectLanguage: actions.selectLanguage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageContainer);
