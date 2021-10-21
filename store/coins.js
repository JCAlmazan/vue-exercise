export const state = () => ({
  list: ["BTCUSDT", "ETHUSDT", "ADAUSDT", "LTCUSDT", "AXSUSDT", "BNBUSDT"]
})

export const mutations = {
  add(state, symbol) {
    state.list.push(symbol)
  },/*
  remove(state, { coin }) {
    state.list.splice(state.list.indexOf(coin), 1)
  }*/
}