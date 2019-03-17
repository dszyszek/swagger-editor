import {combineReducers} from 'redux';

import jsonReducer from './jsonReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    json: jsonReducer,
    errors: errorReducer
});
    
    
    