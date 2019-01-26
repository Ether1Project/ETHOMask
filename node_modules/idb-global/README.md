# IDB-global

A simple promise based module for interacting with IndexDb in the browser written using the `global` keyword for Browserify.

### Usage:

```javascripts
const DB = require('IDB-global')
const STORAGE_KEY = 'test-database'
const db = new DB({
  key: STORAGE_KEY,
  initialState: {test: 42}
})

db.open()
.then((data) => {
  // do some stuff with that data
  startApp(data)
})

db.get()
.then((data) => {
  ++data.test
  data.hello = 'world'
  return db.put(data)
})
```

### methods:

#### new DB({storageKey, initialState})

storageKey: name of the database
initialState: if the db is empty initial state will be put in the db (optional)

#### open()

Opens a connection to the database and returns a Promise that will resolve with
the current persisted data
If their is no database creates one with the initialState

#### get()

Gets the persisted data

#### put(data)

sets the data in the database
