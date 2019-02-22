<template>
	<section class="container-fluid">
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Mis Ordenes" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->
		<div class="container-section">	
			<div class="row">
				<div class="col-md-12">
                    <ordersComponent/>
                </div>
			</div>
		</div>
	</section>
</template>

<script>
// componets
import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
import ordersComponent from 'src/components/icommerce/profile/orders'

export default {
	components:{
        breadcrumbComponent,
        ordersComponent
	}
}
</script>
