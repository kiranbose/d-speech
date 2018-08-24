import React from 'react';
import { Router, Route, Switch, Redirect, IndexRoute } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
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
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, location } = this.props;
        return (
            <Router history={history}>
                <div>
                    <Route exact={true} path="/dashboard" component={HomePage}/>
                    <div className="jumbotron">
                        <div className="container">
                            <div className="col-md-8 offset-md-2">
                                {alert.message &&
                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                }
                                <div>
                                    {/* <PrivateRoute exact path="/" component={HomePage} /> -- commenting temporarily for loading login on refresh */}
                                    <Switch>
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/register" component={RegisterPage} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 