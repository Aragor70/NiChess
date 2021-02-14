import { combineReducers } from "redux";
import authReducer from "./auth";

import boardReducer from './board'



const rootReducer = combineReducers({
    auth: authReducer,
    board: boardReducer
    
});
export default rootReducer;