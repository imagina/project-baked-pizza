<template>
  <div>
    <div v-if="!simple">   
      <div class="container-section cart-content" v-if="products.length">
            <div class="row">
                <div class="col-12">
                    <p class="q-display-2 color-baked-title" align="center">Listado de Pedidos</p>
                </div>
            </div>
            <!-- Version desktop -->
            <div class="row desktop-only" v-if="$q.platform.is.desktop">
                <div class="col-12">
                    <!--== START TABLE PRODUCTSO BY CATEGORI SELECTED ==-->
                    <div class="table-responsive">					
                        <table class="table">
                            <thead>
                                <tr>
                                    <th colspan="2">Descripción del producto</th>
                                    <th class="table-description--boder">Cantidad</th>
                                    <th colspan="2">Sub-Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in cart.products" :key="index">
                                    <td class="table-description">
                                        <div class="table-description__img">
                                            <img src="statics/logo.png" alt="pizza">
                                        </div>
                                    </td>
                                    <td class="table-description table-description--info">
                                        <span class="q-display-1 d-block color-primary">{{item.name}}</span>
                                        <p>Tamaño: Personal</p>
                                        <p>Adicionales: 0</p>
                                    </td>
                                    <td class="table-description table-description--boder">
                                        <div class="row">
                                            <div class="col-8">
                                                <span>Cantidad:</span>
                                                <input type="number" class="input-count-product" :value="item.quantity" readonly>
                                            </div>
                                            <div class="col-4">
                                                <q-btn flat round color="red" @click="update(item, '+')" icon="add"/>
                                                <q-btn flat round color="red" @click="update(item, '-')" icon="remove"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="table-price">
                                        <span class="q-display">${{item.subtotal}}</span>
                                    </td>
                                    <td>
                                        <q-btn size="sm" round color="red" @click="deleteitem(item)" icon="close"/>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3"></td>
                                    <td colspan="2">TOTAL: <span class="table-price__total">$ {{cart.total}}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <!--== EMD TABLE PRODUCTSO BY CATEGORI SELECTED ==-->
                </div>
                <div class="col-12 text-right">
					<q-btn type="button" label="IR AL CHECKOUT" size="lg" color="brown" sence class="q-my-md q-mr-sm" to="/checkout" />
					<q-btn type="button" label="CONTINUAR COMPRANDO" size="lg" color="red" sence class="q-my-md" to="/pide-en-linea" />
                </div>
            </div>
            <!--End version desktop -->

            <!-- Version Mobile -->
            <div class="row mobile-only" v-if="$q.platform.is.mobile">
                <div class="col-xs-12 col-sm-12 col-md-8" >
					<q-card class="no-shadow" v-for="(item, index) in cart.products" :key="index">
						<q-card-main>
							<div class="row">
								<div class="col-xs-4">
									<img src="statics/logo.png" alt="pizza" width="80%">
								</div>
								<div class="col-xs-6">
									<span class="q-title color-primary">{{item.name}}</span><br>
									<span class="table-price__total q-title"><b>$ {{ item.subtotal}}</b></span>
								</div>
								<div class="col-xs-2 text-center ">
									<q-btn size="sm" round color="red" @click="deleteitem(item)" icon="close"/>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 text-center">
									<q-btn flat round outline color="red" @click="update(item, '-')" icon="remove"/>
									<span>{{item.quantity}}</span>
									<q-btn flat round outline color="red" @click="update(item, '+')" icon="add"/>		
								</div>
							</div>
						</q-card-main>
					</q-card>
				</div>
                <div :class="`col-xs-12 col-md-4 ${($q.platform.is.desktop ? 'q-pl-md' : '' )}`">
					<sumaryComponent :total="cart.total"/>
					<q-btn label="IR AL CHECKOUT" class="full-width shadow-1" color="brown" to="/checkout" />
					<q-btn label="CONTINUAR COMPRANDO" class="full-width shadow-1 q-mt-sm" color="red" to="/pide-en-linea" />
				</div>
            </div>
            <!--End version mobile -->
        </div>
        <div class="container-section" v-else>
            <div class="row" >
                <div class="col-12" align="center">
                    <p class="q-display-2 color-baked-title" align="center">No ha agregado productos al carro</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
      
      <q-card v-for="(item, index) in cart.products" :key="index" class="no-shadow">
        <q-card-main class="row">
          <div class="col-md-10">
            <span class="q-display-1 color-primary">
              {{item.name}}
            </span>
          </div>
          <div class="col-md-2">
            <q-btn size="sm" round color="red" @click="deleteitem(item)" icon="close"/>
          </div>
          <div class="col-md-6">
            <span>Cantidad: {{item.quantity}}</span>
          </div>
          <div class="col-md-6">
            <span class="q-display">${{item.subtotal}}</span>
          </div>
        </q-card-main>
      </q-card>
      <q-card class="no-shadow">
        <q-card-main>
          <hr style="background-color: #e0e0e0; color: #e0e0e0; border: none; height: 1px;">
          <p>TOTAL: <span class="table-price__total"><b>$ {{cart.total}}</b></span></p>
          <hr style="background-color: #e0e0e0; color: #e0e0e0; border: none; height: 1px;">
        </q-card-main>
      </q-card>
      
    </div>
  </div>
</template>

<script>
  import sumaryComponent from 'src/components/icommerce/cart/sumary'
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import {helper} from '@imagina/qhelper/_plugins/helper';
  import cartService from 'src/services/cart';

  export default {
    props:{
      simple: {
        type: Boolean,
        default: false
      },
    },
    components:{
      sumaryComponent
    },
    data(){
      return{
        visible: false,
        cart: [],
        products: false,
      }
      },
      mounted(){
        this.getcart()
      },
      methods:{
        getcart(){
          helper.storage.get.item('cart_server').then(res => {
            if (res !== null) {
            this.visible = true
            cartService.show(res.id)
            .then(response=>{
              this.cart = response.data
              this.products = response.data.products
              console.log(this.products)
              this.visible = false
              this.$root.$emit('updateCart')
            })
          }
        })
        },
        deleteitem (item) {
            cartService.deleteProduct(item.id)
            .then(response=>{
                this.$root.$emit('deleteItemCart')
                alert.success('Carrito Actualizado')
                this.getcart()
            })
          },
          update (item, sign) {
              this.visible = true
              let formData = {
                "cart_products": {
                "product_id": item.product_id,
                "quantity": parseInt(item.quantity) + (sign == '+' ? +1 : -1),
                "price": item.price
              },
            }
            formData['cart_id']  = this.cart.id
            cartService.create(formData)
            .then(response=>{
                alert.success('Producto Actualizado')
                this.getcart()
            })
          },
      }
  }
</script>
