<template>
  
  <q-layout-footer id="footer" class="no-shadow" style="border-top: 9px solid #EC3800; background: url('statics/footer.jpg'); filter: contrast(110%);">
    <div class="flex flex-center">
      <img src="statics/logo.png" class="desktop-only" style="position: absolute; top: -70px;" >
    </div>

    <div class="row">
      <div class="col-12 q-mt-lg">
       <div class="flex flex-center text-white">

          <div class="flex flex-center text-white q-pt-lg">
            <i class="fab fa-facebook-f q-px-md hover-icon"></i>
            <i class="fab fa-twitter q-px-md hover-icon"></i>
            <i class="fab fa-instagram q-px-md hover-icon"></i>
            <i class="fab fa-google-plus-g q-px-md hover-icon"></i>
            <i class="fab fa-linkedin-in q-px-md hover-icon"></i>
          </div>

        </div>
      </div>
    </div>

    <div class="row q-pb-lg " style="border-bottom: 1px solid #dddddd82 ; margin: 0 8%">
      <div class="col-12 q-mt-lg">
        <div class="flex flex-center text-white">
          <span class="q-px-lg">
            <span class="baked-icon-color"><i class="fab fa-whatsapp"></i> (+57)</span>
             300-000-0000
          </span>
          <span class="q-px-lg">
            <span class="baked-icon-color"><i class="fas fa-envelope"></i> </span>
            info@bakedpizza.com.co
          </span>
          <span class="q-px-lg">
            <span class="baked-icon-color"><i class="material-icons"> phone </i> </span>
            4515624 / 4810127
          </span>
        </div>
      </div>
    </div>

    <!--=== INFORMACION ===-->
    <!--===<information-footer></information-footer> ===-->
    <!--=== COPYRIGHT ===-->
    <div class="copyright q-py-sm q-px-lg" >
      <div :class="'row '+($q.platform.is.desktop ? 'q-container' : '')">
        <div class="col-xs-12 col-md-4" align="center">
          <logo-imagina></logo-imagina>
        </div>
        <div class="col-xs-12 col-md-4 q-pt-lg" align="center">
          © Baked Pizza. Todos los Derechos Reservados.
        </div>
        <div class="col-xs-12 col-md-4" align="center">
          <img src="statics/cards.png">
        </div>
      </div>
    </div>
  </q-layout-footer>
</template>
<script>
  /*Components*/
  import informationFooter from 'src/components/master/footer/information'
  import logoImagina from 'src/components/master/footer/imaginaSVG'

  export default {
    props: {},
    components: {
      informationFooter,
      logoImagina
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}

  }
</script>
<style lang="stylus">
  @import "~variables";
  #footer
    color #DDDDDD !important
    .copyright
      min-height 74px
      font-size 12px
      padding 18px
      svg
        fill #DDDDDD
  .title-uno
    font-size 2.6em    

  .baked-icon-color
    color #EC3800


  .hover-icon
    transition all .2s
    &:hover
      color #EC3800

</style>
