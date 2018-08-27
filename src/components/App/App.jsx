import React from 'react';
import { Router, Route, Switch, Redirect, IndexRoute } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions, pathActions } from '../../_actions';
import { PrivateRoute } from '../../components';
import MiniDrawer from './AppBar';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import './app.scss'
import { VoicesPage } from '../VoicesPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        dispatch(pathActions.pathChange(history.location));
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
            dispatch(pathActions.pathChange(location));
        });
    }

    render() {
        const { alert, location, path, authentication } = this.props;
        return (
            <Router history={history}>
                <div>
                    {/* <Redirect from="/" to="/dashboard" /> */}
                    <Route path="/" render={() => <MiniDrawer {...this.props} isAuthed={true} />}/> } />
                    { (path && path.path === '/login' || path.path === '/register') 
                    ?  <div className="jumbotron" >
                        <div className="container">
                            <div className="col-md-8 offset-md-2">
                                {alert.message &&
                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                }
                                <div>
                                    <Switch>
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/register" component={RegisterPage} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div> : ''}
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert, path, authentication } = state;
    return {
        alert,
        path,
        authentication
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 