import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

export default createStoreWithMiddleware;
