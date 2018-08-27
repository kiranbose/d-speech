import config from 'config';  //global variables - set shared variables in webpack.config
import { authHeader } from '../_helpers';
import { commonHandlers } from './index'

export const recordService = {
    postRecording
};

function postRecording(recording) {
    const data = new FormData();    
    data.append('file', recording.blob, 'recording.wav')
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        credentials: 'same-origin',
        body: data
    };
    requestOptions.headers['content-type'] = 'multipart/form-data';

    return fetch(`${config.apiUrl}/upload`, requestOptions)
        .then(commonHandlers.handleAuthentication);
}


