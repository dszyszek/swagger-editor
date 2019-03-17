import {ADD_TO_STATE, UPDATE_STATE} from '../reducers/types';

export const addToState = (data) => dispatch => {
    dispatch({
        type: ADD_TO_STATE,
        payload: data
    });
};

export const getCurrentState = () => dispatch => {
    dispatch({
        type: UPDATE_STATE
    });
};