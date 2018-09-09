import config from 'config';  
import { authHeader } from '../_helpers';
import { commonHandlers } from './index'

export const voiceGraphService = {
    getFileData
};

function getFileData(fileName1, fileName2) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName1, fileName2 }),
        credentials: 'same-origin'
    };
    return fetch(`${config.apiUrl}/getFileData`, requestOptions)
        .then(commonHandlers.handleAuthentication)
}


