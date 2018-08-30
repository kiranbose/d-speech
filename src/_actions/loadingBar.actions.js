
export const loadingBarActions = {
    startLoading,
    stopLoading,
    startLoadingBar,
    stopLoadingBar
};


function startLoading() {
    return dispatch => {
        dispatch(startLoadingBar())
    }
}

function stopLoading() {
    return dispatch => {
        dispatch(stopLoadingBar())
    }
}

function startLoadingBar(data = true) { return { type: loadingConstants.start, loading: data } }
function stopLoadingBar(data = false) { return { type: loadingConstants.stop, loading: data } }


export const loadingConstants = {
    start: 'start_loading',
    stop: 'stop_loading',
}