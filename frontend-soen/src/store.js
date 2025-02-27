import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import{
  CreateProjectReducer
} from "./reducers/projectReducer";

const reducer = combineReducers({
  
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,

  projects: CreateProjectReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
