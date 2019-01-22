<template>
  <div id="header">

    <q-layout-header class="no-shadow">
      <div class="row desktop-only " style="background-image: linear-gradient(to right, #a71100,  #e74d03) !important; color: white; padding: 7px 10% ; font-size: .7em">
        <div class="col-12 text-center">
            <span class="float-right q-ml-md">
              <q-icon name="fas fa-search util-1"/> 
              <b> BÙSQUEDA</b>
            </span>
            <span class="float-right q-ml-md util-link-1"> 
              <q-icon name="fas fa-user util-1"/>
              <b> INICIAR SESIÒN</b>
            </span>
            <span class="float-right q-ml-md util-link-1"> 
              <q-icon name="fas fa-question-circle util-1"/> 
              <b> PQRS </b>
            </span>
        </div>
      </div>

      <div class="row desktop-only" style="height: 70px; padding: 25px 10%">
        <div class="col-12 text-center">
            <router-link  to="/inicio">
              <img src="statics/logo.png" class="float-left" style="position: absolute; top: 8px; left: 10%; cursor: pointer;">
            </router-link>

            <span class="float-right q-ml-md nav-color" style="cursor: pointer;">
              <router-link tag="span" to="/pedido">
                <b> 10 MI PEDIDO</b>
              </router-link>
            </span>
            <span class="float-right q-ml-md nav-color" style="cursor: pointer;"> 
              <router-link tag="span" to="/donde-estamos">
              <b> DONDE ESTAMOS </b>
              </router-link>
            </span>
            <span class="float-right q-ml-md nav-color" style="cursor: pointer;"> 
              <router-link tag="span" to="/nosotros">
              <b> NOSOTROS</b>
              </router-link>
            </span>
            <span class="float-right q-ml-md nav-color" style="cursor: pointer;"> 
              <router-link tag="span" to="/pide-en-linea">
              <b> PIDE EN LINEA</b>
              </router-link>
            </span>
            <span class="float-right q-ml-md nav-color" style="cursor: pointer;"> 
              <router-link tag="span" to="/inicio">
                <b> INICIO </b>
              </router-link>
            </span>
        </div>
      </div>

      <q-toolbar color="white" :class="this.$q.platform.is.desktop ? 'mobile-only' : 'mobile-only'">
        <!--= BUTTON MENU (mobile-only) =-->
        <q-btn flat dense round
               @click="leftDrawerOpen = !leftDrawerOpen"
               class="btn-menu mobile-only"
               color="primary"
               aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <!--= LOGO (desktop-only) =-->
        <q-toolbar-title :class="$q.platform.is.mobile ? 'text-center' : ''">
          <router-link :to="{ name: 'home'}">
              <img src="statics/logo.png" class="mobile-only q-pt-sm" width="50px"></img>
          </router-link>
        </q-toolbar-title>

        <!--= FULLSCREEN(mobile-only) =-->
        <q-btn flat dense color="primary"
               class="mobile-only"
               :icon="$q.fullscreen.isActive ? 'fas fa-compress' : 'fas fa-expand'"
               @click="toggleFullscreen()"></q-btn>

        <!--= Search(desktop-only) =-->
        <search-component class="mobile-only"></search-component>
      </q-toolbar>

      <!-- ===== MENU(desktop-only) ===== -->
      <!-- ===== <menu-desktop class="desktop-only"></menu-desktop> ===== -->
    </q-layout-header>


    <!-- ========================== DRAEWER LEFT(mobile-only) ======================================== -->
    <q-layout-drawer class="mobile-only"
                     v-model="leftDrawerOpen"
                     :content-class="'bg-grey-2'"
    >
      <div id="dreawerLeft" view="hHh Lpr lFf">
        <q-layout container style="height: 100vh;">
          <q-layout-header class="no-shadow text-center q-py-md bg-white">
            <!-- === LOGO === -->
            <router-link :to="{ name: 'home'}">
              <img src="statics/logo.png" width="60%"></img>
            </router-link>
          </q-layout-header>

          <q-page-container>
            <!--= MENU MOBILE =-->
            <widget-menu></widget-menu>
          </q-page-container>

          <q-layout-footer id="footer" class="no-shadow bg-white">
            <!--= Information =-->
            <information-header></information-header>
          </q-layout-footer>
        </q-layout>
      </div>
    </q-layout-drawer>
  </div>
</template>


<script>
  import widgetMenu from "src/components/menu/widget-menu";

  import menuDesktop from '@imagina/qmenu/_components/menu-desktop'
  import menuMobile from '@imagina/qmenu/_components/menu-mobile'
  import informationHeader from 'src/components/master/header/information'
  import searchComponent from '@imagina/qmenu/_components/search'

  export default {
    props: {},
    components: {
      informationHeader,
      searchComponent,
      menuDesktop,
      menuMobile,
      widgetMenu
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        leftDrawerOpen: false,
      }
    },
    methods: {
      toggleFullscreen() {
        this.$q.fullscreen.toggle()
      },
    }

  }
</script>

<style lang="stylus">
  @import "~variables";
  #header
    .btn-menu
      i
        font-size 30px

  #dreawerLeft
    .q-layout-header
      min-height auto
      height auto

  .util-1
    color: #ffc926; font-size: 15px
    padding-right 8px

  .util-link-1
    position: relative    
    padding-right 15px

  .util-link-1::after
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-right 1px #ffc926 solid
    transform: skew(-15deg);

  .nav-color
    color #8e7e7d

  .nav-color::after
    border-right 1px #8e7e7d solid

   

</style>
