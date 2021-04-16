import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  ControlPanel,
  ResultArea,
  NotificationPanel,
} from '../components';
import { loadDB, getCustomers, clearDB } from "../actions";

const styles = (theme) => ({
  root: {
    display: 'flex',
    padding: '50px 100px',
    '& section': {
      padding: 16,
    },
    '& section:nth-child(odd)': {
      width: '40%',
    },
    '& section:nth-child(even)': {
      width: '20%',
    },
    '& h4': {
      textAlign: 'center',
    },
  },
});

const showCustomers = (customers) => {
  const resultArea = document.getElementById('ResultArea');

  const title = document.createElement('H2');
  title.textContent = 'Customer List';

  const list = document.createElement('OL');

  customers.map(customer => {
    const item = document.createElement('LI');
    item.textContent = customer.name;

    return list.appendChild(item);
  });

  resultArea.appendChild(title);
  resultArea.appendChild(list);

  return resultArea;
}

const showNotification = (message) => {
  const date = new Date().toISOString();

  const panel = document.getElementById('Notifications');

  const notification = document.createElement('P');
  notification.textContent = `${date}: ${message}`;
  notification.classList.add('notification');

  panel.appendChild(notification);
  return panel;
}

const Home = (props) => {
  const { classes } = props;

  return(
    <div className={classes.root}>
      <section>
        <NotificationPanel />
      </section>
      <section>
        <ControlPanel
          actions={{
            loadDB: (() => loadDB(showNotification)),
            getCustomers: (() => getCustomers(showCustomers, showNotification)),
            clearDB: (() => clearDB(showNotification)),
          }}
        />
      </section>
      <section>
        <ResultArea />
      </section>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);