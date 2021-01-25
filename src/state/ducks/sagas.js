import { all } from "redux-saga/effects";
import { combinedSaga as DataSaga } from "./DataStore/sagas";

export default function* rootSaga() {
  yield all([DataSaga()]);
}
