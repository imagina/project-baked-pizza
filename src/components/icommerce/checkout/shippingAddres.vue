<template>
  <q-card>
    <q-card-title>
      <p class="color-baked-title">
        <b>Dirección de envío</b>
      </p>
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <q-btn label="Cambiar Direcciòn" color="primary" class="q-my-md"/>
      <p>
        <b>Tipo de pedido</b> : {{addrees.typeOrder ? 'Domicilio' : 'Recoger en tienda'}}
      </p>
      <p>
        <b>Direccion</b>: 
        {{addrees.form.typeStreet}} 
        {{addrees.form.street}} 
        {{addrees.form.number1}} 
        {{addrees.form.number2}}
        Bogotá, Colombia
      </p>
      <p>
        <b>
          <b>Costo envío</b>: ${{addrees.coverage.price}}
        </b>
      </p>
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
          } else {
            /*
              si este componente es renderizado, 
              es por que ya esta logueado el usuario
              entonces:
                validar si tiene direcciones
                si las tiene darle la opcion de escoger la que quiera usar
                  elegit una
                    valira direccione
                si no tiene direcciones mostar el componente de validacion
                  validar direccion
                volver a ejecutar la funcion de de getAddress
            */
          }
        })
      },
      

    }
  }
</script>