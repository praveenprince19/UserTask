import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { reducers, sagas } from "./ducks";

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  let sagaTask = sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept("./ducks", () => {
      const { reducers, sagas } = require("./ducks");

      store.replaceReducer(reducers);
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(sagas);
      });
    });
  }
  return store;
}
