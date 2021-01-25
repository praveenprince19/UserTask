import * as R from "ramda";

const getUserList = state => R.pathOr(false, ["DataStore", "UserList"], state);

const selectors = {
  getUserList
};

export default selectors;
