import * as React from 'react';
import './VoiceGraph.css';
import { connect } from 'react-redux';
import { store } from '../../_helpers';
import { voiceGraphActions } from '../../_actions';
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
        this.props.dispatch(voiceGraphActions.getFileData(this.props.audioFiles.selectedSampleVoice, this.props.audioFiles.selectedUserVoice));
        store.subscribe(() => {
            var data = store.getState();
            if (data.voiceGraph.hasOwnProperty('voiceGraph')) {                
                if (data.voiceGraph != this.state.voiceGraph) {
                    this.setState({ voiceGraph: data.voiceGraph });
                    this.render();
                }
            }
        });
    }

    // componentWillUnMount() {

    // }

    render() {
        this.renderChart();
        return (
            <div>
                <div id="chartContainer"></div>                
            </div>
        );
    }

    renderChart() {
        if (this.props.voiceGraph.voiceGraph) {
            const chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "Voice Comparison"
                },
                axisX: {
                    title: "Frequency"
                },
                axisY: {
                    title: "Power"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    horizontalAlign: "center",
                    dockInsidePlotArea: false
                },
                data: [{
                    type: "line",
                    name: "User 1",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: this.props.voiceGraph.voiceGraph.fileData1
                }, {
                    type: "line",
                    name: "User 2",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: this.props.voiceGraph.voiceGraph.fileData2
                }]
            });
            chart.render();
        }
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