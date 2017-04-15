module.exports = {
  "name": "gdax",
  "rest_url": "https://api.gdax.com",
  "backfill_limit": 100,
  "backfill_timeout": 1000,
  "products": [
    {
      "id":"BTC-USD",
      "asset":"BTC",
      "currency":"USD"
    },
    {
      "id":"ETH-USD",
      "asset":"ETH",
      "currency":"USD"
    },
    {
      "id":"BTC-GBP",
      "asset":"BTC",
      "currency":"GBP"
    },
    {
      "id":"BTC-EUR",
      "asset":"BTC",
      "currency":"EUR"
    },
    {
      "id":"BTC-CAD",
      "asset":"BTC",
      "currency":"CAD"
    },
    {
      "id":"ETH-BTC",
      "asset":"ETH",
      "currency":"BTC"
    }
  ]
}