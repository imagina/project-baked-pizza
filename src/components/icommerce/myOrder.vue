<template>
	<div class="row relative-position">
		<div class="col-md-12" style="border: 2px grey dashed">
			<div class="text-center q-display-1 color-baked-title q-mb-sm">
				MI PEDIDO
			</div>
			
			<p class="q-mx-sm">
				Envio para {{address.form.typeStreet}} {{address.form.street}} {{address.form.number1}} {{address.form.number1}}
			</p>
			
			<q-list no-border v-if="cart.products && cart.products.length">
				<q-item
					v-for="(product, index) in cart.products"
					:key="index">
					<q-item-main>
						<q-item-tile label class="q-title color-baked-title">{{product.name}}</q-item-tile>
						<q-item-tile label>
							<div v-if="product.productOptionValues && product.productOptionValues.length">
								<div class="inline-block option-content q-ml-sm" :key="key"
								     v-for="(option, key) in product.productOptionValues">
									<!--Option title-->
									<div class="option-title">{{option.option}}</div>
									<!--Value title-->
									<div class="value-title ">
										<q-icon name="fas fa-caret-right" />
										{{option.optionValue}}
									</div>
								</div>
							</div>
							
						</q-item-tile>
					</q-item-main>
					<q-item-side right>
						<span class="color-baked-subtitle">
							{{$n(product.total) | money }}
						</span>
					</q-item-side>
				</q-item>
				
				<q-item-separator inset class="q-mx-md bg-grey-5" />
				
				<!--envio-->
				<q-item>
					<q-item-main>
						<q-item-tile label class="q-title color-baked-subtitle">
							Envío
						</q-item-tile>
					</q-item-main>
					<q-item-side right>
						<span class="color-baked-subtitle">
							${{$n(priceShipping)}}
						</span>
					</q-item-side>
				</q-item>
				<!--total-->
				<q-item>
					<q-item-main>
						<q-item-tile label class="q-title color-baked-subtitle text-bold">
							Total
						</q-item-tile>
					</q-item-main>
					<q-item-side right>
						<span class="color-baked-subtitle text-bold">
							$ {{ cart.total ? $n(cart.total + parseInt(priceShipping)) : '0'}}
						</span>
					</q-item-side>
				</q-item>
			</q-list>
			
			<div class="text-center q-mb-sm" >
				<q-btn color="green" rounded size="md" :to="{name: 'checkout.index'}">
					Continuar
				</q-btn>
			</div>
			
		</div>
		<inner-loading :visible="loading"/>
	</div>
</template>

<script>
  import {helper} from "@imagina/qhelper/_plugins/helper";
  import innerLoading from 'src/components/master/innerLoading'

  export default {
    name: "myOrder",
	  components:{
      innerLoading
	  },
	  data(){
      return {
        loading: false,
        cart: false,
        address:{
          typeOrder: false,
          form: {
            typeStreet: '',
            street: '',
            number1: '',
            number2: ''
          },
          addresslatLng: {
            lat: 0,
            lng: 0
          },
          coverage: {
            status: false,
            price: '',
            area: 0
          }
        }
      }
	  },
    computed:{
      priceShipping(){
        if(this.address.coverage!= null){
          return this.address.coverage.price
        }
      }
    },
    filters:{
      money(val){
        return `$ ${val}`
      }
    },
    created(){
      this.$nextTick( async  () => {
        this.loading = true
        await this.getCart()
        await this.getAddress()
        this.loading = false
      })
    },
	  methods:{
      async getCart() {
        await this.$store.dispatch('shoppingCart/GET_CART', true)
        this.cart = this.$store.state.shoppingCart.cart
        this.$root.$emit('updateCart')
      },
      getAddress(){
        helper.storage.get.item('dataAddress').then(response => {
          if (response !== null) {
            this.address = response
          }
        })
      },
	  }
  }
</script>

<style scoped>

</style>