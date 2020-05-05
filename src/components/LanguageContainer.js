import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, Modal, TextInput, Dropdown } from 'carbon-components-react';

import { getLanguages, getIsSwagger } from '../redux/selectors';
import { selectLanguage } from '../redux/ducks';

import { addLanguage } from '../redux/ducks';

import './LanguageContainer.scss';

export default function LanguageContainer() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState('');

  const { languages, selectedLanguage, isSwagger } = useSelector(
    (state) => ({
      languages: getLanguages(state),
      selectedLanguage: state.selectedLanguage,
      isSwagger: getIsSwagger(state),
    }),
    shallowEqual
  );
  const onNewLanguage = useCallback(() => {
    setIsModalOpen(false);
    dispatch(addLanguage(language.trim()));
  }, [dispatch, language]);

  const handleLanguageSelection = useCallback(
    ({ selectedItem }) => {
      setIsModalOpen(false);
      dispatch(selectLanguage(selectedItem));
    },
    [dispatch]
  );

  return (
    <div className="language">
      <div className="language__selector">
        <Dropdown
          ariaLabel="Languages"
          direction="bottom"
          helperText="Select the language to work with."
          id="swagger-language-dropdown"
          invalidText="A valid value is required"
          items={languages}
          label="Language selection"
          selectedItem={selectedLanguage ?? ''}
          onChange={handleLanguageSelection}
        />
      </div>
      <div className="language__actions">
        <Link
          disabled={!isSwagger}
          href="#"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add language
        </Link>
      </div>
      <Modal
        hasForm
        iconDescription="Close"
        modalAriaLabel="Add a new language"
        modalHeading="Add language"
        modalLabel="Language"
        primaryButtonDisabled={
          language.trim() === '' || languages.includes(language)
        }
        onRequestSubmit={onNewLanguage}
        onSecondarySubmit={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        selectorPrimaryFocus="#text-input-1"
      >
        <TextInput
          id="text-input-1"
          labelText="Name"
          invalid={languages.includes(language)}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
          invalidText="Language already exists"
          placeholder="Type the language name..."
          type="text"
        />
      </Modal>
    </div>
  );
}
