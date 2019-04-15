<template>
	<section class="container-fluid">
		<breadcrumb name="Orden" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">
			<div class="row"> <!--== TITLE ==-->
				<div class="col-xs-12 col-sm-12 col-md-12 q-mb-xl">
					<div class="q-display-2 color-baked-title" align="center">Orden # {{ order.id }}</div>
					<div class="q-title text-center">CREADO EL {{ order.created_at }}</div>
				</div>
			</div>
			<div class="row"> <!--== COMPONENTS CHECKOUT ==-->
				<div class="col-12"> <!--== ACTION BUTTON ==-->
					<q-card>
						<q-card-title>
							DATOS DE USUARIO
						</q-card-title>
						<q-card-separator />
						<q-card-main>
							<dl>
								<dt class="q-title">NOMBRE</dt>
								<dd class="q-subheading">{{ order.first_name }} {{ order.last_name }}</dd>
								<dt class="q-title">CORREO</dt>
								<dd class="q-subheading">{{ order.email }}</dd>
							</dl>
						</q-card-main>
					</q-card>

				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
						<q-card>
							<q-card-title>
								DATOS DE FACTURACIÓN
							</q-card-title>
							<q-card-separator />
							<q-card-main>
								<dl>
									<dt class="q-title">NOMBRE</dt>
									<dd class="q-subheading">{{ order.payment_first_name }} {{ order.payment_last_name }}</dd>
									<dt class="q-title">COMPAÑIA</dt>
									<dd class="q-subheading">{{ order.payment_company }}</dd>
									<dt class="q-title">DIRECCIÓN</dt>
									<dd class="q-subheading">{{ order.shipping_address_1 }}</dd>
									<dt class="q-title">PAIS</dt>
									<dd class="q-subheading">{{ order.payment_country }}</dd>
									<dt class="q-title">CIUDAD</dt>
									<dd class="q-subheading">{{ order.payment_city }}</dd>
									<dt class="q-title">ZONA</dt>
									<dd class="q-subheading">{{ order.payment_zone }}</dd>
									<dt class="q-title">CÓDIGO POSTAL</dt>
									<dd class="q-subheading">{{ order.payment_zip_code }}</dd>
								</dl>
							</q-card-main>
						</q-card>
				</div>

				<div class="col-md-6">
						<q-card>
							<q-card-title>
								DATOS DE ENVIO
							</q-card-title>
							<q-card-separator />
							<q-card-main>
								<dl>
									<dt class="q-title">NOMBRE</dt>
									<dd class="q-subheading">{{ order.shipping_first_name }} {{ order.shipping_last_name }}</dd>
									<dt class="q-title">COMPAÑIA</dt>
									<dd class="q-subheading">{{ order.shipping_company }}</dd>
									<dt class="q-title">DIRECCIÓN</dt>
									<dd class="q-subheading">{{ order.shipping_address_1 }}</dd>
									<dt class="q-title">PAIS</dt>
									<dd class="q-subheading">{{ order.shipping_country }}</dd>
									<dt class="q-title">CIUDAD</dt>
									<dd class="q-subheading">{{ order.shipping_city }}</dd>
									<dt class="q-title">ZONA</dt>
									<dd class="q-subheading">{{ order.shipping_zone }}</dd>
									<dt class="q-title">CÓDIGO POSTAL</dt>
									<dd class="q-subheading">{{ order.shipping_zip_code }}</dd>
								</dl>
							</q-card-main>
						</q-card>
				</div>

			</div>

			<div class="row">
					<div class="col-md-12">
						<q-card>
							<q-card-title>
								PRODUCTOS
							</q-card-title>
							<q-card-main>
								<table class="table">
									<thead>
										<tr>
											<th class="text-left">NOMBRE</th>
											<th>PRECIO UNITARIO</th>
											<th>CANTIDAD</th>
											<th>TOTAL</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(product, index) of order.items" :key="index">
											<td class="text-left">{{ product.title }}
												<div v-for="(option, i) of product.options" :key="i">
													<span>* {{ option.option_value }}</span>
												</div>
											</td>
											<td class="text-center">$ {{ product.price }}</td>
											<td class="text-center">{{ product.quantity }}</td>
											<td class="text-center">{{ product.total }}</td>
										</tr>
									</tbody>
								</table>
							</q-card-main>
						</q-card>
					</div>
			</div>

		</div>
		
		<section-carting-app></section-carting-app> <!--== COMPONENTS BANNER CATERGIN INFO ==-->
	</section>
