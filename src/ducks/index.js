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
        selectedLanguage: action.selectedLanguage,
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
