<template>
	<section>
		<div 
			class="container-fluid" 
			v-if="!modalLogin">
			<breadcrumb 
				:name="name" 
				:image="image"/>
			<div class="container-section">
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<div class="col-md-12">
							<customerinformationComponent 
								:info="datacheckout.user"/>
						</div>
						<div class="col-md-12">
							<shippingAddresComponent 
                :addrees="addrees"/>
						</div>
						<div class="col-md-12 ">
							<billingAddressComponent 
                :addrees="addreesBilling"/>
						</div>
						<div class="col-md-12">
							<deliveryMethodsComponent/>
						</div>
						<div class="col-md-12">
							<paymentMethodsComponent 
                :payment="payment"/>
						</div>
						<div class="col-md-12">
							<q-card>
								<q-card-title>
									<p class="color-baked-title">
										<b>
											<q-icon name="comment"/>
											Informacion Adicional <br>
										</b>
									</p>
								</q-card-title>
								<q-card-main>
								</q-card-main>
							</q-card>
						</div>
						<div class="col-md-12">
							<q-btn 
                @click="saveOrder()"
								label="Procesar Compra" 
								color="primary" 
								size="lg"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<q-modal 
				v-model="modalLogin" 
				no-esc-dismiss
				no-backdrop-dismiss>
				<q-modal-layout>
					<div class="q-mx-lg">
						<loginComponent @userLogged="isLoggued()"/>
					</div>
				</q-modal-layout>
			</q-modal>
		</div>
	</section>
</template>

<script>
  // Components
  import customerinformationComponent from 'src/components/icommerce/checkout/customerInformation'
  import shippingAddresComponent from 'src/components/icommerce/checkout/shippingAddres'
  import billingAddressComponent from 'src/components/icommerce/checkout/billingAddressComponent'
  import deliveryMethodsComponent from 'src/components/icommerce/checkout/deliveryMethods'
  import paymentMethodsComponent from 'src/components/icommerce/checkout/paymentMethods'
  import loginComponent from 'src/components/user/login'

  // Helpers
  import {helper} from '@imagina/qhelper/_plugins/helper';
  import {alert} from '@imagina/qhelper/_plugins/alert'

  // Services
  import orderService from 'src/services/order'
  import paymentMethods from 'src/services/payment-methods'
  import cartService from 'src/services/cart';

  export default{
    components:{
      customerinformationComponent,
      shippingAddresComponent,
      billingAddressComponent,
      deliveryMethodsComponent,
      paymentMethodsComponent,
      loginComponent
    },
    data(){
      return{
        name:'Checkout',
        image:'statics/header-pide.jpg',
        modalLogin:false,
        datacheckout:{
          user:{},
          shippingAddress:{}
        },
        addrees:{
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
        },
        addreesBilling:{
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
        },
        cart_id:'',
        payment:{
          method:''
        }
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.isLoggued()
        this.getAddress()
        this.getcart()
      })
    },
    methods:{
      isLoggued(){
        this.modalLogin = false
        helper.storage.get.item('userData').then(response => {
          if (response == null) {
            this.modalLogin = true
          }	else {
            this.datacheckout.user = response
            this.isAddressValidated()
          }
        })
      },
      isAddressValidated(){
        helper.storage.get.item('dataAddress').then(response => {
          if (response == null) {
            alert('no ha validado cobertura ')
          }
        })
      },
      saveOrder(){
        // SET DATA FOR TO SEND ORDER SERVICE
        let data = {
          attributes: {
            user_id:this.datacheckout.user.id,
            cart_id: this.cart_id,
            address_payment:{
              first_name: this.datacheckout.user.first_name,
              last_name: this.datacheckout.user.last_name,
              company: `${this.datacheckout.user.first_name} ${this.datacheckout.user.last_name}`,
              address_1: {
                address: `${this.addreesBilling.form.street} ${this.addreesBilling.form.number1} ${this.addreesBilling.form.number2} `,
              },
              zip_code: this.addreesBilling.form.zip_code ? this.addreesBilling.form.zip_code : '654987',
              city_id: this.addreesBilling.form.city_id ? this.addreesBilling.form.city_id :'458',
              province_id: this.addreesBilling.form.province_id ? this.addreesBilling.form.province_id :'773',
              country_id: this.addreesBilling.form.country_id ? this.addreesBilling.form.country_id : '48',
            },
            address_shipping:{
              first_name: this.datacheckout.user.first_name,
              last_name: this.datacheckout.user.last_name,
              company: `${this.datacheckout.user.first_name} ${this.datacheckout.user.last_name}`,
              address_1: {
                address: `${this.addrees.form.street} ${this.addrees.form.number1} ${this.addrees.form.number2} `,
                lat: this.addrees.addresslatLng.lat,
                lng: this.addrees.addresslatLng.lng
              },
              zip_code: this.addrees.form.zip_code ? this.addrees.form.zip_code : "654987",
              city_id: this.addrees.form.city_id ? this.addrees.form.city_id : "458",
              province_id: this.addrees.form.province_id ? this.addrees.form.province_id : "773",
              country_id: this.addrees.form.country_id ? this.addrees.form.country_id : "48"
            },
            payment_id:this.payment.method.id,
            shipping_name: "icommerceagree",
            store_id: this.addrees.coverage.area ? this.addrees.coverage.area : 1
          }
        }
        
        orderService.create(data)
        .then(response=>{
          console.log(response)
          // Elimiana carro de local
          helper.storage.remove('cart_server').then(value => {
            alert.success('Orden eviada!')
          })
          
          // eliminar los datos de la direccion elegida
          helper.storage.remove('dataAddress').then(value => {
            console.log('Removing address')
          })
          // redirigir a vista de ordenes con el resumen
          // this.$router.push({name: 'home'})

          // en esta pagina generar el llaado al servicio para procesar el pago
          //this.procesPay()
          
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      procesPay(paymentmethod,orderId){
        	paymentMethods.orderMethod(paymentmethod,orderId).then(response => {
					if (Object.keys(response.data).length > 0) {
						console.log(response)
						if (response.data.external) {
							window.open(response.data.redirectRoute, '_blank');
						}
					}
				})
      },
      getAddress(){
        helper.storage.get.item('dataAddress').then(res => {
          if (res !== null) {
            this.addrees = res
            this.addreesBilling.typeOrder = res.typeOrder
            this.addreesBilling.form.typeStreet = res.form.typeStreet
            this.addreesBilling.form.street = res.form.street
            this.addreesBilling.form.number1 = res.form.number1
            this.addreesBilling.form.number2 = res.form.number2
            this.addreesBilling.addresslatLng.lat = res.addresslatLng.lat
            this.addreesBilling.addresslatLng.lng = res.addresslatLng.lng
            this.addreesBilling.coverage.status = res.coverage.status
            this.addreesBilling.coverage.price = res.coverage.price
            this.addreesBilling.coverage.area = res.coverage.area
          }
        })
      },
      getcart(){
        helper.storage.get.item('cart_server').then(res => {
          if (res !== null) {
            this.cart_id = res.id
          }
        })
      }
    }
  }
</script>