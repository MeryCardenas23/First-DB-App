import Customer from "../scripts/Customer";
import store from "../store";

// Web page event handlers
const DBNAME = 'market_db';

/**
 * Add customer data to the database
 */
const loadDB = () => {
  console.log('Load the Market database');

  let customer = new Customer(DBNAME);
  customer.initialLoad(store.customers);
}

/**
 * Get customers from database
 */
const getCustomers = (successAction) => {
  console.log('Get customers');

  let customer = new Customer(DBNAME);
  customer.getAllCustomers(successAction);
}

export {
  getCustomers,
  loadDB,
};
