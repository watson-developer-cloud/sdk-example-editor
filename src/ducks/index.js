import {convertToJSON} from '../utils/utils';

/* eslint-disable indent */
export const UPDATE_SWAGGER = 'UPDATE_SWAGGER';
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const UPDATE_EXAMPLE = 'UPDATE_EXAMPLE';

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
      updatedSwagger.paths[action.path][action.method]['x-sdk-operations'][
        'request-examples'
      ][action.language][0]['example'][0]['source'] = convertToJSON(
        action.newCode,
      );
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
