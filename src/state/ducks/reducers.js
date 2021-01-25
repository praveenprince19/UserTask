import { combineReducers } from "redux";
import { reducers as DataStore } from "./DataStore";

const rootReducer = combineReducers({
  DataStore
});

export default rootReducer;
