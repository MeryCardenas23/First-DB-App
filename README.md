# My First DB App

## Index

- [My First DB App](#my-first-db-app)
  - [Index](#index)
  - [1. Preamble](#1-preamble)
  - [2. Requirements and Constraints](#2-requirements-and-constraints)
  - [3. Learning Goals](#3-learning-goals)
  - [4. User Stories](#4-user-stories)
  - [5. Bonus features](#5-bonus-features)
  - [6. Useful links and resources](#6-useful-links-and-resources)
  - [7. Copyright](#7-copyright)
***
## 1. Preamble
**Tier:** Beginner

Understanding database concepts and how to use them in your applications is knowledge all developers need to acquire. The objective of **My First DB App** is to provide a gentle introduction to database concepts and learning one use case for databases in a frontend app.

## 2. Requirements and Constraints

- The primary use case for a browser based database is to maintain state or status information that needs to persist across sessions, or as a work area for temporary data. For example, data retrieved from a server that must be reformatted or cleansed before it's presented to the user.

- It is important to keep in mind that since the client-side browser environment cannot be secured you should not maintain any confidential or personal identifying information (PII) in a browser based database.
- The following Javascript class is provided with the functionality to allow your app to initially populate and clear the database from the browser so you can test the query logic you'll be adding. You'll be required to hook up buttons on the web page you build to the clearDB and loadDB functions, and to write your own queryDB handler to connect to the Query DB button. You'll also need to add a queryAllRows function to the Customer class.

```js
class Customer {
  constructor(dbName) {
    this.dbName = dbName;
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. \
        Such and such feature will not be available.");
    }
  }

  /**
   * Remove all rows from the database
   * @memberof Customer
   */
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      console.log('removeAllRows - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onsuccess = (event) => {
      console.log('Deleting all customers...');
      const db = event.target.result;
      const txn = db.transaction('customers', 'readwrite');
      txn.onerror = (event) => {
        console.log('removeAllRows - Txn error: ', event.target.error.code,
          " - ", event.target.error.message);
      };
      txn.oncomplete = (event) => {
        console.log('All rows removed!');
      };
      const objectStore = txn.objectStore('customers');
      const getAllKeysRequest = objectStore.getAllKeys();
      getAllKeysRequest.onsuccess = (event) => {
        getAllKeysRequest.result.forEach(key => {
          objectStore.delete(key);
        });
      }
    }
  }

  /**
   * Populate the Customer database with an initial set of customer data
   * @param {[object]} customerData Data to add
   * @memberof Customer
   */
  initialLoad = (customerData) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      console.log('initialLoad - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onupgradeneeded = (event) => {
      console.log('Populating customers...');
      const db = event.target.result;
      const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
      objectStore.onerror = (event) => {
        console.log('initialLoad - objectStore error: ', event.target.error.code,
          " - ", event.target.error.message);
      };

      // Create an index to search customers by name and email
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });

      // Populate the database with the initial set of rows
      customerData.forEach(function(customer) {
        objectStore.put(customer);
      });
      db.close();
    };
  }
}

// Web page event handlers
const DBNAME = 'customer_db';

/**
 * Clear all customer data from the database
 */
const clearDB = () => {
  console.log('Delete all rows from the Customers database');
  let customer = new Customer(DBNAME);
  customer.removeAllRows();
}

/**
 * Add customer data to the database
 */
const loadDB = () => {
  console.log('Load the Customers database');

  // Customers to add to initially populate the database with
  const customerData = [
    { userid: '444', name: 'Bill', email: 'bill@company.com' },
    { userid: '555', name: 'Donna', email: 'donna@home.org' }
  ];
  let customer = new Customer(DBNAME);
  customer.initialLoad(customerData);
}
```

## 3. Learning Goals

* [ ] Review Javascript fundamentals
* [ ] Deepen React Hooks
* [ ] Learn basic concepts of relational and non-relational databases
* [ ] Improve task estimation

## 4. User Stories

* [ ] User can see a web page containing a control panel containing three buttons - 'Load DB', 'Query DB', and 'Clear DB'.
* [ ] User can see a notification panel where status messages will be posted.
* [ ] User can see a scrollable log panel where execution details describing the apps operation and interface with the Customer instance will be posted.
* [ ] User can see a running history of notification panel messages in the log panel.
* [ ] User can see a scrollable query results area where retrieved customer data will be displayed.
* [ ] User can click the 'Load DB' button to populate the database with data. The 'Load DB' button in your UI should be hooked to the loadDB event handler that's provided.
* [ ] User can see a message displayed in the notification panel when the data load operation starts and ends.
* [ ] User can click the 'Query DB' button to list all customers in the query results area. The 'Query DB' button in your UI should be hooked to a queryDB event handler you will add to the program.
* [ ] User can see a message in the notification panel when the query starts and ends.
* [ ] User can see a message in the query results area if there are no rows to display.
* [ ] User can click on the 'Clear DB' button to remove all rows from the database. The 'Clear DB' button in your UI should be hooked to the clearDB event handler that's provided.
* [ ] User can see a message in the notification panel when the clear operation starts and ends.

## 5. Bonus features

* [ ] User can see buttons enabled and disabled according to the following
table.

    | State               | Load DB  | Query DB | Clear DB |
    |---------------------|----------|----------|----------|
    | Initial App display | enabled  | enabled  | disabled |
    | Load DB clicked     | disabled | enabled  | enabled  |
    | Query DB clicked    | disabled | enabled  | enabled  |
    | Clear DB clicked    | enabled  | enabled  | disabled |

* [ ] User can see additional Customer data fields added to those included
in the code provided. Developer should add date of last order and total sales
for the year.
* [ ] Developer should conduct a retrospection on this project:
  - What use cases can you see for using IndexedDB in your frontend apps?
  - What advantages and disadvantages can you see over using a file or
    local storage?
  - In general, what criteria might you use to determine if IndexedDB is right
    for your app. (Hint: 100% yes or no is not a valid answer).

## 6. Useful links and resources

- [IndexedDB Concepts (MDN)](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API/Conceptos_Basicos_Detras_De_IndexedDB)
- [Using IndexedDB (MDN)](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API/Usando_IndexedDB)
- [IndexedDB API (MDN)](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API)
- [IndexedDB Browser Support](https://caniuse.com/#feat=indexeddb)

## 7. Copyright
- Author: [florinpop17](https://github.com/florinpop17)
- Original project: [Your First DB App](https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/First-DB-App.md)