import { recordService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const recordActions = {
    saveRecording,
    startRecording,
    stopRecording
};

function saveRecording(recording) {
    return dispatch => {
        dispatch(postRecord(recording));

        recordService.postRecording(recording)
            .then(
                response => { 
                    dispatch(postRecordSuccess(response));
                    // history.push('/dashboard');
                },
                error => {
                    dispatch(postRecordFail(error.toString()));
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

function startRecord(data) { return { type: recordingConstants.start, data } }
function stopRecord(data) { return { type: recordingConstants.stop, data } }
function postRecord(data) { return { type: recordingConstants.send, data } }
function postRecordSuccess(data) { return { type: recordingConstants.send_success, data } }
function postRecordFail(data) { return { type: recordingConstants.send_fail, data } }


export const recordingConstants = {
    start: 'start_recording',
    stop: 'stop_recording',
    send: 'post_recording',
    send_success: 'post_recording_success',
    send_fail: 'post_recording_fail'
}