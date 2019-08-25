import {convertToJSON} from '../utils/utils';

/* eslint-disable indent */
export const UPDATE_SWAGGER = 'UPDATE_SWAGGER';
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const UPDATE_EXAMPLE = 'UPDATE_EXAMPLE';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';
export const IS_JSON = 'IS_JSON';

export const defaultState = {
  hasCurlExamples: false,
  selectedLanguage: null,
  swagger: null,
  isJson: true,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_SWAGGER: {
      const newSwagger = action.swagger;
      let hasCurlExamples = false;
      if (newSwagger.paths) {
        hasCurlExamples = Object.entries(newSwagger.paths).some(
          ([_, pathInfo]) => {
            return Object.entries(pathInfo).some(([_, methodInfo]) => {
              // this is something we don't want, like a parameters array
              if (Array.isArray(methodInfo)) {
                return false;
              }
              const sdkExamples = methodInfo['x-sdk-operations'];
              if (
                sdkExamples &&
                sdkExamples['request-examples'] &&
                sdkExamples['request-examples']['curl']
              ) {
                return true;
              }
              return false;
            });
          },
        );
      }

      return {
        ...state,
        swagger: action.swagger,
        hasCurlExamples,
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
      let operationMethod = updatedSwagger.paths[action.path][action.method];
      // add surrounding JSON if necessary
      if (!operationMethod['x-sdk-operations']) {
        operationMethod = {
          ...operationMethod,
          'x-sdk-operations': {
            'request-examples': {},
          },
        };
      }
      updatedSwagger.paths[action.path][action.method] = operationMethod;

      let requestExamples =
        operationMethod['x-sdk-operations']['request-examples'];

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
      if (!updatedSwagger.info['x-sdk-supported-languages']) {
        updatedSwagger = {
          ...updatedSwagger,
          info: {
            ...updatedSwagger.info,
            'x-sdk-supported-languages': [],
          },
        };
      }

      let isCurl = true;
      if (action.language !== 'curl') {
        const oldLangs = updatedSwagger.info[
          'x-sdk-supported-languages'
        ].slice();
        oldLangs.push(action.language);
        updatedSwagger.info['x-sdk-supported-languages'] = oldLangs;
        isCurl = false;
      }

      return {
        ...state,
        swagger: updatedSwagger,
        hasCurlExamples: isCurl || state.hasCurlExamples,
      };
    }
    case IS_JSON: {
      return {
        ...state,
        isJson: action.isJson,
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

export const isJson = isJson => ({
  type: IS_JSON,
  isJson,
});
