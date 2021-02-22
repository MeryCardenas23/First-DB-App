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
  initialLoad = (customerData) => {
    // Open database with version 1
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      console.log('initialLoad - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onupgradeneeded = (event) => {
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

        customerObjectStore.transaction.oncomplete = () => db.close();
      }
    };
  }

  /**
   * Get all customers from Market database
   * @param {none}
   * @memberof Market
   */
  getAllCustomers = (successAction) => {
    // Open database with version 1
    const request = indexedDB.open(this.dbName, 1);
    request.onerror = (event) => {
      console.log('getAllCustomers - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onsuccess = (event) => {
      console.log('Get all customers...');
      const db = event.target.result;
      const transaction = db.transaction('customers');

      transaction.onerror = function (event) {
        console.log('getAllCustomers - objectStore error: ', event.target.error.code,
          " - ", event.target.error.message);
      };

      transaction.oncomplete = function () {
        console.log('All customers downloaded!');
      };

      const getAllRequest = transaction.objectStore('customers').getAll();

      getAllRequest.onsuccess = () => {
        successAction(getAllRequest.result);
      }
    }
  }
}
