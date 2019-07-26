<template>
  <section>
    <breadcrumb-component
      class="q-mb-lg"
      name="Checkout"
      image="statics/footer.jpg"/>
    <div class="q-container relative-position">
      <div class="row gutter-x-sm">
        
        <div class="col-12 col-md-8">
          <div class="backend-page q-mb-md">
            <pre v-show="false">{{orderData}}</pre>
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <miniCart v-model="orderData"/>
                </div>
              </div>
            </div>
          </div>
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <UserInformation v-model="orderData"/>
                </div>
              </div>
            </div>
          </div>
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <addressShipping v-model="orderData"/>
                </div>
              </div>
            </div>
          </div>
          
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <addressBilling v-model="orderData"/>
                </div>
              </div>
            </div>
          </div>
          
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <methodsShipping v-model="orderData"/>
                </div>
              </div>
            </div>
          </div>
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <methodsPayment v-model="orderData"/>
                </div>
              </div>
            </div>
          </div>
          
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <div class="row">
                    <div class="col-12 q-mb-md border-botton">
                      <p> <q-icon name="list"/> Datos Adicionales</p>
                    </div>
                    <div class="col-12" v-if="orderData.methodPayment.name == 'icommercecheckmo'">
                      <div class="row items-center">
                        <div class="col-12 col-md-6">
                          <span>¿Cómo quieres pagar en tu domicilio?</span>
                        </div>
                      </div>
                      <q-list separator>
                        <q-item link tag="label">
                          
                          <q-item-side >
                            <q-radio v-model="orderData.options.paymentItem" val="Efectivo" />
                          </q-item-side>
                          <q-item-main label="Efectivo" />
                        </q-item>
                        <q-item link tag="label">
                          
                          <q-item-side >
                            <q-radio v-model="orderData.options.paymentItem" val="Datáfono" />
                          </q-item-side>
                          <q-item-main label="Datáfono" />
                        </q-item>
                      </q-list>
                    </div>
                    <div class="col-12" v-if="orderData.dataAddress.store">
                      <div class="row items-center">
                        <div class="col-12 col-md-6">
                          <span>Tiempo de espera para recoger en tienda:</span>
                        </div>
                        <div class="col-12 col-md-6">
                          
                          <q-btn-toggle
                            v-model="orderData.options.timeToWithdraw"
                            toggle-color="primary"
                            inverted
                            :options="[
                              {label: '15 min.', value: '15 min.'},
                              {label: '20 min.', value: '20 min'},
                              {label: '25 min.', value: '25 min.'},
                              {label: '30 min.', value: '30 min.'},
                              {label: '1 hora.', value: '1 hora'},
                            ]"
                          />
                        </div>
                        <div class="separator"></div>
                      
                      
                      </div>
                    
                    
                    
                    </div>
                    <div class="col-12">
                      <span>Observaciones que desees enviarnos:</span>
                    </div>
                    <div class="col-12">
                      <q-field :count="200">
                        <q-input
                          type="textarea"
                          :maxlength="200"
                          v-model="orderData.options.observations"
                          rows="2"
                        />
                      </q-field>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
        <div class="col-12 col-md-4">
          <div class="backend-page q-mb-md">
            <div class="row">
              <div class="col-12">
                <div class="border-top-color shadow-1">
                  <sumary />
                </div>
              </div>
            </div>
          </div>
          
          <q-btn
            :disabled="$store.state.shoppingCart.cart.total > 0 ? false : true"
            @click="save"
            label="procesar Compra"
            class="full-width q-mb-md"
            color="primary"/>
        
        </div>
      </div>
      <inner-loading :visible="loading"></inner-loading>
    </div>
  </section>
</template>

