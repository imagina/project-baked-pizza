<template>
	<section class="container-fluid">
		<breadcrumb :name="name" :image="image"/>
		<div class="container-section">
			<div class="row">
				<div class="col-md-12">
					<div style="width: 100%">
						<p>
							Estamos ubicados en la Carrera 87B #38A-42. 
							en la Ciudad de Bogotá D.C.
						</p>
						<br>
						<google-map/>
					</div>
				</div>
			</div>
		</div>
		<br>
	</section>
</template>

<script>
	import GoogleMap from "src/components/GoogleMap";
	export default {
		components:{
			GoogleMap,
		},
		data(){
			return{
				name:'Dónde estamos',
				image:'statics/header-pide.jpg',
			}
		}
	}
</script>