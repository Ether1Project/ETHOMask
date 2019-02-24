const fs = require('fs')
const ObsStrore = require('obs-store')

module.exports = class IndexDbController extends ObsStrore {

  constructor (opts) {
    super({})
    this.fileName = opts.fileName || opts.key
    this.initialState = opts.initialState
  }

  // Opens the database connection and returns a promise
  open () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.fileName, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') return reject(err)
        if (err) this.put(this.initialState).then(() => resolve(this.getState()))
        else resolve(JSON.parse(data))
      })
    })
  }

  get () {
    return Promise.resolve(this.getState())
  }

  put (data) {
    return this._write(data)
    .then(() => this.putState(data))
  }

  del (key) {
    const newState = this.getState()
    delete newState[key]
    return this.put(newState)
  }

  _write (data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.fileName, JSON.stringify(data), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}
