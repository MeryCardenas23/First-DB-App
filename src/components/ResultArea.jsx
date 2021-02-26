import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    minHeight: 500,
    minWidth: 275,
    padding: theme.spacing(2),
  },
});

const ResultArea = (props) => {
  const { classes } = props;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Results
      </Typography>

      <Paper id="ResultArea" className={classes.root} elevation={3} />
    </>
  )
}

ResultArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultArea);