<template>
	<section class="container-fluid perfil">
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Perfil" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->
		<div class="container-section">
			<div class="row">
				<div class="col-md-12">
					<div class="q-display-1">Perfil</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-4">
					<usercardComponent @showview="showview = $event"/>
				</div>
				<div v-if="showview === 'showuserinfo'" class="col-xs-12 col-sm-12 col-md-8">
					<showinfouserComponent/>
				</div>
				<div v-if="showview === 'showuseredit'" class="col-xs-12 col-sm-12 col-md-8">
					<showedituserComponent/>
				</div>
				<div v-if="showview === 'showorders'" class="col-xs-12 col-sm-12 col-md-8">
					<sordersComponent />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
// componets
import usercardComponent from 'src/components/icommerce/profile/usercard'
import showinfouserComponent from 'src/components/icommerce/profile/showinfouser'
import showedituserComponent from 'src/components/icommerce/profile/showedituser'
import sordersComponent from 'src/components/icommerce/orders'
import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'

export default {
	components:{
		usercardComponent,
		breadcrumbComponent,
		showinfouserComponent,
		showedituserComponent,
		sordersComponent,
	},
	data(){
		return {
			showview: 'showuserinfo',
		}
	},
}
</script>

<style lang="stylus">
	
</style>

