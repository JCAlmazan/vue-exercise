<template>
  <v-card>
    <v-card-title>
      Cryptocurrencies
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      loading
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="coins"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Coin",
          align: "start",
          sortable: false,
          value: "symbol",
        },
        { text: "weightedAvgPrice", value: "weightedAvgPrice" },
        { text: "volume", value: "volume" },
        { text: "priceChange", value: "priceChange" },
      ],
      coins: [],
    };
  },
  activated() {
    // Call fetch again if last fetch more than 10 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 10000) {
      this.$fetch();
    }
  },
  async fetch() {
    this.coins = await fetch(
      "https://api2.binance.com/api/v3/ticker/24hr"
    ).then((res) => res.json());
    //this is temporary they would like to add more coins in the future
    this.coins = this.coins.filter(
      (coin) =>
        coin.symbol === "BTCUSDT" ||
        coin.symbol === "ETHUSDT" ||
        coin.symbol === "ADAUSDT" ||
        coin.symbol === "LTCUSDT" ||
        coin.symbol === "AXSUSDT" ||
        coin.symbol === "BNBUSDT"
    );
  },
};
</script>