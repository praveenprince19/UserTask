import {
  GET_DATALIST_SAGA,
  GET_INSERT_USER_SAGA,
  GET_DELETE_USER_SAGA,
  GET_EDIT_USER_SAGA
} from "./types";

const triggerDataContent = payload => ({
  type: GET_DATALIST_SAGA,
  payload
});


const triggerInsertUser = payload => ({
  type: GET_INSERT_USER_SAGA,
  payload
});

const triggerDeleteUser = payload => ({
  type: GET_DELETE_USER_SAGA,
  payload
});

const triggerEditUser = payload => ({
  type: GET_EDIT_USER_SAGA,
  payload
});
export {
  triggerDataContent,
  triggerInsertUser,
  triggerDeleteUser,
  triggerEditUser
};
