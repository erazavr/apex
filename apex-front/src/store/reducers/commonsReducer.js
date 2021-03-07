import {FETCH_COMMON_FAILURE, FETCH_COMMON_SUCCESS} from "../actions /commonsActions";

const initialState = {
  commons: [],
  error: null
};

const commonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMON_SUCCESS:
      return {...state, commons: action.com};
    case FETCH_COMMON_FAILURE:
      return {...state, error: action.error};
    default:
      return state
  }
};

export default commonsReducer