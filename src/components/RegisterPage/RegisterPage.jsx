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
import { Grid, TextField, FormHelperText } from '@material-ui/core';
import { VerifiedUser } from '@material-ui/icons';



const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
        width: 800,
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
  });
  
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                empId: '',
                industry: '',
                serviceLine: '',
                serviceArea: '',
                designation: '',
                location: '',
                mobileNo: '',
                permission: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering, classes } = this.props;
        const { user, submitted } = this.state;
        return (
            <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography variant="headline">D.Speech</Typography>
                <Avatar className={classes.avatar}>
                  <VerifiedUser />
                </Avatar>
                <Typography variant="subheading">Register</Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid
                    container
                    spacing={24}
                    alignItems="center"
                    direction="row"
                    justify="center"
                    >
                    <Grid item md xs={12}>
                        <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" type="email" name="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.handleChange}/>
                        <FormHelperText hidden={!(submitted && !user.email)} error={true}>This field is required</FormHelperText>
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
                        <FormHelperText hidden={!(submitted && !user.password)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input required
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        autoComplete="firstName"
                        value={user.firstName} onChange={this.handleChange}
                        />
                        <FormHelperText hidden={!(submitted && !user.firstName)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        autoComplete="lastName"
                        value={user.lastName} onChange={this.handleChange}
                        />
                        <FormHelperText hidden={!(submitted && !user.lastName)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="empId">Employee Id</InputLabel>
                        <Input
                        name="empId"
                        type="empId"
                        id="empId"
                        autoComplete="empId"
                        value={user.empId} onChange={this.handleChange}
                        />
                        <FormHelperText hidden={!(submitted && !user.empId)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    </Grid>
                    
                    <Grid item md xs={12}>
                        
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="industry">Industry</InputLabel>
                            <Input
                            name="industry"
                            type="industry"
                            id="industry"
                            autoComplete="industry"
                            value={user.industry} onChange={this.handleChange}
                            />
                        <FormHelperText hidden={!(submitted && !user.industry)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="serviceLine">Service Line</InputLabel>
                            <Input
                            name="serviceLine"
                            type="serviceLine"
                            id="serviceLine"
                            autoComplete="serviceLine"
                            value={user.serviceLine} onChange={this.handleChange}
                            />
                        <FormHelperText hidden={!(submitted && !user.serviceLine)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="designation">Designation</InputLabel>
                            <Input
                            name="designation"
                            type="designation"
                            id="designation"
                            autoComplete="designation"
                            value={user.designation} onChange={this.handleChange}
                            />
                        <FormHelperText hidden={!(submitted && !user.designation)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <Input
                            name="location"
                            type="location"
                            id="location"
                            autoComplete="location"
                            value={user.location} onChange={this.handleChange}
                            />
                        <FormHelperText hidden={!(submitted && !user.location)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="mobileNo">Mobile No:</InputLabel>
                            <Input
                            name="mobileNo"
                            type="mobileNo"
                            id="mobileNo"
                            autoComplete="mobileNo"
                            value={user.mobileNo} onChange={this.handleChange}
                            />
                        <FormHelperText hidden={!(submitted && !user.mobileNo)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                    </Grid>

                </Grid>
                 


                  <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                  >
                    Register
                  </Button>
                  <br/> <br/>
                  <Button fullWidth color="secondary" onClick={() => pathActions.navigateToPage('/login')}>
                    Cancel
                  </Button>
                </form>
              </Paper>
            </main>
          </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    const loggingIn = true;
    return {
        loggingIn,
        styles
    };
}

export default compose(
    withStyles(styles, { name: 'RegisterPage' }),
    connect(mapStateToProps, null)
  )(RegisterPage);


