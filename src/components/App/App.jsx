import React from 'react';
import { Router, Route, Switch, Redirect, IndexRoute } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions, pathActions } from '../../_actions';
import { PrivateRoute } from '../../components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import './app.scss'
import { VoicesPage } from '../voicesPage';

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
        const { alert, location, path } = this.props;
        return (
            <Router history={history}>
                <div>
                    <PrivateRoute path="/dashboard" component={HomePage}/>
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
    const { alert, path } = state;
    return {
        alert,
        path
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 