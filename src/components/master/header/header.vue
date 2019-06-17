<template>
  <div id="headerComponent">
    <q-layout-header class="no-shadow">
      <search v-model="modalSearch"/>
      <div class="row desktop-only nav-aux">
        <div class="col-12 text-right">
          <div class="q-container">
            <router-link
              tag="a"
              to=""
              @click.native="goToFooter()"
              class="secondary-font link-menu">
              <q-icon name="fas fa-question-circle util-1"/>
              PQRS
            </router-link>
            <router-link
              tag="a"
              :to=" userData ? '/users/me/profile' :'/auth/login'"
              class="secondary-font link-menu">
              <q-icon name="fas fa-user util-1"/>
              {{userData ? (userData.fullName).toUpperCase() : 'INICIAR SESIÓN'}}
            </router-link>
            
            <router-link
              tag="a"
              to="/orders"
              v-if="userData"
              class="secondary-font link-menu">
              <q-icon name="fas fa-cubes util-1"/>
              PEDIDOS
            </router-link>
            <router-link
              tag="a"
              to=""
              @click.native="modalSearch=true"
              class="secondary-font link-menu">
              <q-icon name="fas fa-search util-1"/>
              BÚSQUEDA
            </router-link>
            <router-link
              tag="a"
              to=""
              v-if="userData"
              @click.native="logout"
              class="secondary-font link-menu">
              <q-icon name="fas fa-sign-out-alt util-1"/>
              SALIR
            </router-link>
          </div>
        </div>
      </div>

      <div class="row desktop-only nav-desktop">
        <div class="col-12">
          <div class="q-container">
            <router-link tag="a" class="relative-position" :to="{name: 'app.home'}">
              <img src="statics/logo.png" id="header-logo">
            </router-link>

            <div class="desktop-only__slide text-right">
              <router-link
                tag="a"
                to="/inicio"
                class="q-ml-md nav-color">
                Inicio
              </router-link>
              <router-link
                tag="a"
                to="/products/pizzas"
                class="q-ml-md nav-color">
                Pide en Línea
              </router-link>
              <router-link
                tag="a"
                to="/nosotros"
                class="q-ml-md nav-color">
                Nosotros
              </router-link>
              <router-link
                tag="a"
                to="/donde-estamos"
                class="q-ml-md nav-color">
                ¿Dónde Estamos?
              </router-link>
              <router-link
                tag="a"
                :to="{name:'shopping.cart.index'}"
                class="q-ml-md nav-color desktop-only__slide__card text-blue-10">
                <q-chip color="secondary" class="q-mr-xs" small>
                  {{numProductsCart}}
                </q-chip>
                Mi Pedido
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <q-toolbar
        color="white"
        :class="this.$q.platform.is.desktop ? 'mobile-only' : 'mobile-only'">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="btn-menu mobile-only"
          color="primary"
          aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title :class="$q.platform.is.mobile ? 'text-center' : ''">
        </q-toolbar-title>
        <search-component class="mobile-only"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      class="mobile-only"
      v-model="leftDrawerOpen"
      :content-class="'bg-grey-2'">

      <div id="dreawerLeft" view="hHh Lpr lFf">
        <q-layout container style="height: 100vh;">
          <q-layout-header class="no-shadow text-center q-py-md bg-white">
            <router-link :to="{ name: 'app.home'}">
              <img src="statics/logo.png"/>
            </router-link>
          </q-layout-header>
          <q-page-container>
            <widget-menu/>
          </q-page-container>

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
  import search from "@imagina/qcommerce/_components/frontend/search";
  
  import cartService from 'src/services/cart';

  //import store from 'src/store/cart/index'
  //import { mapState, mapGetters, mapActions } from 'vuex'
  //import EventBus from 'src/utils/event-bus'

  export default {

    components: {
      informationHeader,
      searchComponent,
      menuDesktop,
      menuMobile,
      widgetMenu,
      search
    },
    created() {
      this.$root.$on("sesionStart", this.setData);
      this.$root.$on("updateCart", this.getcart);
      this.$root.$on("deleteItemCart", this.getcart);
      this.$root.$on("logout", this.handleLogout);

      //EventBus.$on('getcart',() => {
      //  this.cart.total_quantity = 0
      //})

    },
    mounted() {
      this.$nextTick(function () {
        this.getcart()
        this.setData()
      })
    },
    data() {
      return {
        modalSearch: false,
        leftDrawerOpen: false,
        cant: 0,
        cart_id: 0,
        userData: false,
        cart: [],
      }
    },
    computed: {
      //...mapState(['domicile','validaddress'])
      numProductsCart() {
        let products = this.$store.state.shoppingCart.cart.products
        if (products && products.length) return products.length
        else return 0
      }
    },
    methods: {
      setData() {
        helper.storage.get.item('userData').then(response => {
          this.userData = response
        })
      },
      updateCart(event) {
        this.cant = event.products_cant
        this.cart_id = event.id
      },
      deleteItemCart() {
        cartService.show(this.cart_id)
          .then(response => {
            helper.storage.set('cart_server', response.data)
            this.cant = response.data.products_cant
          })
      },
      toggleFullscreen() {
        this.$q.fullscreen.toggle()
      },
      getcart() {
        helper.storage.get.item('cart_server').then(res => {
          if (res !== null) {
            this.visible = true
            cartService.show(res.id)
              .then(response => {
                this.cart = response.data
                this.visible = false
              })
          }
        })
      },
      goToFooter(){
        var elmnt = document.getElementById("footerMaster");
        elmnt.scrollIntoView();
      },
      handleLogout(e) {
        console.log(e)
        if (e) {
          location.reload();
        }

      },
      async logout(){
        await this.$store.dispatch("auth/AUTH_LOGOUT")
        this.setData()
      }
    }

  }
</script>

<style lang="stylus">
  @import "~variables";
  #headerComponent
    .link-menu
      position relative
      font-size 14px
      color white
      padding 0px 15px
      font-weight bold

      .q-icon
        color $secondary
        margin-right 4px

      &::before
        content ''
        position absolute
        top 0
        left 0
        width 1px
        height 100%
        border-left 1px $secondary solid
        transform skew(-15deg)

      &:first-child
        &::before
          border 0px

      &:last-child
        padding-right 0px

    .nav-desktop
      min-height 70px !important

      a
        font-size 24px
        padding 20px 15px


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
        @media (max-width: 730px)
          margin: 4px 0px;

        &:hover,
        &.router-link-active
          color: #e64c03

        &::before
          content: ''
          position: absolute
          top: 0
          left: 0
          width: 1px
          height: 100%
          background-color: #8e7e7d
          z-index: 1000
          transform: rotate(18deg)
          @media (max-width: 730px)
            content: none

        &:first-child
          &::before
            border 0px

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

  .nav-color
    color #8e7e7d

  .nav-color::after
    border-right 1px #8e7e7d solid

  .nav-aux
    background-image: linear-gradient(to right, #a71100, #e74d03) !important;
    color: white;
    padding: 7px;
    font-size: .7em

  #header-logo
    position: absolute;
    top: -5px;
    left: 0;
    cursor: pointer;


</style>
