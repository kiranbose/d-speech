import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Recorder from '../Recorder/Recorder'

const styles = theme => ({
    avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }
});

class DialogPopup extends React.Component {
  handleSave = () => {
    this.props.onSave(this.props.recordings);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { open, classes, onClose, onSave, recordings, title } = this.props;

    return (
      <Dialog maxWidth='md' onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
           <DialogContent>
                <Recorder />
           </DialogContent>
           <DialogActions>
                <Button onClick={onClose} color="primary">
                Cancel
                </Button>
                <Button disabled={!recordings} onClick={this.handleSave} color="primary">
                Save
                </Button>
          </DialogActions>
      </Dialog>
    );
  }
}

DialogPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

function mapStateToProps(state) {
    const { alert, authentication, recordings } = state;
    return {
        authentication,
        alert,
        recordings
    };
}

export default compose(
    withStyles(styles, { name: 'DialogPopup' }),
    connect(mapStateToProps, null)
  )(DialogPopup);

