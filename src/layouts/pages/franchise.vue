<template>
	<section class="container-fluid">

		<breadcrumb name="Dónde estamos" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">
			<div class="row">
				<div class="col-md-12">
					<div style="width: 100%">
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
	}
}
</script>