<template>
	<div class="row" >
		<div class="col-xs-12 q-px-sm q-mb-md border-botton">
			<p> <q-icon name="person_pin"/> Información Personal</p>
		</div>
		<div 
			class="col-xs-12 q-px-sm q-mb-md">
			<div class="row">
				<div class="col-12 col-lg-6">
					<p class="q-mb-none">Nombre Completo:</p>
				</div>
				<div class="col-12 col-lg-6">
					<b class="secondary-font">{{userData ? userData.fullName : 'Usuario con sesión no iniciada' }}</b>
					<pre v-show="false">{{this.$store.state.auth}}</pre>
				</div>
				<div class="col-12 col-lg-6">
					<p class="q-mb-none">Correo Electrónico:</p>
				</div>
				<div class="col-12 col-lg-6">
					<b class="secondary-font">{{userData ? userData.email : 'Usuario con sesión no iniciada'}}</b>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {helper} from '@imagina/qhelper/_plugins/helper';
	export default {
			props:{
      value:{
        type:Object,
        default:()=>{}
      }
		},
		data(){
			return{
				userLogin:false,
				userData:{}
			}
		},
		mounted(){
			this.setData()
			if(!this.$store.state.auth.userData){
				// SHOW COMPONENT LOGIN MODAL
				this.userLogin = false
			}else {
				this.userLogin = true
			}
		},
		methods:{
			setData(){
        helper.storage.get.item('userData').then(response => {
					this.userData = response
					this.value.userData = response
        })
      },
		}
	}
</script>
