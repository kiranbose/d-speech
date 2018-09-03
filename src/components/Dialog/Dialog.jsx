import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Recorder from '../Recorder/Recorder'
import { recordActions } from  '../../_actions'
import { store } from '../../_helpers';

const styles = theme => ({
    avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }
});

class DialogPopup extends React.Component {
  state = {
    recordings: {}
  }
  constructor(props) {
    super(props);
    this.recorderChild = React.createRef();
  }

  handleSave = () => {  
    this.onSave();
    this.props.onClose();
  };

  
  onSave = () => {
    /**
     * code to upload file to server
     */    
    const record = this.props.recordings.recordings;
    if (!record.recording && record.blob) {
        let blobObject = record.blob;
        this.props.dispatch(recordActions.saveRecording(blobObject));
        this.props.dispatch(recordActions.clearRecording());
    }
}

componentWillMount() {
  store.subscribe(() => {
      var data = store.getState();
      if (data.recordings.recordings != this.state.recordings) {
        this.setState({recordings: data.recordings.recordings});
        this.render();
      }
  });
}


  render() {
    const { open, classes, onClose, recordings, title } = this.props;

    return (
      <Dialog maxWidth='md' onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
           <DialogContent>
              <Recorder />
           </DialogContent>
           <DialogActions>
              <Button onClick={() => { onClose(); this.props.dispatch(recordActions.clearRecording()) }} color="secondary">
                Cancel
              </Button>
              <Button disabled={!(recordings.recordings && recordings.recordings.hasOwnProperty('blob'))} onClick={this.handleSave} color="primary">
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

