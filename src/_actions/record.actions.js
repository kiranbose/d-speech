import { recordService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { loadingBarActions } from './loadingBar.actions'

export const recordActions = {
    saveRecording,
    startRecording,
    stopRecording,
    clearRecording
};

function saveRecording(recording) {
    return dispatch => {
        dispatch(postRecord(recording));
        dispatch(loadingBarActions.startLoadingBar());
        recordService.postRecording(recording)
            .then(
                response => { 
                    dispatch(postRecordSuccess(response));
                    dispatch(loadingBarActions.stopLoadingBar());
                    dispatch(alertActions.success('Recording Saved'));
                    dispatch(clearRecording());
                    // history.push('/dashboard');
                },
                error => {
                    dispatch(postRecordFail(error.toString()));
                    dispatch(loadingBarActions.stopLoadingBar());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function startRecording(data = {}) {
    return dispatch => {
        dispatch(startRecord(data))
    }
}

function stopRecording(data = {}) {
    return dispatch => {
        dispatch(stopRecord(data))
    }
}

function clearRecording() {
    return dispatch => {
        dispatch(clearRecord({}))
    }
}

function startRecord(data) { return { type: recordingConstants.start, data } }
function stopRecord(data) { return { type: recordingConstants.stop, data } }
function clearRecord(data) { return { type: recordingConstants.clear, data } }
function postRecord(data) { return { type: recordingConstants.send, data } }
function postRecordSuccess(data) { return { type: recordingConstants.send_success, data } }
function postRecordFail(data) { return { type: recordingConstants.send_fail, data } }


export const recordingConstants = {
    start: 'start_recording',
    stop: 'stop_recording',
    send: 'post_recording',
    send_success: 'post_recording_success',
    clear: 'clear_recording',
    send_fail: 'post_recording_fail'
}