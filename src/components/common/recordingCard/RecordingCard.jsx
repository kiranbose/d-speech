import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseArrowIcon from "@material-ui/icons/Pause";

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class RecordingCard extends Component {
  audio = new Audio("http://www.sousound.com/music/healing/healing_01.mp3");

  constructor(props) {
    super(props);
  }

  state = {
    expanded: false,
    play: false
  };

  handlePreviousSeek = () => {
    this.audio.currentTime -= 2;
  };

  handleForwardSeek = () => {
    this.audio.currentTime += 2;
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handlePlayButton = () => {
    this.setState(state => ({
      play: !this.state.play
    }));

    if (!this.state.play) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">Live From Space</Typography>
            <Typography variant="subheading" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton onClick={this.handlePreviousSeek} aria-label="Previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="Play/pause">
              {!this.state.play ? (
                <PlayArrowIcon
                  onClick={this.handlePlayButton}
                  className={classes.playIcon}
                />
              ) : (
                <PauseArrowIcon
                  onClick={this.handlePlayButton}
                  className={classes.playIcon}
                />
              )}
            </IconButton>
            <IconButton onClick={this.handlePreviousSeek} aria-label="Next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  // const { authentication } = state;
  return {
    // authentication
  };
}

const StyleAttachedComponent = withStyles(styles, { withTheme: true })(
  RecordingCard
);
export default connect(mapStateToProps)(StyleAttachedComponent);
// export default RecordingCard();
