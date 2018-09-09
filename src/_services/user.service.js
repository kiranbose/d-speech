import config from 'config';  //global variables - set shared variables in webpack.config
import { authHeader } from '../_helpers';
import { commonHandlers } from './index'
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin'
    };
    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(commonHandlers.handleAuthentication)
        .then(user => {
            user = user.result;
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                config.permission = user.permission
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        credentials: 'same-origin'
    };
    return fetch(`${config.apiUrl}/getAllUsers`, requestOptions).then(commonHandlers.handleAuthentication);

    // return fetch(`${config.apiUrl}/users`).then(u => console(u)).then(user => {
    //     console.log(user);
    // });
        // .then(data => data.json())
        // .then(commonHandlers.handleAuthentication)
        // .catch(handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(commonHandlers.handleAuthentication);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/register`, requestOptions).then(commonHandlers.handleAuthentication);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(commonHandlers.handleAuthentication);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(commonHandlers.handleAuthentication);
}
