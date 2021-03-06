import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, pathActions } from '../../_actions';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import './login.scss'

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    copyright: {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  });
  
  
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
        const { loggingIn, classes, authentication } = this.props;
        const { email, password, submitted } = this.state;
        if(authentication.loggedIn) {
          pathActions.navigateToPage('/dashboard');
        }
        return (
            <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography variant="headline">D.Speech</Typography>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="subheading">Sign in</Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" type="email" name="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.handleChange}/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password} onChange={this.handleChange}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                  >
                    Sign in
                  </Button>
                  <br/> <br/>
                  <Button fullWidth variant="outlined" color="secondary" onClick={() => pathActions.navigateToPage('/register')}>
                    Register
                  </Button>
                </form>
              </Paper>
              <Typography className={classes.copyright} variant="subheading">© Deloitte Touche Tohmatsu Limited. All Rights Reserved.</Typography>
            </main>
          </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const loggingIn = true;
    return {
        loggingIn,
        styles,
        authentication
    };
}

export default compose(
    withStyles(styles, { name: 'LoginPage' }),
    connect(mapStateToProps, null)
  )(LoginPage);


