import React from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { userActions } from '../../_actions';
import './voices.scss'

export class VoicesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          record: false
        }
    
      }
    
      startRecording = () => {
        this.setState({
          record: true
        });
      }
    
      stopRecording = () => {
        this.setState({
          record: false
        });
      }
    
      onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
      }
    
      onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
      }
    
      render() {
        return (
          <div>
              <div>
                  
              </div>
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              onData={this.onData}
              strokeColor="#000000"
              backgroundColor="#FF4081" />
            <button onClick={this.startRecording} type="button">Start</button>
            <button onClick={this.stopRecording} type="button">Stop</button>
          </div>
        );
      }
}
