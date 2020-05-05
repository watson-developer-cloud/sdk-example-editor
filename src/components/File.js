import React from 'react';

import ExportContainer from './ExportContainer';
import LanguageContainer from './LanguageContainer';
import ExamplesContainer from './ExamplesContainer';

import './File.scss';

export default function File() {
  return (
    <div className="file">
      <div className="file__languages">
        <LanguageContainer />
      </div>
      <div className="file__operations">
        <ExamplesContainer />
      </div>
      <div className="file__actions">
        <ExportContainer />
      </div>
    </div>
  );
}
