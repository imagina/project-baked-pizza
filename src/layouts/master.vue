<template>
  <div>
    <q-layout 
      :view="$q.platform.is.desktop ? 'lhh Lpr lfr' : 'lHh Lpr lfr'" 
      v-show="!loading">
      <header-component/>
      <q-page-container style="background: #FFFFFF; padding-bottom: 0px;">
        <router-view />
      </q-page-container>
      <footer-component/>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          v-back-to-top.animate="{offset: 500, duration: 200}"
          round
          color="primary"
          icon="keyboard_arrow_up"/>
      </q-page-sticky>
    </q-layout>
  </div>
</template>

<script>
  import headerComponent from 'src/components/master/header/header'
  import footerComponent from 'src/components/master/footer/footer'
  import {helper} from '@imagina/qhelper/_plugins/helper'

  export default {
    components: {
      headerComponent,
      footerComponent
    },
    mounted() {
      this.$nextTick(function () {
        this.chekcart()
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
      },
      chekcart(){
        helper.storage.get.item('cart').then(res => {
          if (res !== null) {
            this.$store.dispatch("init_cart", res.items)
          }
        })
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
