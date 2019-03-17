import {SET_LINT_ERROR, SET_ERROR, CLEAR_ERRORS} from './types';

const initialState = {
    error: {},
    lintError: {}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case SET_LINT_ERROR:
            return {
                ...state,
                lintError: action.payload
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