import { combineReducers } from "redux";
import authReducer from "./auth";

import boardReducer from './board'
import tableReducer from "./table";



const rootReducer = combineReducers({
    auth: authReducer,
    board: boardReducer,
    table: tableReducer
    
});
export default rootReducer;