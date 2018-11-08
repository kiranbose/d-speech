import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    alertSuccess,
    alertError
};


function alertSuccess(message) {
    return dispatch => {
        dispatch(success(message))
    }
}

function alertError(message) {
    return dispatch => {
        dispatch(error(message))
    }
}

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}