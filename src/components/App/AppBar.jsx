import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dashboard from '../Dashboard/Dashboard'
import { CompareVoices } from '../CompareVoices/CompareVoices'
import { VoicesPage } from '../VoicesPage/VoicesPage';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { history } from '../../_helpers';
import { ListItemIcon, ListItemText, ListItem, Tooltip } from '@material-ui/core/';
import { Person, ExitToApp, ViewCarousel, Voicemail, GraphicEq } from '@material-ui/icons';
import { pathActions, userActions } from '../../_actions';
import { Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import './app.scss'
import { userService } from '../../_services';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: window.innerHeight
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  typography: {
    width: '100%'
  },
  active: {
    backgroundColor: 'lightgray',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    zIndex: '200',
    backgroundColor: theme.palette.primary.main
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.props.dispatch(userActions.logout());
    history.push('/login');
  };

  checkPath(path) {
    return this.props.path.page === path;
  }

  render() {
    const { classes, theme, isAuthed, authentication } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classNames(classes.typography)}>
              D-Speech...
            </Typography>
            <div className="toolbar-buttons"></div>
            {isAuthed && (
              <div className="user-name">
              <div className="user-name-text"> {"Hi, " + authentication.user.firstName}</div>
                <Tooltip title={"Email: " + authentication.user.email}>
                 <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.goToProfile}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem onClick={this.logout}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
                {/* <Typography variant="subheading" color="inherit" noWrap className={classNames(classes.typography)}>
                  {authentication.user.firstName}
                </Typography> */}
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button className={this.checkPath('/dashboard') ? classNames(classes.active) : ''} onClick={() => { pathActions.navigateToPage('/dashboard') }}>
              <ListItemIcon>
                <ViewCarousel />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button className={this.checkPath('/compareVoices') ? classNames(classes.active) : ''} onClick={() => { pathActions.navigateToPage('/compareVoices') }}>
              <ListItemIcon>
                <GraphicEq />
              </ListItemIcon>
              <ListItemText primary="Compare Voices" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button className={this.checkPath('/voices') ? classNames(classes.active) : ''} onClick={() => { pathActions.navigateToPage('/voices') }}>
              <ListItemIcon>
                <Voicemail />
              </ListItemIcon>
              <ListItemText primary="User Voices" />
            </ListItem>
          </List>
        </Drawer>
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Router history={history}>
            <Switch>
              <Route path={"/dashboard"} component={Dashboard} />
              <Route path={"/voices"} component={VoicesPage} />
              <Route path={"/compareVoices"} component={CompareVoices} />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}

const StyleAttachedComponent = withStyles(styles, { withTheme: true })(MiniDrawer);


function mapStateToProps(state) {
  const {  } = state;
  return {
      
  };
}

export default connect(mapStateToProps)(StyleAttachedComponent);
