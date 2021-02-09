import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { loadDB } from "../actions";

const useStyles = makeStyles((theme) => ({
  controlPanel: {
    paddingTop: theme.spacing(10),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ControlPanel() {
  const classes = useStyles();

  return (
    <div className={classes.controlPanel}>
      <Button variant="contained" color="primary" onClick={() => loadDB()}>
        Load DB
      </Button>
      <Button variant="contained" color="primary">
        Query DB
      </Button>
      <Button variant="contained" color="secondary">
        Clear DB
      </Button>
    </div>
  );
}