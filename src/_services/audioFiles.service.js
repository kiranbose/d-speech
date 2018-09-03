import config from 'config';  //global variables - set shared variables in webpack.config
import { authHeader } from '../_helpers';
import { commonHandlers } from './index'

export const audioFilesService = {
    getUserAudioFiles
};

function getUserAudioFiles() {
    let email = JSON.parse(localStorage.getItem('user')).email;
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'same-origin'
    };
    return fetch(`${config.apiUrl}/getUserAudioFiles`, requestOptions)
        .then(commonHandlers.handleAuthentication)
}


