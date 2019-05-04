<template>
	<q-card>
		<q-card-title>
			<p class="color-baked-title">
				<b>Datos Personales</b>
			</p>
		</q-card-title>
		<q-card-separator/>
		<q-card-main>
			<div class="row">
				<div class="col-xs-12">	
					<div class="row">
						<div class="col-xs-3">
							<p class="color-baked-title">
								Nombres
							</p>
						</div>
						<div class="col-xs-9">
							<p>{{info.first_name}} {{info.last_name}}</p>
						</div>
					</div>
				</div>
				<div class="col-xs-12">
					<div class="row">
						<div class="col-xs-3">
							<p class="color-baked-title">
								E-mail
							</p>
						</div>
						<div class="col-xs-9">
							<p>{{info.email}}</p>
						</div>
					</div>
				</div>
			</div>	
		</q-card-main>
	</q-card>
</template>

<script>
	export default {
		props:{
			info: {
				type: Object,
				default: {}
    	},
		},
		data(){
			return {				
			}
		},
	}
</script>