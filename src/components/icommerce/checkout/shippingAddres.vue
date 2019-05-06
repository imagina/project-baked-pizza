<template>
  <q-card>
    <q-card-title>
      <p class="color-baked-title">
        <b>
          <q-icon name="local_shipping"/>
          Dirección de envío
        </b>
      </p>
    </q-card-title>
    <q-card-main>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
						<div class="col-xs-3">
							<p class="color-baked-title">
								Dirección
							</p>
						</div>
						<div class="col-xs-9">
							<p>
                {{addrees.form.typeStreet}} 
                {{addrees.form.street}} 
                {{addrees.form.number1}} 
                {{addrees.form.number2}}
                Bogotá, Colombia
              </p>
						</div>
					</div>
        </div>
        <div class="col-md-12">
          <q-btn 
            label="Cambiar Direcciòn"
            color="primary" 
            class="q-my-md"/>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'
  export default {
    data(){
      return{
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
        }
      }
    },
    mounted(){
      this.$nextTick(() => {
				this.getAddress()
			})
    },
    methods:{
      getAddress(){
				helper.storage.get.item('dataAddress').then(res => {
          if (res !== null) {
						this.addrees = res
          }
        })
      },
    }
  }
</script>