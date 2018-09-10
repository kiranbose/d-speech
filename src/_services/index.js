export * from './user.service';
export * from './record.service';
export * from './audioFiles.service';
export * from './voiceGraph.service';
import config from 'config';  //global variables - set shared variables in webpack.config
import { loadingBarActions, userActions, alertActions } from '../_actions'

export const commonHandlers = {
    handleAuthentication,
    handleError
}

function handleAuthentication(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 420 && data.message === 'Session Timed Out') {
                // auto logout if 420 response returned from api
                userActions.logout();
                alertActions.error(data.message);
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function handleError(response) {
    if (response === 'Session Timed Out') {
        userActions.logout();
        alertActions.error(response);
        location.reload(true);
    }
}
