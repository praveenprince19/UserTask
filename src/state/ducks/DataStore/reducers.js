import {
  SET_DATALIST_SAGA,
  SET_INSERT_USER_SAGA,
  SET_DELETE_USER_SAGA,
  SET_EDIT_USER_SAGA
} from "./types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DATALIST_SAGA:
      {
        return {
          ...state,
          UserList: action.payload,
        };
      }
    case SET_INSERT_USER_SAGA:
      {
        return {
          ...state,
          InsertResponse: action.payload,
        };
      } 
    case SET_DELETE_USER_SAGA:
      {
        return {
          ...state,
          DeleteResponse: action.payload,
        };
      }
    case SET_EDIT_USER_SAGA:
      {
        return {
          ...state,
          EditResponse: action.payload,
        };
      }
    default:
      return state;
  }
};

export default reducer;
