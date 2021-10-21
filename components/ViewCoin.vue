<template>
  <v-col md="9">
    <v-card elevation="10" class="text-center">
      <!-- Hide card while loading -->
      <v-card-text v-if="!loading">
        <!-- Coin name title -->
        <p class="text-h3 text--primary">
          {{ coin.symbol }}
        </p>
        <!-- Coin data details -->
        <v-col class="columns">
          <div class="text--primary ma-5">
            <h2>Price Change: {{ coin.priceChange }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Price Change Percent: {{ coin.priceChangePercent }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Weighted Average Price: {{ coin.weightedAvgPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Previous Close Price: {{ coin.prevClosePrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>LastPrice: {{ coin.lastPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Last Quantity: {{ coin.lastQty }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Bid Price: {{ coin.bidPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Bid Quantity: {{ coin.bidQty }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Ask Price: {{ coin.askPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Ask Quantity: {{ coin.askQty }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Open Price: {{ coin.openPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>High Price: {{ coin.highPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Low Price: {{ coin.lowPrice }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Volume: {{ coin.volume }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Quote Volume: {{ coin.quoteVolume }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Open Time: {{ coin.openTime }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Close Time : {{ coin.closeTime }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>First Id: {{ coin.firstId }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Last Id: {{ coin.lastId }}</h2>
          </div>
          <div class="text--primary ma-5">
            <h2>Count: {{ coin.count }}</h2>
          </div>
        </v-col>
      </v-card-text>
      <!-- Loading animation when fetch -->
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="teal accent-4"
      ></v-progress-linear>      
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      coin: [],
      loading: true,
    };
  },
  async fetch() {
    this.coin = await fetch(
      "https://api2.binance.com/api/v3/ticker/24hr?symbol=" +
        this.$route.query.symbol
    ).then((res) => res.json());
    this.loading = false;
  },
};
</script>

<style>
.columns {
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
}
</style>