<template>
  <div id="header">

    <q-layout-header class="no-shadow">
      <div class="row desktop-only " style="background-image: linear-gradient(to right, #a71100,  #e74d03) !important; color: white; padding: 7px 10% ; font-size: .7em">
        <div class="col-12 text-center">

            <router-link tag="span" to="/busqueda" class="float-right q-ml-md util-link-1" style="cursor: pointer;">
              <q-icon name="fas fa-search util-1"/> 
                <b>Bùsqueda</b> 
            </router-link>

            <div v-if="userData">
              <router-link tag="span" to="/auth/logout" class="float-right q-ml-md util-link-1" style="cursor: pointer;" >
                <q-icon name="fas fa-sign-out-alt util-1"/>
                  <b>Cerrar Sesión</b> 
              </router-link>
            </div>

            <router-link tag="span" :to="userData ? '/perfil' : '/auth/login'" class="float-right q-ml-md util-link-1" style="cursor: pointer;">
              <q-icon name="fas fa-user util-1"/>
                <b>{{userData ? userData.first_name : 'Iniciar Sesión' }}</b> 
            </router-link>

            <router-link tag="span" to="/pqrs" class="float-right q-ml-md util-link-1" style="cursor: pointer;">
              <q-icon name="fas fa-question-circle util-1"/> 
                <b>PQRS</b> 
            </router-link>

        </div>
      </div>

      <div class="row desktop-only" style="min-height: 70px; padding: 25px 10%">
        <div class="col-12 text-center">
            <router-link  to="/inicio">
              <img src="statics/logo.png" class="float-left" id="header-logo">
            </router-link>
<<<<<<< HEAD
            <div class="desktop-only__slide">            
              <router-link tag="a" to="/pedido" class="float-right q-ml-md nav-color desktop-only__slide__card">
                <b> <span>{{cart.total_quantity ? cart.total_quantity : 0}}</span> MI PEDIDO</b>
=======
            <div class="desktop-only__slide">   

              <router-link v-if="domicile" tag="a" to="/pedido" class="float-right q-ml-md nav-color desktop-only__slide__card myorders">
                <b> <span>{{cant}}</span> MI PEDIDO</b>
>>>>>>> a91d8ce673dd05ee7c71ba4959165a01451c3986
              </router-link>

              <a v-else disabled href="javascript:void()" class="float-right q-ml-md nav-color desktop-only__slide__card myorders" style="color: gray!important">
                <b> <span style="background: gray!important">{{cant}}</span> MI PEDIDO</b>
              </a>

              <router-link tag="a" to="/donde-estamos" class="float-right q-ml-md nav-color">
              <b> DONDE ESTAMOS </b>
              </router-link>
              <router-link tag="a" to="/nosotros" class="float-right q-ml-md nav-color">
              <b> NOSOTROS</b>
              </router-link>
              <router-link tag="a" to="/pide-en-linea" class="float-right q-ml-md nav-color">
              <b> PIDE EN LINEA</b>
              </router-link>
              <router-link tag="a" to="/inicio" class="float-right q-ml-md nav-color">
                <b> INICIO </b>
              </router-link>
            </div>
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
  import {helper} from '@imagina/qhelper/_plugins/helper';

  import menuDesktop from '@imagina/qmenu/_components/menu-desktop'
  import menuMobile from '@imagina/qmenu/_components/menu-mobile'
  import informationHeader from 'src/components/master/header/information'
  import searchComponent from '@imagina/qmenu/_components/search'

  import cartService from 'src/services/cart';

  import store from 'src/store/cart/index'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    store,
    props: {},
    components: {
      informationHeader,
      searchComponent,
      menuDesktop,
      menuMobile,
      widgetMenu
    },
    watch: {},
    created(){
      this.$root.$on("sesionStart", this.setData);
      this.$root.$on("updateCart", this.getcart);
      this.$root.$on("deleteItemCart", this.getcart);
    },
    mounted() {
      this.$nextTick(function () {
        this.getcart()
        this.setData()
      })
    },
    data() {
      return {
        leftDrawerOpen: false,
        cant:0,
        cart_id:0,
        userData : false,
        cart: [],
      }
    },
    computed: {
      ...mapState(['domicile'])
    },
    methods: {
      setData(){
        helper.storage.get.item('userData').then(response => {
          this.userData = response
        })
      },
      updateCart(event){
        this.cant = event.products_cant
        this.cart_id = event.id
      },
      deleteItemCart(){
        cartService.show(this.cart_id)
        .then(response=>{
          helper.storage.set('cart_server', response.data)    
          this.cant = response.data.products_cant
        })
      },
      toggleFullscreen() {
        this.$q.fullscreen.toggle()
      },
      getcart(){
        helper.storage.get.item('cart_server').then(res => {
          if (res !== null) {
            this.visible = true
            cartService.show(res.id)
            .then(response=>{
              this.cart = response.data
              this.visible = false
            })
          }
        })
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
    .desktop-only .desktop-only__slide
      display: inline-block;
      width: 100%;
      a
        position: relative
        padding: 0px 0px 0px 1.5rem
        text-decoration: none
        color: #8e7e7d
        font-size: 1.2rem
        @media (max-width: 730px)
          margin: 4px 0px;
        &:hover,
        &.router-link-active
          color: #e64c03
        &:not(:last-child)::before
          content: ''
          position: absolute
          top: -5px
          left: 0
          width: 1px
          height: calc(100% + 10px)
          background-color: #8e7e7d
          z-index: 1000
          transform: rotate(21deg)
          @media (max-width: 730px)
            content: none
        &.desktop-only__slide__card
          color: #ed4400
          span
            color: white
            background-color: #ed4400
            padding: 5px
            border-radius: 50%
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
