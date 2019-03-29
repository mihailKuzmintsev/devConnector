import { GET_ERROR } from '../actions/types';

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERROR: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default errorReducer;
