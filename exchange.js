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
    },
    getTrades: function (opts, cb) {
      var uri = rest_url + '/products/' + opts.product_id + '/trades'
      if (opts.newer && opts.cursor) {
        uri += '?before=' + opts.cursor
      }
      else if (opts.older && opts.cursor) {
        uri += '?after=' + opts.cursor
      }
      console.log('uri', uri)
      request(uri, {headers: {'User-Agent': USER_AGENT}}, function (err, resp, body) {
        if (err) return cb(err)
        if (resp.statusCode !== 200 || toString.call(body) !== '[object Array]') {
          console.error(body)
          var err = new Error('non-200 status')
          err.code = 'HTTP_STATUS'
          return cb(err)
        }
        if (opts.newer && resp.headers['cb-before']) {
          opts.cursor = Number(resp.headers['cb-before'])
        }
        else if (opts.older && resp.headers['cb-after']) {
          opts.cursor = Number(resp.headers['cb-after'])
        }
        var trades = body.map(function (trade) {
          return {
            trade_id: trade.trade_id,
            time: new Date(trade.time).getTime(),
            size: Number(trade.size),
            price: Number(trade.price),
            side: trade.side
          }
        })
        cb(null, trades)
      })
    }
  }
}