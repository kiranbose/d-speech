import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { alertActions } from '../../_actions'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  none: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.light,
  },
  warning: {
    backgroundColor: amber[700],
  },
  none: {
    backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

// MySnackbarContent.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   message: PropTypes.node,
//   onClose: PropTypes.func,
//   variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
// };

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class Alert extends React.Component {
    state = {
      open: false,
    };
  
    handleClick = () => {
      this.props.open= true;
    };
  
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.props.dispatch(alertActions.clear());
    };
  
    render() {
      const { classes, variant, message, open } = this.props;
      return (
        <div>
         
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              className={classes.margin}
              variant={variant || 'none'}
              message={message || ''}
            />
          </Snackbar>
        </div>
      );
    }
  }
  
//   export default withStyles(styles2)(Alert);
  
const StyleAttachedComponent = withStyles(styles2, { withTheme: true })(Alert);


function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

export default connect(mapStateToProps)(StyleAttachedComponent);
