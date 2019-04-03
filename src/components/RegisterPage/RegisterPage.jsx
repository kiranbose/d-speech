import React from 'react';
import { connect } from 'react-redux';
import { userActions, pathActions } from '../../_actions';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, FormHelperText } from '@material-ui/core';
import { VerifiedUser, TrainOutlined, TurnedInNotOutlined } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const designation_name= [
  'Business Technology Analyst',
  'Consultant',
  'Senior Consultant',
  'Manager',
  'Specialist Senior',
  'Partner',
  'Managing Director',
];

const location_name= [
'Bangalore',
'Hyderabad',
'Delhi',
'Mumbai'
];

const industry_name= [
'Audit & Assurance',
'Consulting',
'Deloitte Risk & Financial Advisory',
'Financial Advisory Services',
'Internal Services',
'Legal',
'Tax Services',
];

const serviceLine_name= [
'System Engineering',
'Sector Packages',
'Cloud Engineering',
'Deloitte Digital'
];

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
  
  const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  const empRegex = RegExp(/^[0-9]*$/);
const formValid = formErrors => { 
  let valid = true;
Object.values(formErrors).forEach(val => {
val.length > 0 && (valid = false);
});
return valid;
};
 

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
          formErrors: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            empId: "",
            mobileNo: "",
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
       
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
              ...user,
              [name]: value,
            }
        });
    }

    handleBlur(event)
    {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
        user: {
            ...user,
            [name]: value
          }
    });

      let formErrors = this.state.formErrors;

      console.log("Name:", name);
      console.log("value:", value);
      
         switch(name) {
           case "firstName":
           formErrors.firstName = value.length < 3 && value.length > 0 ? 'Minimum 3 characters req' : "";
           break;
           case "lastName":
           formErrors.lastName = value.length < 3 && value.length > 0 ? 'Minimum 3 characters req' : "";
           break;
           case "email":
           formErrors.email = !emailRegex.test(value) && value.length >= 1 ? 'Invalid email address' : "";
           break;
           case "password":
           formErrors.password = value.length < 6  && value.length > 0 ? 'Minimum 6 characters req' : "";
           break;
           case "empId":
           formErrors.empId = !empRegex.test(value) && value.length >= 1 ? 'Invalid employee ID' : "";
           break;
           case "mobileNo":
           formErrors.mobileNo = !(empRegex.test(value) && value.length == 10) && value.length >= 1 ? 'Invalid Mobile Number' : '' ;
           default:
           break;
         
         }
       this.setState({ formErrors, [name]: value}, () => console.log(this.state));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        let formErrors = this.state.formErrors;
        if (user.firstName && user.lastName && user.email && user.password && user.empId && user.industry && user.serviceLine && user.designation && user.location &&  user.mobileNo && !formErrors.firstName && !formErrors.lastName && !formErrors.email && !formErrors.password &&!formErrors.empId && !formErrors.mobileNo) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering, classes } = this.props;
        const { user, submitted } = this.state;
        const { formErrors } = this.state;
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
                        <Input id="email" className={formErrors.email.length > 0 ? "error" : null} type="email" name="email" autoComplete="email" autoFocus value={user.email} onBlur={this.handleBlur} onChange={this.handleChange}/>
                        {formErrors.email.length>0 && (
                        <FormHelperText error={true}>{formErrors.email}</FormHelperText>
                        )}
                        <FormHelperText hidden={!(submitted && !user.email)} error={true}>This field is required</FormHelperText>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        className={formErrors.password.length > 0 ? "error" : null}
                        value={user.password} onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        />
                         {formErrors.password.length>0 && (
                        <FormHelperText error={true}>{formErrors.password}</FormHelperText>
                        )}
                        <FormHelperText hidden={!(submitted && !user.password)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input required
                        className={formErrors.firstName.length > 0 ? "error" : null}
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        autoComplete="firstName"
                        onBlur={this.handleBlur}
                        value={user.firstName} onChange={this.handleChange}
                        />
                        {formErrors.firstName.length>0 && (
                        <FormHelperText error={true}>{formErrors.firstName}</FormHelperText>)}
                        <FormHelperText hidden={!(submitted && !user.firstName)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input
                        className={formErrors.lastName.length > 0 ? "error" : null}
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        autoComplete="lastName"
                        onBlur={this.handleBlur}
                        value={user.lastName} onChange={this.handleChange}
                        />
                         {formErrors.lastName.length>0 && (
                        <FormHelperText error={true}>{formErrors.lastName}</FormHelperText>)}
                        <FormHelperText hidden={!(submitted && !user.lastName)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="empId">Employee Id</InputLabel>
                        <Input
                        name="empId"
                        type="empId"
                        id="empId"
                        autoComplete="empId"
                        onBlur={this.handleBlur}
                        className={formErrors.empId.length > 0 ? "error" : null}
                        value={user.empId} onChange={this.handleChange}
                        />
                        {formErrors.empId.length>0 && (
                        <FormHelperText error={true}>{formErrors.empId}</FormHelperText>
                        )}
                        <FormHelperText hidden={!(submitted && !user.empId)} error={true}>This field is required</FormHelperText>
                    </FormControl>

                    </Grid>
                    
                    <Grid item md xs={12}>
                        
                        <FormControl variant="outlined" margin="normal" required fullWidth>
                            <InputLabel htmlFor="industry">Industry</InputLabel>
                            <Select value={user.industry}
                         onChange={this.handleChange} 
                         input={<Input name="industry"  type="industry"
                         id="industry" autoComplete="industry"/>}>
                        {industry_name.map(name => (
                        <MenuItem key={name} value={name}>
                        {name}
                       </MenuItem>
                         ))}
                       </Select>
                        <FormHelperText hidden={!(submitted && !user.industry)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="serviceLine">Service Line</InputLabel>
                            <Select value={user.serviceLine}
                         onChange={this.handleChange} 
                         input={<Input name="serviceLine"  type="serviceLine"
                         id="serviceLine" autoComplete="serviceLine"/>}>
                        {serviceLine_name.map(name => (
                        <MenuItem key={name} value={name}>
                        {name}
                       </MenuItem>
                         ))}
                       </Select>
                        <FormHelperText hidden={!(submitted && !user.serviceLine)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="designation">Designation</InputLabel>
                        <Select value={user.designation}
                         onChange={this.handleChange} 
                         input={<Input name="designation"  type="designation"
                         id="designation" autoComplete="designation"/>}>
                        {designation_name.map(name => (
                        <MenuItem key={name} value={name}>
                        {name}
                       </MenuItem>
                         ))}
                       </Select>
                         
                        <FormHelperText hidden={!(submitted && !user.designation)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <Select value={user.location}
                         onChange={this.handleChange}
                         input={<Input name="location"  type="location"
                         id="location" autoComplete="location"/>} >
                        {location_name.map(name => (
                        <MenuItem key={name} value={name}>
                        {name}
                       </MenuItem>
                         ))}
                       </Select>
                        <FormHelperText hidden={!(submitted && !user.location)} error={true}>This field is required</FormHelperText>
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="mobileNo">Mobile No:</InputLabel>
                            <Input
                            name="mobileNo"
                            type="mobileNo"
                            id="mobileNo"
                            autoComplete="mobileNo"
                            onBlur={this.handleBlur}
                            className={formErrors.mobileNo.length > 0 ? "error" : null}
                            value={user.mobileNo} onChange={this.handleChange}
                            />
                             {formErrors.mobileNo.length>0 && (
                         <FormHelperText error={true}>{formErrors.mobileNo} </FormHelperText>
                        )}
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


