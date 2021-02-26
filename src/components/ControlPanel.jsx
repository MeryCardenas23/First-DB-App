import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 500,
    minWidth: 275,
    '& > *': {
      height: 50,
      margin: theme.spacing(1),
      width: 150,
    },
  },
});

const ControlPanel = (props) => {
  const { classes, actions } = props;
  const { loadDB, getCustomers, showCustomers, clearDB } = actions;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Controls
      </Typography>

      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={() => loadDB()}>
          Load DB
        </Button>
        <Button variant="contained" color="primary" onClick={() => getCustomers(showCustomers)}>
          Query DB
        </Button>
        <Button variant="contained" color="secondary" onClick={() => clearDB()}>
          Clear DB
        </Button>
      </div>
    </>
  );
}

ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);