<template>
	<div class="row" v-if="userId">
		<div class="col-xs-12">
			<q-btn label="Mis Direcciones" size="20px" style="min-height: 40px" color="primary" @click="open = !open"/>
			<q-modal v-model="open" class="relative-position">
				<q-modal-layout>
					<q-toolbar slot="header">
						<q-btn
							flat round dense
							v-close-overlay
							icon="close"/>
						<q-toolbar-title class="text-center">
							Mis Direcciones
						</q-toolbar-title>
					</q-toolbar>
					<div class="q-mx-lg">
						<div class="row">
							<div class="col-xs-12 q-mb-xl q-mt-sm">
								<q-list highlight>
									<q-item v-for="(address, index) in addreses" :key="index" separator>
										<q-item-main>
											<p><b>Tipo de Orden:</b> {{address.options.typeOrder ? 'Domicilio' : 'Recoger En Tienda' }} </p>
											<p><b>Dirección:</b> {{address.options.form.typeStreet}} {{address.options.form.street}} {{address.options.form.number1}} {{address.options.form.number2}}</p>
											<p v-if="address.options.coverage"><b>Precio Domicilio:</b>  {{address.options.coverage ? address.options.coverage.price : ''}}</p>
										</q-item-main>
										<q-item-side right>
											<q-btn
												label="Usar"
												dense
												flat
												round
												icon="fas fa-map-marker"
												@click="saveConfigAddress(address)"/>
											<q-btn
												class="q-ml-lg"
												label="Usar"
												dense
												flat
												round
												color="red"
												icon="fas fa-trash"
												@click="deleteConfigAddress(address.id)"/>
										</q-item-side>
									</q-item>
								</q-list>
							</div>
						</div>
					</div>
				</q-modal-layout>
				<inner-loading :visible="loading"></inner-loading>
			</q-modal>
		</div>
	</div>
</template>

<script>
  import addressesService from 'src/services/addresses'
  import {helper} from "@imagina/qhelper/_plugins/helper";
  import innerLoading from 'src/components/master/innerLoading'
  
  export default {
    components:{
      innerLoading
    },
    data () {
      return {
        loading: false,
        open: false,
        addreses: [],
	      userId: false
      }
    },
	  mounted() {
      this.$nextTick(() => {
        this.getAddresses()
      })
    },
    methods:{
      async getAddresses(){
        await this.getUser()
        if(this.userId){
          let filter = {
            userId: this.userId
          }
          this.loading = true
          addressesService.index(filter).then( response => {
            this.addreses = response.data
            this.loading = false
          }).catch( error => {
            console.warn(error)
            this.loading = false
          })
        }
      },
	    async getUser(){
        this.userId = await helper.storage.get.item('userId')
	    },
      saveConfigAddress(address){
        this.open = false
        this.$emit('addressValidated')
        helper.storage.set('dataAddress', address.options)
        this.$alert.success('Validación de cobertura exitosa', 'top')
        this.$router.push({path: '/products/pizzas'})
      },
      deleteConfigAddress(id){
        this.$q.dialog({
          title: 'CONFIRMAR',
          message: '¿ Está seguro que desea eliminar esta direccion ?',
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }).then(() => {
          this.loading = true
          addressesService.delete(id).then( response => {
            this.$alert.success('Direccion Eliminada de manera correcta', 'top')
            this.getAddresses()
            this.loading = false
          }).catch( error => console.warn(error))
        }).catch(() => {
          this.loading = false
          return
        })
      }
	  }
  }
</script>

<style scoped>

</style> 