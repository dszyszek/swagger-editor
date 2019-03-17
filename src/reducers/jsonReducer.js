import {ADD_TO_STATE, UPDATE_STATE} from './types';

const initialState = {
    jsonValue: null
};

const jsonReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_STATE:
            return {
                ...state,
                jsonValue: action.payload
            };
        case UPDATE_STATE:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default jsonReducer;