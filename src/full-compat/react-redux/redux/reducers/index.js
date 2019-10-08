import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";

export default combineReducers({ todos, visibilityFilter });
