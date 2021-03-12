export default class Customer {
  constructor(dbName) {
    this.dbName = dbName;

    // Validate if indexedDB is supported
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. " +
        "Such and such feature will not be available.");
    }
  }

  /**
   * Populate the Market database with an initial set of customer data
   * @param {[object]} customerData Data to add
   * @memberof Customer
   */
  initialLoad = (customerData, sendStatusMessage) => {
    // Open database with version 1
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      console.log('initialLoad - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onupgradeneeded = (event) => {
      // Show the status of the operation on the interface
      sendStatusMessage('Start: Loading of market database.');
      console.log('Populating customers...');

      const db = event.target.result;

      // Create an objectStore to hold information about our customers. We're
      // going to use "userId" as our key path because it's guaranteed to be unique.
      const objectStore = db.createObjectStore('customers', { autoIncrement: true, keyPath: 'userId' });

      objectStore.onerror = (event) => {
        console.log('initialLoad - objectStore error: ', event.target.error.code,
          " - ", event.target.error.message);
      };

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex('name', 'name', { unique: false });

      // Create an index to search customers by name. We want to ensure that
      // no two customers have the same email, so use a unique index.
      objectStore.createIndex('email', 'email', { unique: true });

      // Use transaction.oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = (event) => {
        const customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers');

        // Populate the database with the initial set of rows
        customerData.forEach(function (customer) {
          customerObjectStore.add(customer);
        });

        customerObjectStore.transaction.oncomplete = () => {
          // Show the status of the operation on the interface
          sendStatusMessage('End: Market database is loaded.');

          return db.close();
        };
      }
    };
  }

  /**
   * Get all customers from Market database
   * @param {none}
   * @memberof Market
   */
  getAllCustomers = (successAction, sendNotification) => {
    // Open database with version 1
    const request = indexedDB.open(this.dbName, 1);
    request.onerror = (event) => {
      console.log('getAllCustomers - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onsuccess = (event) => {
      sendNotification('Get all customers...');
      const db = event.target.result;
      const transaction = db.transaction('customers');

      transaction.onerror = function (event) {
        console.log('getAllCustomers - objectStore error: ', event.target.error.code,
          " - ", event.target.error.message);
      };

      transaction.oncomplete = function () {
        sendNotification('All customers downloaded!');
      };

      const getAllRequest = transaction.objectStore('customers').getAll();

      getAllRequest.onsuccess = () => {
        successAction(getAllRequest.result);
      }
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
      const transaction = db.transaction('customers', 'readwrite');

      transaction.onerror = (event) => {
        console.log('removeAllRows - Transaction error: ', event.target.error.code,
          " - ", event.target.error.message);
      };

      transaction.oncomplete = (event) => {
        console.log('All rows removed!');
      };

      const objectStore = transaction.objectStore('customers');
      const getAllKeysRequest = objectStore.getAllKeys();

      getAllKeysRequest.onsuccess = (event) => {
        getAllKeysRequest.result.forEach(key => {
          objectStore.delete(key);
        });
      }
    }
  }
}
