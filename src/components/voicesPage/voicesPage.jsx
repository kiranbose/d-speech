import React from "react";
import { connect } from "react-redux";
import { ReactMic } from "react-mic";
import { recordActions, recordingConstants } from "../../_actions";
import "./voices.scss";
import RecordingCard from "../common/recordingCard/RecordingCard";

const defaultProps = {
  loop: false,
  downloadable: true,
  className: "",
  style: {},
  filename: "output.wav",
  playLabel: "🔊 Play",
  playingLabel: "❚❚ Playing",
  recordLabel: "● Record",
  stopLabel: "● Stop",
  removeLabel: "✖ Remove",
  downloadLabel: "\ud83d\udcbe Save", // unicode floppy disk,
  uploadForm: ""
};

class VoicesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ""
    };
  }

  render() {
    return (
      <div className="jumbotron">
        <RecordingCard />
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
