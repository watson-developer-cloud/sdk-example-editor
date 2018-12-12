/* eslint-disable indent */
export const UPDATE_SWAGGER = 'UPDATE_SWAGGER';

export const defaultState = {
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
    default: {
      return state;
    }
  }
}

export const updateSwagger = swagger => ({
  type: UPDATE_SWAGGER,
  swagger,
});
