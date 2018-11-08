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
import { LinearProgress, Button } from '@material-ui/core';
import Alert from './SnackBarContent';
import { store } from '../../_helpers';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import Dialog from '../Dialog/Dialog';

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        color: theme.palette.common.white,
        zIndex: '200',
        backgroundColor: theme.palette.primary.main
    }
});


class App extends React.Component {
    state = {
        loadingBar: false,
        openDialog: false
    };
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

    handleCloseSnackBar = () =>{
        //close things to do for warning
    }

    handleDialogClose = () =>{
        // Dialog close actions
        this.setState({openDialog: false});
    }

    openDialog = () =>{
        this.setState({openDialog: true});
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
        const { alert, location, path, authentication, loadingBar, store, classes } = this.props;
        if(alert.message) {
            showAlert = true;
        }
        return (
            <Router history={history}>
                <div className={(path && (path.page === '/login' || path.page === '/register')) ? classes.paperBackground : undefined}>
                 {this.state.loadingBar && <LinearProgress color="secondary"/>}
                    <Route path="/" render={() => {
                        if (!authentication.loggedIn) {
                           return (
                            <div>
                                <Redirect to="/login"/>
                                <Switch>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                </Switch>
                            </div>
                            )
                        } 
                        else {
                           return (
                            <div>
                                <Redirect to="/dashboard"/>
                                <MiniDrawer {...this.props} isAuthed={true} />
                            </div>
                                )
                        }
                    }}/> 
                <Alert  open={showAlert} {...alert} variant={alert.type} message={alert.message}/>
                <Dialog open={this.state.openDialog} 
                    title="Record"
                    onClose={this.handleDialogClose}
                    /> 
                {(authentication.loggedIn) ?
                        <Button variant="fab" className={classes.fab} color='secondary' onClick={this.openDialog}>
                            <Add/>
                        </Button>
                    : ''
                }
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

// const connectedApp = connect(mapStateToProps)(App);
// export { connectedApp as App }; 

export default compose(
    withStyles(styles, { name: 'App' }),
    connect(mapStateToProps, null)
  )(App);


