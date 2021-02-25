import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
});

const ControlPanel = (props) => {
  const { classes, actions } = props;
  const { loadDB, getCustomers, showCustomers, clearDB } = actions;

  return (
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
  );
}

ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);