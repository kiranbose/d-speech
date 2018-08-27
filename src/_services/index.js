export * from './user.service';
export * from './record.service';

export const commonHandlers = {
    handleAuthentication,
    handleError
}

function handleAuthentication(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 410 && data.message === 'Session Timed Out') {
                // auto logout if 410 response returned from api
                logout();
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
        logout();
        location.reload(true);
    }
}
