export * from './user.service';
export * from './record.service';
export * from './audioFiles.service';
export * from './voiceGraph.service';
import config from 'config';  //global variables - set shared variables in webpack.config
import { loadingBarActions, userActions, alertActions } from '../_actions';
import { store } from '../_helpers/store';

export const commonHandlers = {
    handleAuthentication,
    handleError
}

function handleAuthentication(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok || (data && data.message === 'Session Timed Out')) {
            if (response.status === 420 || data.code === 420) {
                // auto logout if 420 response returned from api
                userActions.logout();
                store.dispatch(alertActions.alertError(data.message));
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
        store.dispatch(alertActions.alertError(response));
        location.reload(true);
    }
}
