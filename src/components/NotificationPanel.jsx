import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    height: 500,
    minWidth: 275,
    padding: theme.spacing(2),
    overflowY: 'scroll',
  },
});

const NotificationPanel = (props) => {
  const { classes } = props;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      <Paper id="Notifications" className={classes.root} elevation={3} />
    </>
  )
}

NotificationPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationPanel);