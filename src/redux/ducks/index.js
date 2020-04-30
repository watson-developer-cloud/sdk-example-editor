import { createSlice } from '@reduxjs/toolkit';
import yaml from 'js-yaml';

import { convertToJSON } from '../../utils/utils';

const loadFilesReducer = (state, action) => {
  const files = action.payload;
  files.forEach(({ name, content }) => {
    const isJson = name.split('.').pop() === 'json';
    let swagger;

    if (isJson) {
      swagger = JSON.parse(content);
    } else {
      swagger = yaml.safeLoad(content);
    }

    state.byId[name] = swagger;
    state.allIds = Object.keys(state.byId).sort();
    state.selectedId = name;
    state.selectLanguage = null;
  });
};

const updateExampleReducer = (state, action) => {
  const swagger = state.byId[state.selectedId];

  if (!swagger) {
    return;
  }

  const { path, method, language, index, newCodeExample } = action.payload;

  let operationMethod = swagger.paths[path][method];
  // add surrounding JSON if necessary
  if (!operationMethod['x-sdk-operations']) {
    operationMethod = {
      ...operationMethod,
      'x-sdk-operations': {
        'request-examples': {},
      },
    };
  }
  swagger.paths[path][method] = operationMethod;

  let requestExamples = operationMethod['x-sdk-operations']['request-examples'];

  // no example is defined for this language, so we need to add some surrounding JSON first
  if (!requestExamples[language]) {
    requestExamples = {
      ...requestExamples,
      [language]: [],
    };
  }
  let languageExamples = requestExamples[language];

  // another case of a new example, so we have to do a similar thing to above
  if (languageExamples.length === 0) {
    languageExamples.push({
      name: 'Example request',
      example: [
        {
          type: 'code',
          source: [],
        },
      ],
    });
  }

  languageExamples[index]['example'][0]['source'] = convertToJSON(
    newCodeExample
  );
  swagger.paths[path][method]['x-sdk-operations']['request-examples'][
    language
  ] = languageExamples;
};

const addLanguageReducer = (state, action) => {
  const language = action.payload;
  const swagger = state.byId[state.selectedId];

  if (!swagger) {
    return;
  }

  const languages = swagger.info['x-sdk-supported-languages'] ?? [];

  if (language !== 'curl') {
    languages.push(language);
  }
  swagger.info['x-sdk-supported-languages'] = languages;
};

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    byId: {},
    allIds: [],
    selectedId: null,
    selectedLanguage: null,
  },
  reducers: {
    loadFiles: loadFilesReducer,
    updateExample: updateExampleReducer,
    addLanguage: addLanguageReducer,
    selectFile: (state, action) => {
      const id = action.payload;
      state.selectedId = id;
    },
    selectLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = filesSlice;
// Extract and export each action creator by name
export const {
  loadFiles,
  selectFile,
  selectLanguage,
  updateExample,
  addLanguage,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
