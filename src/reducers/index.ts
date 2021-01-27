import { applyMiddleware, combineReducers, createStore, Middleware } from "redux";
import { UserReducerProps, UserReducer } from "./userReducer";
import { OfferReducerProps, OfferReducer } from "./offerReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootState {
  UserReducer: UserReducerProps;
  OfferReducer: OfferReducerProps;
}

const rootReducer = combineReducers({ UserReducer, OfferReducer });

export const configureStore = () => {
  const middlewares: Middleware[] = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
  return store;
};
