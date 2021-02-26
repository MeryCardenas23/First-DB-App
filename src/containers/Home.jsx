import React from 'react';

import ControlPanel from '../components/ControlPanel';
import ResultArea from '../components/ResultArea';
import { loadDB, getCustomers } from "../actions";

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
    <section className="Home-rightcolumn">
      <ResultArea />
    </section>
    <section className="Home-leftcolumn">
      <ControlPanel
        actions={{
          loadDB,
          getCustomers,
          showCustomers,
        }}
      />
    </section>
  </div>
);

export default Home;