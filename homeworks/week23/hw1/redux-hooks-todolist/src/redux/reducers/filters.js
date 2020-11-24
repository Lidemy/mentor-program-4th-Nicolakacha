import { SET_FILTER } from '../actionTypes';

const initialState = 'ALL';

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }

    default: {
      return state;
    }
  }
}
