import axios from 'axios';

export const getCurrency = ({commit}, first_currency) => {
  axios.get(`https://v6.exchangerate-api.com/v6/c4f627fe945d4792766a260c/latest/${first_currency}`)
  .then(response => {
    commit('CURRENCY', response.data)
  })
}

export const getCountry = ({commit}) => {
  axios.get('https://v6.exchangerate-api.com/v6/c4f627fe945d4792766a260c/latest/USD')
  .then(response => {
    commit('COUNTRY', Object.keys(response.data.conversion_rates))
  })
}