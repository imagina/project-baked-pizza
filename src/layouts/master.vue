<template>
  <div>
  <q-layout :view="$q.platform.is.desktop ? 'lhh Lpr lfr' : 'lHh Lpr lfr'" v-show="!loading">
    <!--=== HEADER ===-->
    <header-component></header-component>

    <!--=== ROUTER VIEW ===-->
    <q-page-container style="background: #f4f4f4;">
      <router-view  />
    </q-page-container>

    <!--=== FOOTER ===-->
    <footer-component></footer-component>

    <!--=== BACK TO TOP ===-->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-back-to-top.animate="{offset: 500, duration: 200}"
        round
        color="red"
        icon="keyboard_arrow_up"
      />
    </q-page-sticky>

  </q-layout>

  <q-inner-loading :visible="loading" style="position: fixed; background: #fff; z-index: 10000; ">
    <q-spinner-puff size="50px" color="red"></q-spinner-puff>
  </q-inner-loading>

  </div>
</template>

<script>
  import headerComponent from 'src/components/master/header/header'
  import footerComponent from 'src/components/master/footer/footer'

  export default {
    components: {
      headerComponent,
      footerComponent
    },
    mounted() {
      this.$nextTick(function () {
        
      })
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      loadinghide: function (){
        setTimeout(() => { 
          this.loading = false
        }, 3000);
      }
    }
  }
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz')
  @import url('https://fonts.googleapis.com/css?family=Muli')
  @import "~variables";
  body
    font-family: 'Yanone Kaffeesatz', sans-serif;

</style>
