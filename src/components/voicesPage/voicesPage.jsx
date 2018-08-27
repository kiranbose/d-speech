import React from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { recordActions, recordingConstants } from '../../_actions';
import './voices.scss'

const defaultProps = {
    loop: false,
    downloadable: true,
    className: '',
    style: {},
    filename: 'output.wav',
    playLabel: '🔊 Play',
    playingLabel: '❚❚ Playing',
    recordLabel: '● Record',
    stopLabel: '● Stop',
    removeLabel: '✖ Remove',
    downloadLabel: '\ud83d\udcbe Save', // unicode floppy disk,
    uploadForm: ''
  };

class VoicesPage extends React.Component {
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
        return (
            <div className="jumbotron">
                <div className="col-md-12 text-center">
                    <div className="col-md-8 offset-md-2">
                        <ReactMic
                            record={this.state.recording}
                            className="oscilloscope"
                            backgroundColor="#FF4081"
                            visualSetting="sinewave"
                            strokeColor="#000000"
                            onStop={this.onStop}
                            onStart={this.onStart}
                            strokeColor="green"
                            backgroundColor="black" />
                    </div>
                    <div className="col-md-8 offset-md-2 record-buttons">
                    {
                        !this.state.recording ?
                            <button className="btn btn-danger" onClick={this.startRecording} type="button">{ defaultProps.recordLabel }</button>
                        :
                            <button className="btn btn-success" onClick={this.stopRecording} type="button">{ defaultProps.stopLabel }</button>
                    }
                        <button disabled={!this.state.blob} className="btn btn-info" onClick={this.onSave} type="button">{ defaultProps.downloadLabel }</button>
                        <button disabled={!this.state.blob} className="btn btn-warning" onClick={this.onRemove} type="button">{ defaultProps.removeLabel }</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

const connectedVoicesPage = connect(mapStateToProps)(VoicesPage);
export { connectedVoicesPage as VoicesPage };