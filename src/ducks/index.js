/* eslint-disable indent */
export const UPDATE_SWAGGER = 'UPDATE_SWAGGER';
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';

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
        language: action.language,
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

export const selectLanguage = language => ({
  type: SELECT_LANGUAGE,
  language,
});
