import React from 'react';
import { useSelector } from 'react-redux';

import ExportContainer from './ExportContainer';
import LanguageContainer from './LanguageContainer';
import ExamplesContainer from './ExamplesContainer';

import './File.scss';

export default function File() {
  const selectedLanguage = useSelector((state) => state.selectedLanguage);

  return (
    <div className="file">
      <div className="file__languages">
        <LanguageContainer />
      </div>
      {selectedLanguage && (
        <>
          <div className="file__operations">
            <ExamplesContainer />
          </div>
          <div className="file__actions">
            <ExportContainer />
          </div>
        </>
      )}
    </div>
  );
}
