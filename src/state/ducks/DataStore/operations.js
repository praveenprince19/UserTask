import {
  triggerDataContent,
  triggerInsertUser,
  triggerDeleteUser,
  triggerEditUser
} from "./actions";

const callForDataContent = dispatch => () => dispatch(
  triggerDataContent(),
);

const PostcallForInserUser = dispatch => (payload) => dispatch(
  triggerInsertUser(payload),
);

const PostcallForDeleteUser = dispatch => (payload) => dispatch(
  triggerDeleteUser(payload),
);

const PostcallForEditUser = dispatch => (payload) => dispatch(
  triggerEditUser(payload),
);
const operations = {
  callForDataContent,
  PostcallForInserUser,
  PostcallForDeleteUser,
  PostcallForEditUser
};

export default operations;
