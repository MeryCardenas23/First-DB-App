import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = {
  root: {
    minHeight: 500,
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
};

const ResultArea = (props) => {
  const { classes } = props;

  return <Paper id="ResultArea" className={classes.root} elevation={3} />
}

ResultArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultArea);