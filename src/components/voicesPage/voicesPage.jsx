import * as React from 'react';
import { connect } from 'react-redux';
import './VoicesPage.scss';
import { store } from '../../_helpers';
import { audioFileActions } from '../../_actions';
import { Switch, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal , Grid} from '@material-ui/core';
import PlayArrow from "@material-ui/icons/PlayArrow";
import ReactAudioPlayer from 'react-audio-player';

function getModalStyle() {
    const top = 20;
    const left = 20;

    return {
        top: `${top}%`,
        left: `${left}%`,
        width: '10px'
    };
}

class VoicesPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            data: {},
            userVoices: true,
            open: false,
            fileSource: ''
        };
    }

    componentWillMount() {
    this.props.dispatch(audioFileActions.getUserAudioFiles());
        store.subscribe(() => {
            var data = store.getState();
            if (data.audioFiles.hasOwnProperty('audioFiles')) {
                this.setState({ data: data.audioFiles.audioFiles.result });
                this.render();
            }
        });
    }

    handleOpen = (fileName) => {
        this.setState({ 
            fileSource: fileName
         });
        this.setState({ 
            open: true
         });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({ userVoices: !this.state.userVoices });
    };

    render() {
        const sampleVoiceFilteredRows = this.props.audioFiles.audioFiles ? this.props.audioFiles.audioFiles.result.filter(ele => ele.permission === "administrator") : [];
        const sampleVoicerows = sampleVoiceFilteredRows.map((audio) =>
            <TableRow key={audio.fileName}>
                <TableCell>{audio.user.firstName}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
                <TableCell>
                    <Button onClick={() => { this.handleOpen(audio.fileName) }} value={audio.fileName} className="button" variant="extendedFab" >
                        <PlayArrow />
                    </Button> 
                </TableCell>
            </TableRow>
        );
        const userVoicerowsFilteredRows = this.props.audioFiles.audioFiles ? this.props.audioFiles.audioFiles.result.filter(ele => ele.permission === "guest") : [];
        const userVoicerows = userVoicerowsFilteredRows.map((audio) =>
            <TableRow key={audio.fileName}>
                <TableCell>{audio.user.firstName}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
                <TableCell>
                   <Button onClick={() => { this.handleOpen(audio.fileName) }} value={audio.fileName} className="button" variant="extendedFab" >
                        <PlayArrow />
                    </Button>                  
                </TableCell>
            </TableRow>
        );
        let tableData;
        if (this.state.userVoices) {
            tableData = <Paper className="align-text">
                <Typography className="th-color" variant="title" id="modal-title">
                    Sample voice records
                        </Typography>
                <Table className="table table-striped">
                    <TableHead className="theadcolor">
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Recorded File</TableCell>
                            <TableCell>Play</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleVoicerows}
                    </TableBody>
                </Table>
            </Paper>;

        } else {
            tableData = <Paper className="align-text">
                <Typography className="th-color" variant="title" id="modal-title">
                    User Voices records
                        </Typography>
                <Table className="table table-striped">
                    <TableHead className="theadcolor">
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Recorded File</TableCell>
                            <TableCell>Play</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userVoicerows}
                    </TableBody>
                </Table>
            </Paper>
        }

        return (
            <div>
                <div className="height">
                <Grid>
                    <Paper className="align-text">
                        User Records
                        <Switch onChange={this.handleChange} className="switch" checked={this.state.userVoices} value="switch" color="default" />
                        Sample Records
                    </Paper>
                    <br />
                    <Grid>{tableData}</Grid>
                </Grid>
                    <Modal
                        className="modal"
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <Grid style={getModalStyle()} >
                            <ReactAudioPlayer
                                src={"../../assets/uploads/" + this.state.fileSource}
                                autoPlay
                                controls
                                />
                        </Grid>
                    </Modal>
                </div>
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


const voicesPage = connect(mapStateToProps)(VoicesPage);
export { voicesPage as VoicesPage };