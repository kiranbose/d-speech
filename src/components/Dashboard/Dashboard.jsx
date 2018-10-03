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
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            googleText: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(metaDataActions.getMetaData());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleOpen = (text) => {
        this.setState({
            open: true,
            googleText: text
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { user, users, classes, metaData } = this.props;
        let cardInfo = [];
        let userRecordings = [];
        let sampleRecordings = [];
        if (metaData && metaData.hasOwnProperty('userRecordings')) {
            userRecordings = metaData.userRecordings;
            sampleRecordings = metaData.sampleRecordings;
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
                    count: userRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.speed)), 0)/userRecordings.length
                }
                /*{
                    title: 'Ranking',
                    count: '2'
                }, */
            ]
        }
        return (
            <div>
                <Grid
                    container
                    spacing={10}
                    direction="row"
                    justify="space-evenly"
                >
                    <Grid
                        item md={6}
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
                                    <TableCell>Audio Text</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    metaData && metaData.hasOwnProperty('userRecordings') && metaData.userRecordings.map((data, index) => {
                                        return (
                                            <TableRow key={'' + index}>
                                                <TableCell>{ data.fileName }</TableCell>
                                                <TableCell>{ data.duration_milliseconds/60000 } m</TableCell>
                                                <TableCell>{ data.speed } wpm</TableCell>
                                                <TableCell>placeholder</TableCell>
                                                <TableCell>
                                                    {/* <Tooltip title="This is test"> */}
                                                    <Button color="primary" onClick={() => { this.handleOpen(data.text) }}>
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
                    </Grid>
                    <Grid
                        item xs={5}
                    >
                        {/* <Paper className="align-text">
                            <Typography className="th-color" variant="title" id="modal-title">
                                Metrics
                            </Typography>
                        </Paper> */}
                        <Table className="table table-striped" style={{ marginTop: 30 }}>
                            <Typography className="th-color" variant="title" id="modal-title">
                                User Metrics (Overall Avg)
                            </Typography>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell><strong>Speed</strong></TableCell>
                                    <TableCell>{userRecordings && userRecordings.reduce(((prev, curr) => prev + Math.ceil(curr.speed)), 0)/userRecordings.length}</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell><strong>Loudness</strong></TableCell>
                                    <TableCell>30</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell><strong>Power</strong></TableCell>
                                    <TableCell>40</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table className="table table-striped" style={{ marginTop: 30 }}>
                            <Typography className="th-color" variant="title" id="modal-title">
                                Sample Metrics (Overall Avg)
                            </Typography>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell><strong>Speed</strong></TableCell>
                                    <TableCell>20</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell><strong>Loudness</strong></TableCell>
                                    <TableCell>30</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell><strong>Power</strong></TableCell>
                                    <TableCell>40</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Modal
                    className="modal audioText"
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
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
