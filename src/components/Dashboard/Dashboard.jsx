import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { userActions, pathActions } from '../../_actions';
import './dashboard.scss';

const styles = theme => ({
   numberDisplay: {
       color: 'gray'
   },
   card: {
       background: 'whitesmoke',
       minWidth: '150px'
   },
   numberDisplay: {
       fontSize: '4em'
   }
});
class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users, classes } = this.props;
        const cardInfo = [
            {
                title: 'Number of user audio files',
                count: '23'
            },
            {
                title: 'Number of sample audio files',
                count: '34'
            },
            {
                title: 'Average wpm',
                count: '100'
            },
            {
                title: 'Ranking',
                count: '2'
            },
        ]
        return (
            <Grid
            container
            spacing={40}
            alignItems="center"
            direction="row"
            justify="space-evenly"
            >
                {cardInfo.map((card) => {
                    return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary">
                        {card.title}
                        </Typography>
                        <Typography component="h1" className={classes.numberDisplay}>
                        {card.count}
                        </Typography>
                    </CardContent>
                </Card>)
                })}
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
const StyleAttachedComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default connect(mapStateToProps)(StyleAttachedComponent);
