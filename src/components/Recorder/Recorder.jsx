import React from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { recordActions, recordingConstants } from '../../_actions';
import { Button, Grid } from '@material-ui/core';
import { Mic, Stop, Save } from '@material-ui/icons';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import './recorder.scss';

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 1,
        left: '45%',
        color: theme.palette.common.white,
        backgroundColor: 'red'
    },
    recordingContainer: {
        position: 'relative'
    }
});

class Recorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            blob: null
        }
    }

    startRecording = () => {
        this.setState({
            recording: true
        });
        this.props.dispatch(recordActions.startRecording({'recording': true}));
    }

    stopRecording = () => {
        this.setState({
            recording: false
        });
    }
    
    onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop = (recordedBlob) => {
        this.setState({
            blob : recordedBlob
        });
        this.props.dispatch(recordActions.stopRecording({'recording': false, blob: recordedBlob}));
    }

    onRemove = () => {
        this.setState({
            blob: null
        })
    }


    onSave = () => {
        /**
         * code to upload file to server
         */
        // const data = new FormData();    
        // data.append('file', this.waveInterface.audioData, this.state.filename)
        // // TODO: Set user, usertype dynamically
        // data.append('username', 'Ram')
        // data.append('usertype', 'normal')
        // const settings = { headers: { 'content-type': 'multipart/form-data' } };
        
        if (!this.state.recording && this.state.blob) {
            let blobObject = this.state.blob;
            // let a = document.createElement("a");
            // a.href = blobObject.blobURL;
            // a.download = "file.wav";
            // a.click();
            // window.URL.revokeObjectURL(blobObject.blobURL);
            this.props.dispatch(recordActions.saveRecording(blobObject));
            this.setState({blob: null})
        }


        // axios.post(App.apis.upload, data, settings).then((res) => {
        //   this.onRemoveClick();
        //   return 'upload success'
        // })
    }


    render() {
        const { classes } = this.props;
        return (

            <Grid
            container
            spacing={24}
            alignItems="center"
            direction="column"
            justify="center"
            >
            <div className={classes.recordingContainer}>
                <Grid item md xs={12}>
                    <ReactMic
                        height={200}
                        record={this.state.recording}
                        className="oscilloscope"
                        backgroundColor="#FF4081"
                        visualSetting="sinewave"
                        strokeColor="#000000"
                        onStop={this.onStop}
                        onStart={this.onStart}
                        strokeColor="green"
                        backgroundColor="black" />
                </Grid>
                {
                !this.state.recording ?
                    <Button variant="fab" className={classes.fab} color='secondary' onClick={this.startRecording}>
                        <Mic/>
                    </Button>
                :
                <Button variant="fab" className={classes.fab} color='secondary' onClick={this.stopRecording}>
                    <Stop/>
                </Button>
                }
            </div> 

            </Grid>
            // <div className="jumbotron">
            //     <div className="col-md-12 text-center">
            //         <div className="col-md-8 offset-md-2">
                        
            //         </div>
            //         <div className="col-md-8 offset-md-2 record-buttons">
            //         {
            //             !this.state.recording ?
            //                 <button className="btn btn-danger" onClick={this.startRecording} type="button">{ defaultProps.recordLabel }</button>
            //             :
            //                 <button className="btn btn-success" onClick={this.stopRecording} type="button">{ defaultProps.stopLabel }</button>
            //         }
            //             <button disabled={!this.state.blob} className="btn btn-info" onClick={this.onSave} type="button">{ defaultProps.downloadLabel }</button>
            //             <button disabled={!this.state.blob} className="btn btn-warning" onClick={this.onRemove} type="button">{ defaultProps.removeLabel }</button>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

// const connectedApp = connect(mapStateToProps)(App);
// export { connectedApp as App }; 

export default compose(
    withStyles(styles, { name: 'Recorder' }),
    connect(mapStateToProps, null)
  )(Recorder);


