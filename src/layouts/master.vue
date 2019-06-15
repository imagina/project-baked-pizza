<template>
  <q-layout :view="$q.platform.is.desktop ? 'lhh Lpr lfr' : 'lHh Lpr lfr'"
            v-if="$store.state.app.active && loadedApp">
    <!-- HEADER -->
    <master-header></master-header>

    <!-- ROUTER VIEW -->
    <q-page-container style="padding-bottom: 0px;">
      <router-view v-if="loadedApp"/>
    </q-page-container>

    <!-- FOOTER -->
    <master-footer></master-footer>
  </q-layout>
</template>

<script>
  /*Components*/
  import masterHeader from 'src/components/master/header/header'
  import masterFooter from 'src/components/master/footer/footer'

  //Services
  import appServices from 'src/services/application/index'

  export default {
    meta() {
      let siteName = this.$store.getters['site/getSettingValueByName']('core::site-name')
      let iconHref = this.$store.getters['site/getSettingMediaByName']('isite::favicon').path
      return {
        title: siteName,
        link: [{rel: 'icon', href: iconHref, id: 'icon'}],
      }
    },
    components: {
      masterHeader,
      masterFooter
    },
    watch: {
      $route(to, from) {
        this.checkVersionApp(to)
      }
    },
    mounted() {
      this.$nextTick(async function () {
        //Call to config when is mounted
        let params = this.$route.params
        if (!this.$route.params.fromConfig)
          this.$router.push({name: 'app.config'})
        this.loadedApp = true//Load route view
      })
    },
    data() {
      return {
        loadedApp: false
      }
    },
    computed: {
      showApp() {
        return this.$store.state.app.show
      },
    },
    methods: {
      isInStandaloneMode() {
        (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone);
      },

      //Check if app is update
      checkVersionApp(toRoute) {
        if (toRoute.name != 'config') {
          let currentVersion = parseInt(config('app.version').split('.').join(''))
          appServices.crud.index('apiRoutes.site.appVersion', {remember: false}).then(response => {
            let version = parseInt(response.data.split('.').join(''))
            if (currentVersion < version) {
              this.$router.push({name: 'app.config'})
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
</style>
