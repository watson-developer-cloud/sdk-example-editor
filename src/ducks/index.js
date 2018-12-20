import {convertToJSON} from '../utils/utils';

/* eslint-disable indent */
export const UPDATE_SWAGGER = 'UPDATE_SWAGGER';
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const UPDATE_EXAMPLE = 'UPDATE_EXAMPLE';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';

export const defaultState = {
  selectedLanguage: null,
  swagger: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_SWAGGER: {
      return {
        ...state,
        swagger: action.swagger,
      };
    }
    case SELECT_LANGUAGE: {
      return {
        ...state,
        selectedLanguage: action.selectedLanguage,
      };
    }
    case UPDATE_EXAMPLE: {
      let updatedSwagger = Object.assign({}, state.swagger);
      let requestExamples =
        updatedSwagger.paths[action.path][action.method]['x-sdk-operations'][
          'request-examples'
        ];

      // no example is defined for this language, so we need to add some surrounding JSON first
      if (!requestExamples[action.language]) {
        requestExamples = {
          ...requestExamples,
          [action.language]: [],
        };
      }
      let languageExamples = requestExamples[action.language];

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

      languageExamples[0]['example'][0]['source'] = convertToJSON(
        action.newCode,
      );
      updatedSwagger.paths[action.path][action.method]['x-sdk-operations'][
        'request-examples'
      ][action.language] = languageExamples;

      return {
        ...state,
        swagger: updatedSwagger,
      };
    }
    case ADD_LANGUAGE: {
      let updatedSwagger = Object.assign({}, state.swagger);
      const supportedLanguages =
        updatedSwagger.info['x-sdk-supported-languages'];
      supportedLanguages.push(action.language);

      return {
        ...state,
        swagger: updatedSwagger,
      };
    }
    default: {
      return state;
    }
  }
}

export const updateSwagger = swagger => ({
  type: UPDATE_SWAGGER,
  swagger,
});

export const selectLanguage = selectedLanguage => ({
  type: SELECT_LANGUAGE,
  selectedLanguage,
});

export const updateExample = (path, method, language, newCode) => ({
  type: UPDATE_EXAMPLE,
  path,
  method,
  language,
  newCode,
});

export const addLanguage = language => ({
  type: ADD_LANGUAGE,
  language,
});
