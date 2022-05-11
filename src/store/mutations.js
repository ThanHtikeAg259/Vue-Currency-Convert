export const CURRENCY = (state, api_currency) => {
  console.log("state htl m htae khin params:", api_currency);
  console.log("state htl m htae khin state:", state.currency);
  state.currency = api_currency;
  console.log("state htl htae p state:", state.currency);
}

export const COUNTRY = (state, api_country) => {
  state.country.push(api_country)
}