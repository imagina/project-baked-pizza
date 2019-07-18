<template>
  <div id="addCartOptions" class="relative-position">
    <!--Select Options Product -->
    <productOptionValues v-model="template.productOptions" :additional-price="additionalPrice"
                         :options="template.options" @input="updateTotal"/>
    <!--Summary-->
    <q-list no-border class="backend-page">
      <!--Quantity-->
      <q-item class="q-pa-none input-quantity">
        <q-item-main label="CANTIDAD" class="q-title"/>
        <q-item-side right>
          <div class="q-my-sm">
            <select-quantity v-model="template.quantity"/>
          </div>
        </q-item-side>
      </q-item>
      <!--Price-->
      <q-item class="q-pa-none" v-if="additionalPrice">
        <q-item-main label="PRECIO" class="q-subheading"/>
        <q-item-side right>
          <p class="q-ma-none text-primary q-subheading">
            $ {{$n(price) }}
          </p>
        </q-item-side>
      </q-item>
      <!--Price Additional-->
      <q-item class="q-pa-none" v-if="additionalPrice">
        <q-item-main label="ADICIONAL" class="q-subheading"/>
        <q-item-side right>
          <p class="q-ma-none text-primary q-subheading">
            $ {{$n(template.productOptions.total) }}
          </p>
        </q-item-side>
      </q-item>
      <!--Total-->
      <q-item class="q-pa-none">
        <q-item-main label="TOTAL" class="q-title"/>
        <q-item-side right>
          <p class="q-ma-none text-primary">
            $ {{$n(template.total * template.quantity) }}
          </p>
        </q-item-side>
      </q-item>
      
      <!--Add to cart-->
      <q-item class="text-center q-pb-none" v-if="scheduleAvaliable">
        <q-item-main>
          <q-btn @click="addCart()" icon="shopping_cart"
                 label="AÑADIR" color="positive"
                 :disable="addCartDisable"/>
        </q-item-main>
      </q-item>
      <q-item class="text-center q-pb-none q-mt-md" v-else>
        <q-item-main>
          <q-alert color="white" class="shadow-none q-title">
            <p>Horarios</p>
            <p align="justify">
              Domicilio: <br>
              Lunes, Martes, Miércoles, Jueves, Viernes de 1PM a 9.45PM <br>
              Sábados, Domingos, y Festivos de 12.30PM a 9:45PM <br>
            </p>
            <p align="justify">
              Recoger en Tienda: <br>
              Todos los días desde las 2PM hasta las 9.45PM <br>
            </p>
          </q-alert>
        </q-item-main>
      </q-item>
    </q-list>
    
    <!--Loading-->
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'

  // SERVICES
  import commerceServices from '@imagina/qcommerce/_services/index'

  // COMPONENTS
  import innerLoading from 'src/components/master/innerLoading'
  import productOptionValues from '@imagina/qcommerce/_components/frontend/products/widgets/selectOptionsProduct'
  import selectQuantity from '@imagina/qcommerce/_components/selectQuantity'

  import {helper} from '@imagina/qhelper/_plugins/helper'

  export default {
    name: 'productOptions',
    props: {
      price: {default: 0},
      productId: {default: false},
      addCartDisable: {type: Boolean, default: false},
      additionalPrice: {default: true}
    },
    components: {
      innerLoading,
      productOptionValues,
      selectQuantity
    },
    watch: {
      productId() {
        this.init()
      }
    },
    data() {
      return {
        loading: false,
        template: {
          productOptions: {},
          quantity: 1,
          total: 0,
          options: [],
        },
        schedules:{
          status: {
            shipping: {
              status: true,
              message: "",
              schedule: {
                from: "",
                to: ""
              }
            },
            pickup: {
              status: true,
              message: "",
              schedule: {
                from: "",
                to: ""
              }
            }
          },
          schedules: {}
        },
        validatedAddress:{
          typeOrder:false,
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    computed: {
      initData() {
        return {
          loading: false,
          productOptions: {},
          quantity: 1,
          total: 0,
          options: [],
        }
      },
      updateTotal() {
        if (this.template.productOptions) {
          let optionsTotal = _cloneDeep(this.template.productOptions.total)
          this.template.total = parseInt(this.price) + parseInt(optionsTotal)
        }
      },
      scheduleAvaliable(){
        if (this.validatedAddress.typeOrder){
          return this.schedules.status.shipping.status
        } else {
          return this.schedules.status.pickup.status
        }
      }
    },
    methods: {
      //Init
      init() {
        this.template = _cloneDeep(this.initData)
        this.template.total = parseInt(this.price)//Add total of product
        this.getOptions()//Get options
        this.getSchedules()
        this.getValidateAddress()
      },
      //Get options
      getOptions() {
        this.loading = true
        //Params
        let params = {
          refresh: true,
          params: {
            filter: {
              productId: this.productId
            },
            include: 'productOptionValues'
          }
        }
        //Request
        commerceServices.crud.index('apiRoutes.eCommerce.productOptions', params).then(response => {
          this.template.options = this.$helper.array.builTree(response.data)
          this.loading = false
        }).catch(error => {
          console.error(error)
          this.loading = false
        })
      },
      //Add product to cart
      async addCart() {
        if (!this.template.productOptions.required) {
          this.loading = true
          let formData = {
            productId: this.productId,
            quantity: this.template.quantity,
            productOptionValues: this.template.productOptions.options,
            price: this.template.total,
          }

          this.$store.dispatch('shoppingCart/SET_PRODUCT_INTO_CART', formData).then(response => {
            this.$q.dialog({
              title: 'Producto agregado al carrito!',
              color: 'positive',
              ok: 'Ir al carrito',
              cancel: 'Seguir comprando'
            }).then(async data => {
              this.$router.push({name: 'shopping.cart.index'})
            }).catch(() => {
              this.init()
              this.loading = false
            })
          }).catch(error => {
            this.$helper.alert.error(error)
            console.error('[add to cart option]', error)
            this.loading = false
          })
        }else this.$helper.alert.error('Faltan opciones requeridas por definir','bottom')
      },

      getSchedules(){
        let criteria = 1
        let params = {
          refresh: true
        }
        commerceServices.crud.show('apiRoutes.eCommerce.schedules', criteria, params)
          .then(response => {
            this.schedules = response.data
          })
          .catch(error => {
            console.warn(error)
          })
      },
      getValidateAddress(){
        helper.storage.get.item('dataAddress').then(res => {
          console.warn(res)
          if (res != null) {
            this.validatedAddress = res
          }else{
            this.validatedAddress = {}
          }
        })
      }

    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #addCartOptions
    .q-list
      padding 0
  
        .q-item
          padding 4px 0
          max-height max-content
          min-height auto
</style>