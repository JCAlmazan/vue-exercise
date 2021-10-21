<template>
  <v-col md="9">
    <v-card elevation="10">
      <v-card-title>
        Cryptocurrencies
        <v-spacer></v-spacer>
        <v-text-field @keyup.enter="addCoin" label="Add Coin"></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Coin"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="coins"
        sort-by="symbol"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2"> mdi-eye </v-icon>
          <v-icon small @click="removeCoin(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-progress-linear
            color="teal accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </template>
      </v-data-table>
      <v-btn
        color="teal"
        class="ma-2 white--text"
        absolute
        bottom
        left
        fab
        @click="refresh"
        :loading="loading"
        :disabled="loading"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card>
  </v-col>
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      coins: [],
      list: this.$store.state.coins.list,
      loading: false,
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
    //filter all api coins with our local storage list of coins
    this.coins = this.coins.filter((coin) => this.list.includes(coin.symbol));
  },
  methods: {
    addCoin(e) {
      this.$store.commit("coins/add", e.target.value);
      e.target.value = "";
      this.$fetch();
    },
    removeCoin(coin) {
      this.$store.commit("coins/remove", coin);
      this.$fetch();
      this.loading = true;
    },
    refresh(){
      this.$fetch();
      this.loading = true;
    },
  },
  watch: {
    loading(val) {
      if (!val) return

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>