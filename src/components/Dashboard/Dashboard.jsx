import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, pathActions } from '../../_actions';
import './dashboard.scss';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <h1 className="navbar-brand">D.Speech</h1>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarNavDropdown" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/voices">Voices</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="glyphicon glyphicon-user"></span>Hi {user.firstName}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="/login">Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };