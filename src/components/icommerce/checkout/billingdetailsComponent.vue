<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1">
		<q-card class="no-shadow" v-if="userData">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de envio</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<q-tabs inverted v-model="typeOrder">
						<!-- Tabs - notice slot="title" -->
						<q-tab :default="domicile" slot="title" label="DOMICILIO" name="tab-1" icon="local_shipping" @select="setDomicile(true)" />
						<q-tab :default="!domicile" slot="title" label="RECOGER EN TIENDA" name="tab-2" icon="directions_walk" @select="setDomicile(false)" />
						<!-- Targets -->
						<q-tab-pane name="tab-1">
							<br>
							<moduleaddressesComponent :paginate="false" :btn_edit="false" :btn_delete="false" :shipping="true"/>
							<q-checkbox v-model="billingShippingaddress" :val="true" label="La direcciónn de facturación es la misma que la de envio" @input="setBillingShippingaddress"/>
							<br>
							<br>
							<moduleaddressesComponent v-if="!billingShippingaddress" :paginate="false" :btn_edit="false" :btn_delete="false" :shipping="false"/>
						</q-tab-pane>

						<q-tab-pane name="tab-2">
							<q-item tag="label" v-for="(store, index) in shops" :key="index">
								<q-item-side>
									<q-radio v-model="selectedStore" :val="store.id" :label="store.name" @input="setStoreSelected"/>
								</q-item-side>
							</q-item>
						</q-tab-pane>

					</q-tabs>
				</div>
			</div>
		</q-card>
	</div>
</template>

<script>
	import billingaddressComponent from 'src/components/icommerce/checkout/billingaddressComponent'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import profileService from 'src/services/profile'
	import locationsService from 'src/services/locations'
	import mapAreaService from 'src/services/maparea'

	import moduleaddressesComponent from 'src/components/icommerce/address/index'
	import { mapState } from 'vuex';

	export default {
		props: ['parentData'],
		components:{
			billingaddressComponent,
			moduleaddressesComponent,
		},
		data(){
			return {
				userData: true,
				billingShippingaddress: true,
				stores: [],
				selectedStore : '',
				typeOrder: 'tab-1',
			}
		},
		computed: {
			...mapState({
				defaultAddress 			: state => state.address.defaultAddress,
				shops 					: state => state.mapArea.shops,
				domicile 				: state => state.mapArea.domicile,
				storeSelected 			: state => state.mapArea.storeSelected
			})
		},
		created(){
		  this.$root.$on("sesionStart", this.setData);
		  this.getShops()
		  this.getTypeOrder()
		  this.getStoreSelected()
		},
		mounted(){
			this.setData()
		},
		methods:{
			setData(){
				helper.storage.get.item('userData').then(response => {
					this.userData = response
				})
			},
			setBillingShippingaddress(val){
				this.$store.dispatch('address/setBillingShippingaddress',val)
			},
			getShops(){
				this.$store.dispatch('mapArea/getShops')
			},
			setDomicile(val){
				this.$store.dispatch('mapArea/setTypeOrder',val)
			},
			getTypeOrder(){
				this.$store.dispatch('mapArea/getTypeOrder').then(response => {
					this.setTab(this.domicile)
				})
			},
			setTab(val){
				if(val){
					this.typeOrder = 'tab-1'
				}else{
					this.typeOrder = 'tab-2'
				}
			},
			getStoreSelected(){
				this.$store.dispatch('mapArea/getStoreSelected').then(response => {
					this.selectedStore = this.storeSelected
				})
			},
			setStoreSelected(val){
				this.$store.dispatch('mapArea/setStoreSelected',val)
			}
		}
	}
</script>