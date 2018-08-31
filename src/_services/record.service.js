import config from 'config';  //global variables - set shared variables in webpack.config
import { authHeader } from '../_helpers';
import { commonHandlers } from './index'

export const recordService = {
    postRecording
};

function postRecording(recording) {
    /**
     * Save a recording in daatbase
     */
    const data = new FormData();    
    data.append('file', recording.blob, 'speech-' + getFormattedTime() + '.wav')
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        credentials: 'same-origin',
        body: data
    };
    // requestOptions.headers['content-type'] = 'multipart/form-data';

    return fetch(`${config.apiUrl}/upload`, requestOptions)
        .then(commonHandlers.handleAuthentication)
        .then(recording => {
            return recording;
        });
}



function getFormattedTime() {
    const today = new Date();
    const y = today.getFullYear();
    const mt = today.getMonth();
    const d = today.getDate();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    return y + "-" + mt + "-" + d + "-" + h + "-" + m + "-" + s;
}