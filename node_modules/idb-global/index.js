module.exports = (global.indexedDB) ? require('./util/IDB.js') : require('./util/IDB-polyfill.js')
