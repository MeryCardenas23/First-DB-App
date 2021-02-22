import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 0,
    paddingBottom: theme.spacing(1)
  },
  title: {
    color: theme.palette.primary.contrastText,
  }
});

const Header = (props) => {
  const { classes } = props;

  return (  
    <header className="App-header">
      <Paper className={classes.root} elevation={3}>
        <Typography className={classes.title} variant="h2">
          My First DB App
        </Typography>
      </Paper>
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);