<script>
  // VALIDATORS
  import {required,min} from 'vuelidate/lib/validators'

  // COMPONENTS
  import UserInformation from 'src/components/qcommerce/front/checkout/UserInformation'
  import addressShipping from 'src/components/qcommerce/front/checkout/addressShipping'
  import addressBilling from 'src/components/qcommerce/front/checkout/addressBilling'
  import methodsShipping from 'src/components/qcommerce/front/checkout/methodsShipping'
  import methodsPayment from 'src/components/qcommerce/front/checkout/methodsPayment'
  import sumary from 'src/components/qcommerce/front/checkout/sumary'
  import miniCart from 'src/components/qcommerce/front/checkout/miniCart'
  import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
  import innerLoading from 'src/components/master/innerLoading'

  // SERVICES
  import eCommerceService from '@imagina/qcommerce/_services/index'

  import {helper} from '@imagina/qhelper/_plugins/helper';

  export default{
    components:{
      breadcrumbComponent,
      UserInformation,
      addressShipping,
      addressBilling,
      methodsShipping,
      methodsPayment,
      sumary,
      miniCart,
      innerLoading
    },
    data(){
      return{
        loading:false,

        orderData:{
          cart:{},
          dataAddress: {},
          methodPayment:{},
          methodShipping:{},
          addressBilling:{},
          addressShipping:{},
          userData:{},
          options:{
            paymentItem:'',
            timeToWithdraw: '',
            observations:''
          }
        },
        schedules:{
          status: {
            shipping: {
              status: false,
              message: "",
              schedule: {}
            },
            pickup: {
              status: false,
              message: "",
              schedule: {}
            }
          },
        },
        validatedAddress:{
          typeOrder:false,
        },
      }
    },
    validations:{
      orderData:{
        methodPayment:{required}
      }
    },
    created(){
      this.$nextTick(async () => {
        await this.isAddressValidated()

        this.getSchedules()
        this.getValidateAddress()

      })
    },
    computed: {
      scheduleAvaliable(){
        if (this.validatedAddress.typeOrder){
          return this.schedules.status.shipping.status
        } else {
          return this.schedules.status.pickup.status
        }
      }
    },
    methods:{
      async save(){
        if(!this.scheduleAvaliable){
          this.$q.dialog({
            title: 'Fuera del horario',
            message:'Domicilio: Todos los dias de 1PM a 9.45PM, Fines de semana, y Festivos de 12.30PM a 9:45PM. Recoger en Tienda: Todos los días desde las 2PM hasta las 9.45PM ',
            color: 'positive',
            ok: 'Ok',
            cancel: 'Cancel'
          }).then(data => {
            return
          }).catch(() => {
            return
          })
          return
        }
        
        this.loading = true
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.$helper.alert.error('Faltan datos para procesar la compra', 'bottom')
          this.loading = false
          return
        }

        if(this.orderData.dataAddress.store && !this.orderData.options.timeToWithdraw ){
          this.$helper.alert.error('Por favor, ingresa el tiempo de espera para recoger en tienda', 'bottom')
          this.loading = false
          return
        }

        if(!this.orderData.dataAddress.store && this.orderData.methodPayment.name == 'icommercecheckmo' && !this.orderData.options.paymentItem){
          this.$helper.alert.error('Por favor, confírmanos cómo quieres pagar en tu domicilio', 'bottom')
          this.loading = false
          return
        }

        let formData = await this.formatData(this.orderData)

        //return
        eCommerceService.crud.create('apiRoutes.eCommerce.orders', formData)
          .then(response=>{

            helper.storage.remove('dataAddress')
            this.$store.dispatch("shoppingCart/CLEAR_CART")

            if(response.data.paymentData.external){
              window.open(response.data.paymentData.redirectRoute, '_blank');
            }
            this.loading = false
            // Redirect show Order
            this.$router.push({name : 'order.show' , params : {id : response.data.orderId}})
          })
          .catch(error=>{
            this.loading = false
            console.warn(error)
          })
      },
      isAddressValidated(){
        return new Promise(async (resolve, reject) => {
          helper.storage.get.item('dataAddress').then(response => {
            if (response == null) {
              this.$helper.alert.error('No se ha validado la direccion de envío aun', 'bottom', false, 2500)
              this.$router.push({name : 'app.home'})
              reject(error)
            }else{
              this.orderData.dataAddress = response;
              resolve(true)
            }
          })
        })
      },

      formatData(){
        let attributes =  {
          storeId: 1,
          customerId: this.orderData.userData.id,

          paymentMethod: this.orderData.methodPayment.name,
          paymentMethodId: this.orderData.methodPayment.id,
          shippingMethod: this.orderData.methodShipping.typeOrder ? this.orderData.methodShipping.coverage.area : 'icommercepickup',
          shippingMethodId: this.orderData.methodShipping.typeOrder ? 2 : 1, // Datos quemados, en actaulizacion traer de la base de datos

          cartId: this.orderData.cart.id,
          paymentFirstName: this.orderData.userData.firstName,
          paymentLastName: this.orderData.userData.lastName,
          paymentCompany: "",
          paymentNit: "",
          paymentAddress1: JSON.stringify({
            address: this.formatAddress(this.orderData.addressBilling),
            lat:this.orderData.addressBilling.addresslatLng.lat,
            lng:this.orderData.addressBilling.addresslatLng.lng
          }),
          paymentAddress2: "",
          paymentCity: 'Bogotá',
          paymentZipCode: '123456',
          paymentCountry: 'Colombia',
          paymentZone: 'Cundinamarca',
          shippingFirstName: this.orderData.userData.firstName,
          shippingLastName: this.orderData.userData.lastName,
          shippingCompany: "",
          shippingAddress1: JSON.stringify({
            address: this.formatAddress(this.orderData.addressShipping),
            lat:this.orderData.addressShipping.addresslatLng.lat,
            lng:this.orderData.addressShipping.addresslatLng.lng
          }),

          shippingAddress2: this.orderData.addressShipping.form.address2,
          shippingCity: 'Bogotá',
          shippingZipCode: '123456',
          shippingCountry: 'Colombia',
          shippingZone: 'Cundinamarca',
          options: this.orderData.options
        }

        return attributes
      },
      formatAddress(data){
        return `${data.form.typeStreet} ${data.form.street} Número ${data.form.number1} - ${data.form.number2}`
      },

      getSchedules(){
        let criteria = 1
        let params = {
          refresh: true
        }
        eCommerceService.crud.show('apiRoutes.eCommerce.schedules', criteria, params)
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
  .border-botton
    border-bottom: 1px solid #c4c4c47a;
  .separator
    border-bottom: 1px solid #c4c4c47a;
    margin: 5px 0
    width 100%
</style>
