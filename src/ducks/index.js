/* eslint-disable indent */
export const HIDE_LEFT_NAV = 'APPLICATION/HIDE_LEFT_NAV';
export const SHOW_LEFT_NAV = 'APPLICATION/SHOW_LEFT_NAV';

export const defaultState = {
  isLeftNavOpen: true,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case HIDE_LEFT_NAV: {
      return {
        ...state,
        isLeftNavOpen: false,
      };
    }
    case SHOW_LEFT_NAV: {
      return {
        ...state,
        isLeftNavOpen: true,
      };
    }
    default: {
      return state;
    }
  }
}

export const hideLeftNav = () => ({
  type: HIDE_LEFT_NAV,
});

export const showLeftNav = () => ({
  type: SHOW_LEFT_NAV,
});
