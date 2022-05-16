export const CURRENCY = (state, api_currency) => {
  state.currency = api_currency;
}

export const COUNTRY = (state, api_country) => {
  state.country.push(api_country)
}

export const OPTIONS = (state, api_options) => {
  api_options.forEach((element) => {
    if (element.startsWith('X')) {
      state.options.push({
        title: element,
        img: 'https://v2.convertapi.com/d/t42muyz40kcb1m89esmn7djijzvvvas5/worldwide.png'
      })
    } else {
      state.options.push({
        title: element,
        img: 'https://www.countryflagicons.com/FLAT/32/' + element.slice(0, -1) + '.png'
      })
    }
  })
}