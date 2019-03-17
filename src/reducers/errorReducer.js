import {SET_ERROR, CLEAR_ERRORS} from './types';

const initialState = {
    error: {}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                error: {}
            };
        default:
            return state;
    }
}

export default errorReducer;