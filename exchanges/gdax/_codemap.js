module.exports = {
  _ns: 'zenbot',
  'exchanges.gdax': require('./exchange'),
  'exchanges[]': '#exchanges.gdax'
}