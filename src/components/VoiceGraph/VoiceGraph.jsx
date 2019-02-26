import * as React from 'react';
import './VoiceGraph.scss';
import { connect } from 'react-redux';
import { store } from '../../_helpers';
import { voiceGraphActions } from '../../_actions';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

// import CanvasJS from 'canvasjs'

class VoiceGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: {},
            voiceGraph: {}
        };
    }

    componentWillMount() {
        this.props.dispatch(voiceGraphActions.setFileData({}));
        this.props.dispatch(voiceGraphActions.getFileData(this.props.audioFiles.selectedSampleVoice, this.props.audioFiles.selectedUserVoice));
        store.subscribe(() => {
            var data = store.getState();
            if (data.voiceGraph.hasOwnProperty('graph')) {
                this.render();
            }
        });
    }

    // componentWillUnMount() {

    // }

    render() {
        const { voiceGraph } = this.props;
        return (
            <div> 
                {voiceGraph && !voiceGraph.hasOwnProperty('plotUrl') && 
                    <div>
                        <CircularProgress style={{ marginLeft: '48%' }} />
                    </div>
                }
                {voiceGraph && voiceGraph.hasOwnProperty('plotUrl') &&
                    <div>
                        <img src={voiceGraph.plotUrl} alt="graph" width="100%" />
                        <Grid
                            container
                            spacing={14}
                            direction="row"
                            justify="space-around"
                            className="card-container"
                        >
                            <Grid item md={6}>
                                <Card className="user-card">
                                    <CardContent>
                                        <Typography variant="title" color="textPrimary">
                                            User Audio Text
                                </Typography>
                                        <Typography variant="subheading">
                                            {voiceGraph.userText}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={6}>
                                <Card className="sample-card">
                                    <CardContent>
                                        <Typography variant="title" color="textPrimary">
                                            Sample Audio Text
                                </Typography>
                                        <Typography variant="subheading">
                                            {voiceGraph.sampleText}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { audioFiles, voiceGraph } = state;
    return {
        audioFiles,
        voiceGraph
    };
}

const voiceGraphPage = connect(mapStateToProps)(VoiceGraph);
export { voiceGraphPage as VoiceGraph };