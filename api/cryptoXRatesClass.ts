"use strict"
import axios from 'axios'

class CryptoXRates {
  private apiUrl
  private _limit

  constructor() {
    this.apiUrl = 'https://api.coinmarketcap.com/v2'
    this._limit = null
  }
  set limit(limit: number) {
    this._limit = limit
  }
  get limit() {
    return this._limit
  }
  
  public availableCrytos(): Promise<any> {
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

  public rateList(): Promise<any> {
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

  public getRate(id: Number): Promise<any> {
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

  public global(): Promise<any> {
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

export default new CryptoXRates()
