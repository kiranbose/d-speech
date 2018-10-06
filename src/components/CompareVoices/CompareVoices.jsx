import * as React from 'react';
import { connect } from 'react-redux';
import './comparevoices.scss';
import { store } from '../../_helpers';
import { audioFileActions } from '../../_actions';
import { Button, Radio, Table, TableBody, TableCell, TableHead, TableRow, Modal, Typography, DialogTitle, DialogContent, DialogActions, Dialog  } from '@material-ui/core';
import GraphicEq from "@material-ui/icons/GraphicEq";
import { VoiceGraph } from '../VoiceGraph'
import io from 'socket.io-client'
import config from 'config';  //global variables - set shared variables in webpack.config
// import Dialog from '@material-ui/core/Dialog';

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
        const title = "Power Analysis";
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
                        <Typography variant="subheading" color="textPrimary">
                            Sample voice records
                        </Typography>
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
                        <Typography variant="subheading" color="textPrimary">
                            User voice records
                        </Typography>
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
                    <Button onClick={this.handleOpen} disabled={!(this.state.selectedSampleVoice && this.state.selectedUserVoice)} className="compare-button" variant="extendedFab" aria-label="Delete">
                        <GraphicEq />
                        Compare Voices
                    </Button>
                </div>

                {/* socket programming code commented out
                uncomment if socket needed */}
                
                {/* <Button onClick={this.openSocket} className="margin50" variant="extendedFab" aria-label="Open">
                    <GraphicEq />
                    Open Socket
                </Button>
                <Button onClick={this.closeSocket} className="margin50" variant="extendedFab" aria-label="Open">
                    <GraphicEq />
                    Close Socket
                </Button> */}


                 <Dialog maxWidth='lg' onClose={this.handleClose} aria-labelledby="graph-dialog-title" open={this.state.open}>
                    <DialogTitle id="graph-dialog-title">{title}</DialogTitle>
                    <DialogContent className="d-content">
                        <VoiceGraph />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

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
