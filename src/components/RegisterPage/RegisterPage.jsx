import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

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
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 offset-md-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" className="form-control" type="email" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">E-mail is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.empId ? ' has-error' : '')}>
                        <label htmlFor="empId">Employee Id</label>
                        <input className="form-control" name="empId" value={user.empId} onChange={this.handleChange} />
                        {submitted && !user.empId &&
                            <div className="help-block">employee Id is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.industry ? ' has-error' : '')}>
                        <label htmlFor="industry">Industry</label>
                        <input className="form-control" name="industry" value={user.industry} onChange={this.handleChange} />
                        {submitted && !user.industry &&
                            <div className="help-block">Industry is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.serviceLine ? ' has-error' : '')}>
                        <label htmlFor="serviceLine">Service Line</label>
                        <input className="form-control" name="serviceLine" value={user.serviceLine} onChange={this.handleChange} />
                        {submitted && !user.serviceLine &&
                            <div className="help-block">Service Line is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.serviceArea ? ' has-error' : '')}>
                        <label htmlFor="serviceArea">Service Area</label>
                        <input className="form-control" name="serviceArea" value={user.serviceArea} onChange={this.handleChange} />
                        {submitted && !user.serviceArea &&
                            <div className="help-block">Service Area is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.designation ? ' has-error' : '')}>
                        <label htmlFor="designation">Designation</label>
                        <input className="form-control" name="designation" value={user.designation} onChange={this.handleChange} />
                        {submitted && !user.designation &&
                            <div className="help-block">Designation is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.location ? ' has-error' : '')}>
                        <label htmlFor="location">Location</label>
                        <input className="form-control" name="location" value={user.location} onChange={this.handleChange} />
                        {submitted && !user.location &&
                            <div className="help-block">Location is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.mobileNo ? ' has-error' : '')}>
                        <label htmlFor="mobileNo">Mobile No:</label>
                        <input className="form-control" type="number" name="mobileNo" value={user.mobileNo} onChange={this.handleChange} />
                        {submitted && !user.mobileNo &&
                            <div className="help-block">Mobile No is required</div>
                        }
                    </div>


                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        { registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };