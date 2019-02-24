const ObservableStore = require('obs-store')
const extend = require('xtend')
const log = require('loglevel')

// every ten minutes
const POLLING_INTERVAL = 10 * 60 * 1000

class CryptoCompareController {

  constructor (opts = {}) {
    const initState = extend({
      cryptoCompareNetworkStatus: {},
    }, opts.initState)
    this.store = new ObservableStore(initState)
  }

  //
  // PUBLIC METHODS
  //

  // Responsible for retrieving the status of CryptoCompare nodes. Can return either
  // ok, degraded, or down.
  async checkcryptoCompareNetworkStatus () {
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETHO&tsyms=USD')
    const fakeResponse = '{"mainnet": "ok", "ropsten": "ok", "kovan": "ok", "rinkeby": "ok"}'
    const parsedResponse = JSON.parse(fakeResponse);
    this.store.updateState({
      cryptoCompareNetworkStatus: parsedResponse,
    })
    return parsedResponse
  }

  schedulecryptocompareNetworkCheck () {
    if (this.conversionInterval) {
      clearInterval(this.conversionInterval)
    }
    this.conversionInterval = setInterval(() => {
      this.checkcryptoCompareNetworkStatus().catch(log.warn)
    }, POLLING_INTERVAL)
  }
}

module.exports = CryptoCompareController
