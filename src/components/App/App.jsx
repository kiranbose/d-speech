import React from 'react';
import { Router, Route, Switch, Redirect, IndexRoute } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import { history } from '../../_helpers';
import { alertActions, pathActions } from '../../_actions';
import { PrivateRoute } from '../../components';
import MiniDrawer from './AppBar';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './app.scss'
import { VoicesPage } from '../VoicesPage';
import { LinearProgress } from '@material-ui/core';
import Alert from './SnackBarContent';
import { store } from '../../_helpers';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingBar: false
        };
        const { dispatch } = this.props;
        dispatch(pathActions.pathChange(history.location));
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
            dispatch(pathActions.pathChange(location));
        });
    }

    handleCloseSnackBar() {
        //close things to do for warning
    }

    componentWillMount() {
        store.subscribe(() => {
            var data = store.getState();
            if (data.loadingBar.loading != this.state.loadingBar) {
                this.setState({loadingBar: data.loadingBar.loading});
                this.render();
            }
        });
    }
    
    render() {
        let showAlert = false;
        const { alert, location, path, authentication, loadingBar, store } = this.props;
        if(alert.message) {
            showAlert = true;
        }
        return (
            <Router history={history}>
                <div>
                 {this.state.loadingBar && <LinearProgress color="secondary"/>}
                    <Route path="/" render={() => {
                        if (!authentication.loggedIn) {
                           return (<Switch>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                        </Switch>)
                        } 
                        else {
                           return (<MiniDrawer {...this.props} isAuthed={true} />)
                        }
                    }}/> 
                <Alert  open={showAlert} {...alert} variant={alert.type} message={alert.message}/>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert, path, authentication, loadingBar } = state;
    return {
        alert,
        path,
        authentication,
        loadingBar
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 