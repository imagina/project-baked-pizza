<template>
	<section class="container-fluid">
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Perfil" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->
		<div class="container-section">
			<div class="row">
				<div class="col-md-12">
					<h5>Perfil</h5>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-4">
					<usercardComponent/>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-8">
					<addressesComponent/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
// componets
import usercardComponent from 'src/components/icommerce/profile/usercard'
import addressesComponent from 'src/components/icommerce/profile/addresses'
import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'

export default {
	components:{
		usercardComponent,
		addressesComponent,
		breadcrumbComponent
	}
}
</script>