</template>

<script>
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'

	export default{
		components:{
			breadcrumbComponent,
		},
		data() {
			return {
				order: []
			}
		},
		created() {
			let order = {"data":{"id":36,"total":32,"status_id":1,"status":{"id":1,"parent_id":"0","status":"1","created_at":"2019-03-05 22:00:04","updated_at":"2019-03-05 22:00:04","title":"Procesando","translations":[{"id":11,"title":"Processing","order_status_id":"1","locale":"en"},{"id":25,"title":"Procesando","order_status_id":"1","locale":"es"}]},"customer_id":1,"first_name":"Imagina","last_name":"Colombia","email":"soporte@imaginacolombia.com","payment_first_name":"Imagina","payment_last_name":"Colombia","payment_company":"Lino","payment_address_1":"calle 100 \u00b7 5 -3","payment_city":"ALBAN","payment_zip_code":"654987","payment_country":"Colombia","payment_zone":"Cundinamarca","payment_code":"icommercecheckmo","payment_name":"Check Money","shipping_first_name":"Imagina","shipping_last_name":"Colombia","shipping_company":"Lino","shipping_address_1":"calle 100 \u00b7 5 -3","shipping_city":"ALBAN","shipping_zip_code":"654987","shipping_country":"Colombia","shipping_zone":"Cundinamarca","shipping_method":"icommerceagree","shipping_code":"icommerceagree","store_id":1,"store_name":"Store 2","store_address":"Address 1","store_phone":"123456","currency_id":1,"currency_code":"USD","currency_value":"1.00000000","ip":"190.198.227.221","user_agent":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/73.0.3683.103 Safari\/537.36","key":"7e2efce4fcd87994e6fd","created_at":"15\/04\/19 13:03:36","updated_at":"15\/04\/19 13:03:36","histories":[{"id":71,"order_id":"36","status_id":"1","status":{"id":1,"parent_id":"0","status":"1","created_at":"2019-03-05 22:00:04","updated_at":"2019-03-05 22:00:04","title":"Procesando","translations":[{"id":11,"title":"Processing","order_status_id":"1","locale":"en"},{"id":25,"title":"Procesando","order_status_id":"1","locale":"es"}]},"notify":"1","created_at":"15\/04\/19 13:03:36","updated_at":"15\/04\/19 13:03:36"}],"items":[{"id":155,"order_id":"36","product_id":"2","title":"Hamburguesa","quantity":"1","price":"2.00","total":"2.00","created_at":"15\/04\/19 13:03:37","updated_at":"15\/04\/19 13:03:37"},{"id":156,"order_id":"36","product_id":"1","title":"Pizza","quantity":"1","price":"10.00","total":"30.00","created_at":"15\/04\/19 13:03:37","updated_at":"15\/04\/19 13:03:37","options":[{"id":58,"order_id":"36","order_item_id":"156","option_value":"Familiar","price":"10.00","price_prefix":"+","points_prefix":"+","weight":"0.00","weight_prefix":"+","created_at":"15\/04\/19 13:03:37","updated_at":"15\/04\/19 13:03:37"},{"id":59,"order_id":"36","order_item_id":"156","option_value":"salsa 1","price":"10.00","price_prefix":"+","points_prefix":"+","weight":"0.00","weight_prefix":"+","created_at":"15\/04\/19 13:03:37","updated_at":"15\/04\/19 13:03:37"}]}]}}
			this.getOrder(order)
		},
		methods: {
			getOrder(val){
				this.order = val.data
			}
		}
	}
</script>

<style lang="stylus">
	
</style>