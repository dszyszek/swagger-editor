import {CLEAR_ERRORS} from '../reducers/types';

export const setError = (data, type) => dispatch => {
    dispatch({
        type: type,
        payload: data
    });
};

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
}