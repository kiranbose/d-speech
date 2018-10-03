import * as React from 'react';
import { connect } from 'react-redux';
import './comparevoices.scss';
import { store } from '../../_helpers';
import { audioFileActions } from '../../_actions';
import { Button, Radio, Table, TableBody, TableCell, TableHead, TableRow, Modal, Typography } from '@material-ui/core';
import GraphicEq from "@material-ui/icons/GraphicEq";
import { VoiceGraph } from '../VoiceGraph'
import io from 'socket.io-client'
import config from 'config';  //global variables - set shared variables in webpack.config

function getModalStyle() {
    const top = 20;
    const left = 20;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
}

let socket;

class CompareVoices extends React.Component {
    constructor(props) {
        super(props);
        this.handleSampleVoiceChange = this.handleSampleVoiceChange.bind(this);
        this.handleUserVoiceChange = this.handleUserVoiceChange.bind(this);
        this.state = {
            selectedSampleVoice: '',
            selectedUserVoice: '',
            data: undefined,
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.props.dispatch(audioFileActions.getUserAudioFiles());
        store.subscribe(() => {
            var data = store.getState();
            if (data.audioFiles.hasOwnProperty('audioFiles')) {
                this.setState({ data: data.audioFiles.audioFiles.result });
                this.render();
            }
        });
    }

    componentWillUnmount() {
        // socket.disconnect();
    }

    closeSocket = () => {
        socket.disconnect();
    }

    openSocket = () => {
        // socket = io.connect(config.apiUrl);
        let url = config.apiUrl;
        socket = io.connect(url);
        socket.emit('clientConnected', {data: 'im connected'});
        socket.on('chunkForFile1',(res)=>{
            console.dir(res)
        }) 
    }

    handleSampleVoiceChange(event) {
        this.setState({
            selectedSampleVoice: event.target.value
        });
        this.props.audioFiles.selectedSampleVoice = event.target.value;
    }

    handleUserVoiceChange(event) {
        this.setState({
            selectedUserVoice: event.target.value
        });
        this.props.audioFiles.selectedUserVoice = event.target.value;
    }

    render() {
        const sampleVoiceFilteredRows = this.props.audioFiles.audioFiles ? this.props.audioFiles.audioFiles.result.filter(ele => ele.permission === "administrator") : [];
        const sampleVoicerows = sampleVoiceFilteredRows.map((audio) =>
            <TableRow key={audio._id.$oid}>
                <TableCell>
                    <Radio
                        checked={this.state.selectedSampleVoice === audio.stereoFilePath}
                        onChange={this.handleSampleVoiceChange}
                        value={audio.stereoFilePath}
                        name="radio-button-demo"
                    />
                </TableCell>
                <TableCell>{audio.user.firstName}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
            </TableRow>
        );
        const userVoicerowsFilteredRows = this.props.audioFiles.audioFiles ? this.props.audioFiles.audioFiles.result.filter(ele => ele.permission === "guest") : [];
        const userVoicerows = userVoicerowsFilteredRows.map((audio) =>
            <TableRow key={audio._id.$oid}>
                <TableCell>
                    <Radio
                        checked={this.state.selectedUserVoice === audio.stereoFilePath}
                        onChange={this.handleUserVoiceChange}
                        value={audio.stereoFilePath}
                        name="radio-button-demo"
                    />
                </TableCell>
                <TableCell>{audio.user.firstName}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
            </TableRow>
        );
        // }
        return (
            <div>
                <div className="height">
                    <div className="align-left align-text">
                        <h2>Sample voice records</h2>
                        <Table className="table table-striped">
                            <TableHead className="theadcolor">
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Recorded File</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sampleVoicerows}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="align-right align-text">
                        <h2>User Voices records</h2>
                        <Table className="table table-striped">
                            <TableHead className="theadcolor">
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Recorded File</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userVoicerows}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="align-text">
                    <Button onClick={this.handleOpen} className="margin50" variant="extendedFab" aria-label="Delete">
                        <GraphicEq />
                        Compare Voices
                    </Button>
                    <Button onClick={this.openSocket} className="margin50" variant="extendedFab" aria-label="Open">
                        <GraphicEq />
                        Open Socket
                    </Button>
                    <Button onClick={this.closeSocket} className="margin50" variant="extendedFab" aria-label="Open">
                        <GraphicEq />
                        Close Socket
                    </Button>
                </div>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div style={getModalStyle()} >
                        <Typography variant="title" id="modal-title">
                            <VoiceGraph />
                        </Typography>
                    </div>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { audioFiles } = state;
    return {
        audioFiles
    };
}


const compareVoicesPage = connect(mapStateToProps)(CompareVoices);
export { compareVoicesPage as CompareVoices };
