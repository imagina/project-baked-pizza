<template>
	<div class="row">

		<div class="col-md-12 q-mb-md">
			<newComponent/>
		</div>

		<div class="col-md-12">
			<q-card class="no-shadow" v-for="(address, index) in addresses" :key="index">
				<q-card-main>
					<!-- EDIT COMPONENT-->
					<q-btn round no-caps class="float-right" color="red" icon="delete" flat/>

					<!--DELETE COMPONENT -->
					<q-btn round no-caps class="float-right" color="red" icon="edit" flat/>
					
					{{address.first_name}} {{address.last_name}} <q-icon name="star" v-if="address.default"/><br>
					{{address.address_1}}<br>
					{{address.address_2}}<br>
					{{address.company}}<br>
				</q-card-main>
			</q-card>
		</div>

		<div class="col-md-12">
			<q-pagination 
				boundary-links  
				v-model="page" 
				:max="parseInt(pagination.lastPage)" 
				color="red" 
				@input="otherPageOrder()" 
				:max-pages="5"/>
		</div>

	</div>
</template>

<script>
	import newComponent  from 'src/components/icommerce/newaddresses'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import addresService from 'src/services/addresses'

	export default {
		components:{
			newComponent
		},
		data(){
			return {
				opened: false,
				user:[],
				addresses: [],
				pagination: [],
				page: 1,
	    	take: 2,
			}
		},
		created(){
  		this.$root.$on("sesionStart", this.setData);
		},
		mounted(){
			this.setData()
		},
		methods:{
			setData(){
				helper.storage.get.item('userData').then(response => {
					this.userData = response
					if (response != null) {
						this.user = response
						this.getAddresses(response.id)
					}	
				})
			},
			getAddresses(id){
				this.visible = true
				let include = 'addresses'
				let filter = {
					"user":id
				}
				addresService.index(filter, this.take, this.page)
				.then(response => {
					this.visible = false
					this.addresses = response.data
					this.pagination = response.meta.page
				})
			},
  		otherPageOrder(){
  			this.getAddresses(this.user.id)
  		}
		},
	}
</script>