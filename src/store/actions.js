import axios from 'axios';

export const getCurrency = ({commit}, first_currency) => {
  axios.get(`https://v6.exchangerate-api.com/v6/6b8ea205da3e869cc3e943c2/latest/${first_currency}`)
  .then(response => {
    commit('CURRENCY', response.data)
  })
}

export const getCountry = ({commit}) => {
  axios.get('https://v6.exchangerate-api.com/v6/6b8ea205da3e869cc3e943c2/latest/USD')
  .then(response => {
    commit('COUNTRY', Object.keys(response.data.conversion_rates)),
    commit('OPTIONS', Object.keys(response.data.conversion_rates))
  })
}