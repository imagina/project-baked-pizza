<template>
	<div class="row">
		<div class="col-xs-12 q-px-sm q-mb-md border-botton">
			<p> <q-icon name="credit_card"/> Método de Pago</p>
		</div>

		<div class="col-xs-12">
		
			<q-radio
				class="q-mb-md"
				style="font-family: Muli;font-size: 1.25rem; display:block"
				v-for="(item, index) in paymentMethods"
				:key="index"
				:label="item.title"
				v-model="paymentMethod"
				:val="item" />
				
		</div>
	</div>
</template>

<script>
	// SERVICES
	import eCommerceService from '@imagina/qcommerce/_services/index'
  
  import _cloneDeep from 'lodash.clonedeep'
	export default {
		props:{
      value:{
        type:Object,
        default:()=>{}
      }
    },
		watch:{
      paymentMethod(val){
        this.value.methodPayment = this.paymentMethod
      }
    },
		data(){
			return {
				loading:false,
				paymentMethods:[],
				paymentMethod:'',
			}
		},
		mounted(){
			this.$nextTick(function () { 
				this.getPaymentMethods()
			})
		},
		methods:{
			getPaymentMethods(){
				this.visible = true
				eCommerceService.crud.index('apiRoutes.eCommerce.paymentMethods')
				.then(response=>{
					this.loading = false
					this.paymentMethods = _cloneDeep(response.data)
					if(this.value.dataAddress.store){
            this.paymentMethods.forEach((payment,index) =>{
            	if(payment.name == 'icommercecheckmo'){
            	  this.paymentMethods.splice(index,1)
							}
						})
					}
				})
			},
		},
	}
</script>
