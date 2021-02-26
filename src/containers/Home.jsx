import React from 'react';

import {
  ControlPanel,
  ResultArea,
  NotificationPanel,
} from '../components';
import { loadDB, getCustomers, clearDB } from "../actions";

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

const Home = () => (
  <div className="Home">
    <section>
      <NotificationPanel />
    </section>
    <section>
      <ControlPanel
        actions={{
          loadDB,
          getCustomers,
          showCustomers,
          clearDB,
        }}
      />
    </section>
    <section>
      <ResultArea />
    </section>
  </div>
);

export default Home;