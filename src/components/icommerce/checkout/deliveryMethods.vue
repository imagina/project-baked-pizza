<template>
	<q-card>
		<q-card-title>
			<p class="color-baked-title">
				<b>Métodos de Envío</b>
			</p>
		</q-card-title>
		<q-card-separator/>
		<q-card-main>
			<div class="q-py-lg row">
				<q-item tag="label" v-for="(store, index) in shippingMethods" :key="index">
					<q-item-side>
						<p>
							<q-radio v-model="shippingMethod" :val="item.id"/>
							{{item.id}} <b>{{item.id}}</b> {{item.id}}
						</p>
					</q-item-side>
				</q-item>

			</div>
		</q-card-main>
	</q-card>
</template>

<script type="text/javascript">
	import shippingMethodsService from 'src/services/shipping-methods'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	
	export default {
		data(){
			return {
				shippingMethods: [],
				shippingMethod: '',
			}
		},
		computed: {
		},
		created() {
		},
		mounted(){
		},
		methods:{
			getshippingMethods(){
				shippingMethodsService.index()
				.then(response=>{
					this.shippingMethods = response.data
				})
			},
		},
	}
</script>