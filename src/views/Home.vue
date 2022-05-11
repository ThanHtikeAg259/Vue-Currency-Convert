<template>
  <div>
    <div class="container mt-5">
      <div class="card">
        <img src="../assets/exchange-rate.png" class="d-block mx-auto" alt="">
        <div class="row justify-content-center mt-3">
          <p class="font-weight-bold col-8">From</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-4">
            <input type="number" class="form-control col" v-model="first_exchange" @change="convert()">
          </div>
          <div class="col-4">
            <select class="form-control" v-model="first_currency" @change="apiCall()">
              <option v-for="(item, index) in country_map[0]" :value="item" :key="index">{{item}}</option>
            </select>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <button class="btn btn-light" @click="switchConvert()">
            <img src="../assets/up-and-down-arrows.png" class="h-30">
          </button>
        </div>
        <div class="row justify-content-center">
          <p class="font-weight-bold col-8">To</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-4">
            <input type="number" class="form-control col" v-model="second_exchange" @change="reConvert()">
          </div>
          <div class="col-4">
            <select class="form-control" v-model="second_currency" @change="changeFlag()">
              <option v-for="(item, index) in country_map[0]" :value="item" :key="index" class="s-img">
                {{item}}
              </option>
            </select>
          </div>
        </div>
        <div class="row justify-content-center mt-3">
          <h5 class="display-5">
            {{currency_map.conversion_rates[this.first_currency]}} {{this.first_currency}}
            <country-flag :country=this.first_flag size='normal' />&nbsp; =
            {{currency_map.conversion_rates[this.second_currency]}} {{this.second_currency}}
            <country-flag :country=this.first_flag size='normal' />
          </h5>
        </div>
        <div class="row justify-content-center mt-3">
          <h6 class="d-block">
            Last Updated On:
            {{currency_map.time_last_update_utc.slice(0, currency_map.time_last_update_utc.length-15)}}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import CountryFlag from 'vue-country-flag'
  export default {
    components: {
      CountryFlag
    },

    data() {
      return {
        first_currency: "USD",
        second_currency: "MMK",
        first_exchange: 0,
        second_exchange: 0,
        first_flag: "us",
      }
    },

    // watch: {
    //   first_exchange(val) {
    //     console.log("val:", val);
    //   }
    // },

    mounted() {
      this.$store.dispatch('getCountry');
      this.$store.dispatch('getCurrency', this.first_currency);
    },

    methods: {
      changeFlag() {
      },
      justTest() {
        console.log("dr ka function htl ka:", this.currency_map);
      },
      apiCall() {
        this.$store.dispatch('getCurrency', this.first_currency);
        let just_store = this.currency_map.conversion_rates["MMK"];
        console.log("just store:", just_store);
      },
      convert() {
        console.log("FROM convert function: ", this.currency_map.conversion_rates[this.second_currency]);
        this.second_exchange = this.first_exchange * this.currency_map.conversion_rates[this.second_currency];
      },
      reConvert() {
        this.first_exchange = this.second_exchange / this.currency_map.conversion_rates[this.second_currency];
      },
      async switchConvert() {
        const temp = this.first_currency;
        this.first_currency = this.second_currency;
        this.second_currency = temp;
        console.log("1st:", this.first_currency);
        console.log("2nd:", this.second_currency);
        const res = await this.$store.dispatch('getCurrency', this.first_currency);
        console.log("await: ", res);
        console.log("ggwp:", this.$store.state.currency);
        this.convert();
      }
    },

    computed: {
      ...mapState({
        currency_map: (state) => state.currency,
        country_map: (state) => state.country,
      })
    }
  }
</script>

<style>
  .h-30 {
    display: block;
    height: 30px;
  }
</style>