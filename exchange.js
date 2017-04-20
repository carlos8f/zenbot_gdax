var request = require('micro-request')

module.exports = function container (get, set, clear) {
  var rest_url = 'https://api.gdax.com'
  return {
    name: 'gdax',
    getProducts: function (cb) {
      request(rest_url + '/products', {headers: {'User-Agent': USER_AGENT}}, function (err, resp, body) {
        if (err) return cb(err)
        var products = []
        body.forEach(function (product) {
          products.push(product.id)
        })
        cb(null, products)
      })
    }
  }
}