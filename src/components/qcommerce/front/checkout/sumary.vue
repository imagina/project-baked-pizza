<template>
  <div id="shoppingCartIndex" class="q-container">
    
    <div class="backend-page relative-position">
      <div class="row gutter-x-sm">
        <div class="col-12">
       
            <q-list no-border class="q-pa-none ">
              <q-list-header class="q-pa-none q-headline">
                Total
              </q-list-header>
              <q-item class="q-pa-none">
                <q-item-main label="TOTAL" class="q-subheading"/>
                <q-item-side right>
                  <p class="q-ma-none text-primary">
                    $ {{ $store.state.shoppingCart.cart.total ? $n($store.state.shoppingCart.cart.total) : '0'}}
                  </p>
                </q-item-side>
              </q-item>
            </q-list>
          
        </div>
      </div>
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
  //Components
  import innerLoading from 'src/components/master/innerLoading'
  //Services
  import icommerceService from '@imagina/qcommerce/_services/index';
 

  export default {
    props: {
      simple: {
        type: Boolean,
        default: false
      },
    },
    components: {innerLoading},
    data() {
      return {        
        loading: true,
        cart: false,
      }
    },
    mounted() {
      this.getCart()
    },
    methods: {
      async getCart() {
        this.loading = true
        await this.$store.dispatch('shoppingCart/GET_CART', true)
        this.cart = this.$store.state.shoppingCart.cart
        this.$root.$emit('updateCart')
        this.loading = false
      },
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #shoppingCartIndex
    .q-table
      .content-btn-delete
        position absolute
        top 5px
        left 0
      .img-product
        height 150px
        width 150px
        background-position center
        background-repeat no-repeat
        background-size cover
        margin 0 auto

      .option-content
        margin-right 15px
        .option-title
          color $grey-10
          font-weight bold
          font-size 16px
        .value-title
          color $grey-8
</style>
