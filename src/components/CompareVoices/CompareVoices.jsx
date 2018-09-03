import * as React from 'react';
import { connect } from 'react-redux';
import './comparevoices.scss';
import { store } from '../../_helpers';
import { audioFileActions } from '../../_actions';
import { Button, Radio, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import GraphicEq from "@material-ui/icons/GraphicEq";


class CompareVoices extends React.Component {
    constructor(props) {
        super(props);
        this.handleSampleVoiceChange = this.handleSampleVoiceChange.bind(this);
        this.handleUserVoiceChange = this.handleUserVoiceChange.bind(this);
        this.state = {
            selectedSampleVoice: '',
            selectedUserVoice: '',
            data: undefined
        };
    }

    // componentDidMount() {
    //     this.props.dispatch(audioFileActions.getUserAudioFiles());
    // }

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

    handleSampleVoiceChange(event) {
        this.setState({
            selectedSampleVoice: event.target.value
        });
    }

    handleUserVoiceChange(event) {
        this.setState({
            selectedUserVoice: event.target.value
        });
    }

    render() {
            const sampleVoiceFilteredRows = this.props.audioFiles.audioFiles ? this.props.audioFiles.audioFiles.result.filter(ele => ele.usertype === "system") : [];
            const sampleVoicerows = sampleVoiceFilteredRows.map((audio) =>
                <TableRow key={audio._id.$oid}>
                    <TableCell>
                        <Radio
                            checked={this.state.selectedSampleVoice === audio.fileName}
                            onChange={this.handleSampleVoiceChange}
                            value={audio.fileName}
                            name="radio-button-demo"
                        />
                    </TableCell>
                    <TableCell>{audio.user}</TableCell>
                    <TableCell>{audio.fileName}</TableCell>
                </TableRow>
            );
            const userVoicerowsFilteredRows = this.props.audioFiles.audioFiles ? this.props.audioFiles.audioFiles.result.filter(ele => ele.usertype === "normal") : [];
            const userVoicerows = userVoicerowsFilteredRows.map((audio) =>
                <TableRow key={audio._id.$oid}>
                    <TableCell>
                        <Radio
                            checked={this.state.selectedUserVoice === audio.fileName}
                            onChange={this.handleUserVoiceChange}
                            value={audio.fileName}
                            name="radio-button-demo"
                        />
                    </TableCell>
                    <TableCell>{audio.user}</TableCell>
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
                                    <TableCell>Username</TableCell>
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
                                    <TableCell>Username</TableCell>
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
                    <Button className="margin50" variant="extendedFab" aria-label="Delete">
                        <GraphicEq />
                        Compare Voices
                    </Button>
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


const compareVoicesPage = connect(mapStateToProps)(CompareVoices);
export { compareVoicesPage as CompareVoices };
