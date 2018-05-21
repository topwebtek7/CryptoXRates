"use strict"
const axios = require('axios')

class CryptoXRates {
  private apiUrl
  private _limit
  
  constructor() {
    this.apiUrl = 'https://api.coinmarketcap.com/v2'
    this._limit = null
  }
  set limit(limit) {
    this._limit = limit
  }
  get limit() {
    return this._limit
  }
  
  availableCrytos() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.apiUrl}/listings`)
      .then(function (response) {
        if (response && response.data) {
          resolve(response.data)
        } else {
          reject({_error: 'No Data'})
        }
      })
      .catch(function (error) {
        reject(error)
      })
    })
  }

  rateList() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.apiUrl}/ticker${this._limit ? `/?limit=${this._limit}` : ''}`)
      .then(function (response) {
        if (response && response.data) {
          const data = response.data.data || response.data
          const newArray = []
          for (var k in data) {
              if (data.hasOwnProperty(k)) {
                newArray.push({
                  name: data[k]['name'],
                  symbol: data[k]['symbol'],
                  usd: data[k]['quotes']['USD'],
                  last_updated: data[k]['last_updated']
                  })
              }
          }
          resolve(newArray)
        } else {
          reject({_error: 'No Data'})
        }
      })
      .catch(function (error) {
        reject(error)
      })
    })
  }

  getRate(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.apiUrl}/ticker/${id}/`)
      .then(function (response) {
        if (response && response.data) {
          resolve(response.data)
        } else {
          reject({_error: 'No Data'})
        }
      })
      .catch(function (error) {
        reject(error)
      })
    })
  }

  global() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.apiUrl}/global/`)
      .then(function (response) {
          if (response && response.data) {
            resolve(response.data)
          } else {
            reject({_error: 'No Data'})
          }
      })
      .catch(function (error) {
        reject(error)
      })
    })
  }
}

module.exports = CryptoXRates
