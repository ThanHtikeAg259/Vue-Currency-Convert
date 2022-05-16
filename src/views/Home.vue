<template>
  <div>
    <div class="container mt-5">
      <loading :active="isLoading" :can-cancel="true" :is-full-page="fullPage" :color="color"/>
      <div class="card">
        <img src="../assets/exchange-rate.png" class="d-block mx-auto" alt="">
        <div class="row justify-content-center mt-3">
          <p class="font-weight-bold col-8">From</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-4">
            <input type="number" class="form-control col ctrl-h" v-model="first_exchange" @input="convert()">
          </div>
          <div class="col-4">
            <multiselect v-model="first_currency" :options=this.options :custom-label="customLabel" :show-labels="false"
              @input="apiCall()">
              <template slot="singleLabel" slot-scope="props"><img class="option__image" :src="props.option.img"><span
                  class="option__desc"><span
                    class="option__title">&nbsp;&nbsp;{{ props.option.title }}</span></span></template>
              <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img">
                <span class="option__title">&nbsp;&nbsp;{{ props.option.title }}</span>
              </template>
            </multiselect>
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
            <input type="number" class="form-control col ctrl-h" v-model="second_exchange" @input="reConvert()">
          </div>
          <div class="col-4">
            <multiselect v-model="second_currency" :options=this.options :custom-label="customLabel"
              :show-labels="false">
              <template slot="singleLabel" slot-scope="props"><img class="option__image" :src="props.option.img"><span
                  class="option__desc"><span
                    class="option__title">&nbsp;&nbsp;{{ props.option.title }}</span></span></template>
              <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img">
                <span class="option__title">&nbsp;&nbsp;{{ props.option.title }}</span>
              </template>
            </multiselect>
          </div>
        </div>
        <div class="row justify-content-center mt-3">
          <h5 class="display-5">
            {{currency_map.conversion_rates[this.first_currency.title]}} {{this.first_currency.title}}
            <country-flag :country=this.first_currency.title.slice(0,-1).toLowerCase() size='normal' />&nbsp; =
            {{currency_map.conversion_rates[this.second_currency.title]}} {{this.second_currency.title}}
            <country-flag :country=this.second_currency.title.slice(0,-1).toLowerCase() size='normal' />
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
  import Multiselect from 'vue-multiselect'
  import Loading from 'vue-loading-overlay';
  export default {
    components: {
      CountryFlag,
      Multiselect,
      Loading,
    },

    data() {
      return {
        first_currency: {
          title: "USD",
          img: "https://www.countryflagicons.com/FLAT/32/US.png"
        },
        second_currency: {
          title: "MMK",
          img: "https://www.countryflagicons.com/FLAT/32/MM.png"
        },
        first_exchange: 0,
        second_exchange: 0,
        isLoading: false,
        fullPage: true,
        color: "#e8e117",
      }
    },

    mounted() {
      this.$store.dispatch('getCountry');
      this.$store.dispatch('getCurrency', this.first_currency.title);
    },

    methods: {
      customLabel({
        title,
        desc
      }) {
        return `${title} – ${desc}`
      },
      apiCall() {
        this.$store.dispatch('getCurrency', this.first_currency.title);
        this.isLoading = true;
        setTimeout(() => {
          this.convert();
          this.isLoading = false
        }, 350)
      },
      convert() {
        console.log("ok");
        this.second_exchange = this.first_exchange * this.currency_map.conversion_rates[this.second_currency.title];
      },
      reConvert() {
        this.first_exchange = this.second_exchange / this.currency_map.conversion_rates[this.second_currency.title];
      },
      swapOptions() {
        const temp = {
          title: this.first_currency.title,
          img: this.first_currency.img,
        };
        this.first_currency.title = this.second_currency.title;
        this.first_currency.img = this.second_currency.img;
        this.second_currency.title = temp.title;
        this.second_currency.img = temp.img;
      },
      switchConvert() {
        this.swapOptions();
        this.$store.dispatch('getCurrency', this.first_currency.title);
        this.isLoading = true;
        setTimeout(() => {
          this.convert();
          this.isLoading = false
        }, 1000)
      }
    },

    computed: {
      ...mapState({
        currency_map: (state) => state.currency,
        country_map: (state) => state.country,
        options: (state) => state.options,
      })
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .h-30 {
    display: block;
    height: 30px;
  }

  .ctrl-h {
    height: calc(2em + 1rem + 2px) !important;
    border: 1px solid #e5e9ed !important;
  }
</style>