import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid, Card, CardContent, Modal,
    Typography, CardActions, Button, Paper, Tooltip,
    Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { userActions, pathActions, metaDataActions } from '../../_actions';
import './dashboard.scss';

const styles = theme => ({
    numberDisplay: {
        color: 'gray'
    },
    card: {
        background: 'whitesmoke',
        minWidth: '150px',
        display: 'inline-block',
        marginRight: '10px'
    },
    rightCard: {
        background: 'whitesmoke',
        minWidth: '150px',
        display: 'inline-block',
        marginRight: '10px',
        width:  '100%',
        textAlign: 'center',
        position: 'relative'
    },
    numberDisplay: {
        fontSize: '4em'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    fullWidth: {
        width: '100%'
    }
});

function getModalStyle() {
    const top = 20;
    const left = 20;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
}


class Dashboard extends React.Component {
    boundaryMetric = {
        speed: {
            master: 5,
            advanced: 10
        },
        power: {
            master: 10,
            advanced: 20
        },
        freq: {
            master: 1000,
            advanced: 2000
        },
    }
    speedScore = 3;
    powerScore = 3;
    freqScore = 3;
    userScore = '';

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            googleText: '',
            graphPath: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(metaDataActions.getMetaData());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleOpen = (text, path) => {
        this.setState({
            open: true,
            googleText: text,
            graphPath: path
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    calculateScore = (userAverageWpm,
        userAvgPower,
        userAvgFreq,
        sampleAverageWpm,
        sampleAvgPower,
        sampleAvgFreq
        ) => {

            if (((sampleAverageWpm - this.boundaryMetric.speed.master)  < userAverageWpm) &&  (userAverageWpm < (sampleAverageWpm + this.boundaryMetric.speed.master))) {
                this.speedScore = 1;
            } else if (((sampleAverageWpm - this.boundaryMetric.speed.advanced)  < userAverageWpm) && (userAverageWpm < (sampleAverageWpm + this.boundaryMetric.speed.advanced))) {
                this.speedScore = 2;
            }

            if (((sampleAvgPower - this.boundaryMetric.power.master)  < userAvgPower) && (userAvgPower < (sampleAvgPower + this.boundaryMetric.power.master))) {
                this.powerScore = 1;
            } else if (((sampleAvgPower - this.boundaryMetric.power.advanced)  < userAvgPower) && (userAvgPower < (sampleAvgPower + this.boundaryMetric.power.advanced))) {
                this.powerScore = 2;
            }

            if (((sampleAvgFreq - this.boundaryMetric.freq.master)  < userAvgFreq) && (userAvgFreq < (sampleAvgFreq + this.boundaryMetric.freq.master))) {
                this.freqScore = 1;
            } else if (((sampleAvgFreq - this.boundaryMetric.freq.advanced)  < userAvgFreq) && (userAvgFreq < (sampleAvgFreq + this.boundaryMetric.freq.advanced))) {
                this.freqScore = 2;
            }

            switch(this.speedScore + this.powerScore + this.freqScore) {
                case 3:
                    return 'Mastery';
                case 5:
                    return 'Advanced';
                default:
                    return 'Intermediate';
            }
        }
    
    getMetricScore(score) {
        switch (score) {
            case 1:
                return 'Mastery';
            case 2:
                return 'Advanced';
            default:
                return 'InterMediate';
        }
    }

    render() {
        const { user, users, classes, metaData } = this.props;
        const admin = user.permission === 'administrator';
        let cardInfo = [];
        let userRecordings = [];
        let sampleRecordings = [];
        let userAverageWpm = 0;
        let sampleAverageWpm = 0;
        let userAvgPower = 0;
        let userAvgFreq = 0;
        let sampleAvgPower = 0;
        let sampleAvgFreq = 0;
        let scoreLevel = 3;
        if (Object.keys(metaData).length > 0) {

            userRecordings = metaData.userRecordings;
            sampleRecordings = metaData.sampleRecordings;
            if (userRecordings.length > 0) {
                userAverageWpm = Math.ceil(userRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.speed)), 0) / userRecordings.length)
                userAvgPower = Math.ceil(userRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.recordingsWithPowerData[0].avgPower)), 0) / userRecordings.length)
                userAvgFreq = Math.ceil(userRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.recordingsWithPowerData[0].avgFrequency)), 0) / userRecordings.length)
            }
            if (sampleRecordings.length > 0) {
                sampleAverageWpm = Math.ceil(sampleRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.speed)), 0) / sampleRecordings.length)
                sampleAvgPower = Math.ceil(sampleRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.recordingsWithPowerData[0].avgPower)), 0) / sampleRecordings.length)
                sampleAvgFreq = Math.ceil(sampleRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.recordingsWithPowerData[0].avgFrequency)), 0) / sampleRecordings.length)
            }

            this.userScore = this.calculateScore(userAverageWpm,
                            userAvgPower,
                            userAvgFreq,
                            sampleAverageWpm,
                            sampleAvgPower,
                            sampleAvgFreq
                            );

            cardInfo = [
                {
                    title: 'user files Count',
                    count: userRecordings.length
                },
                {
                    title: 'sample files count',
                    count: sampleRecordings.length
                },
                {
                    title: 'Average wpm',
                    count: userAverageWpm
                }
                /*{
                    title: 'Ranking',
                    count: '2'
                }, */
            ]
            if (admin) {
                cardInfo.splice(0, 1);
            }
        }
        return (
            <div>
                <Grid
                    container
                    spacing={10}
                    direction="row"
                    justify="space-around"
                >
                    <Grid
                        item md={7}
                    >
                        {cardInfo.map((card) => {
                            return (
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="subheading" color="textPrimary">
                                            {card.title}
                                        </Typography>
                                        <Typography variant="title">
                                            {card.count}
                                        </Typography>
                                    </CardContent>
                                </Card>)
                        })}
                        <Table className="table table-striped" style={{ marginTop: 30 }}>
                            <TableHead className="theadcolor">
                                <TableRow>
                                    <TableCell>File Name</TableCell>
                                    <TableCell>File Duration</TableCell>
                                    <TableCell>Word Count</TableCell>
                                    <TableCell>Loudness</TableCell>
                                    <TableCell>Frequency</TableCell>
                                    <TableCell>Audio Text</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    metaData && metaData.hasOwnProperty(!admin ? 'userRecordings' : 'sampleRecordings') && metaData[!admin ? 'userRecordings' : 'sampleRecordings'].map((data, index) => {
                                        return (
                                            <TableRow key={'' + index}>
                                                <TableCell>{data.fileName}</TableCell>
                                                <TableCell>{data.duration_milliseconds / 1000} sec</TableCell>
                                                <TableCell>{data.speed} wpm</TableCell>
                                                <TableCell>{Math.floor(data.recordingsWithPowerData[0].avgPower)}</TableCell>
                                                <TableCell>{Math.floor(data.recordingsWithPowerData[0].avgFrequency)}</TableCell>
                                                <TableCell>
                                                    {/* <Tooltip title="This is test"> */}
                                                    <Button color="primary" onClick={() => { this.handleOpen(data.text, data.graphPath) }}>
                                                        <Icon>help</Icon>
                                                    </Button>
                                                    {/* </Tooltip> */}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })

                                }
                            </TableBody>
                        </Table>
                        <Table className="table table-striped" style={{ marginTop: 30 }}>
                            <Typography className="th-color" variant="subheading" id="modal-title">
                                Latest Comparison
                            </Typography>
                            <TableBody>
                                {
                                    metaData && metaData.hasOwnProperty('latestComparison') && metaData.latestComparison.length > 0 && (
                                        <TableRow>
                                            <TableCell>
                                                <img src={'../../assets/uploads/' + metaData.latestComparison[0].graphPath.split("\\").slice(-1)[0]} width="100%" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid
                        item xs={3}
                    >
                        <Card className={classes.rightCard}>
                            <CardContent>
                                    <div className={'medal medal-' + this.userScore}>
                                        
                                    </div>
                                    <Typography variant="subheading" color="textPrimary">
                                        User Score Level
                                    </Typography>
                                    <Typography variant="title">
                                        {this.userScore}
                                    </Typography>
                            </CardContent>
                        </Card>
                        {!admin && <Table className="table table-striped" style={{ marginTop: 30 }}>
                            <Typography className="th-color" variant="subheading" id="modal-title">
                                User Metrics (Overall Avg)
                            </Typography>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell><strong>Speed</strong></TableCell>
                                    <TableCell className={classes.fullWidth}>{userAverageWpm} ({this.getMetricScore(this.speedScore)})</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell><strong>Power</strong></TableCell>
                                    <TableCell className={classes.fullWidth}>{userAvgPower} ({this.getMetricScore(this.powerScore)})</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell><strong>Frequency</strong></TableCell>
                                    <TableCell className={classes.fullWidth}>{userAvgFreq} ({this.getMetricScore(this.freqScore)})</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>}
                        <Table className="table table-striped" style={{ marginTop: 30 }}>
                            <Typography className="th-color" variant="subheading" id="modal-title">
                                Sample Metrics (Overall Avg)
                            </Typography>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell><strong>Speed</strong></TableCell>
                                    <TableCell className={classes.fullWidth}>{sampleAverageWpm}</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell><strong>Power</strong></TableCell>
                                    <TableCell className={classes.fullWidth}>{sampleAvgPower}</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell><strong>Frequency</strong></TableCell>
                                    <TableCell className={classes.fullWidth}>{sampleAvgFreq}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {metaData && metaData.hasOwnProperty('userRecordings') && metaData.userRecordings.length > 0 &&
                            <Table className="table table-striped" style={{ marginTop: 30 }}>
                                <Typography className="th-color" variant="subheading" id="modal-title">
                                    Recent User Metrics
                            </Typography>
                                <TableBody>
                                    {
                                        metaData && metaData.hasOwnProperty('userRecordings') && metaData.userRecordings.map((data, index) => {
                                            if (index >= metaData.userRecordings.length - 5) {
                                                return (<TableRow key={index}>
                                                    <TableCell>
                                                        <img src={'../../assets/uploads/' + data.graphPath} width="100%" />
                                                    </TableCell>
                                                </TableRow>)
                                            }
                                        })
                                    }
                                </TableBody>
                            </Table>
                        }
                    </Grid>
                </Grid>
                <Modal
                    className="modal audioText"
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <img src={'../../assets/uploads/' + this.state.graphPath} alt="graph" width="100%" />
                        <Typography variant="subheading" id="modal-title">
                            {this.state.googleText}
                        </Typography>
                    </div>
                </Modal>
            </div >

        );
    }
}


function mapStateToProps(state) {
    const { users, authentication, metaData } = state;
    const { user } = authentication;
    return {
        user,
        users,
        metaData
    };
}
const StyleAttachedComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default connect(mapStateToProps)(StyleAttachedComponent);
