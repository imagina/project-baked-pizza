<template>
    <div>
        <div class="row"> <!--== TITLE ==-->
            <div class="col-xs-12 col-sm-12 col-md-12 q-mb-xl">
                <div class="q-display-2 color-baked-title" align="center">Orden # {{ order.id }}</div>
            </div>
        </div>

        <div class="row"> <!--== COMPONENTS CHECKOUT ==-->
            <div class="col-12"> <!--== ACTION BUTTON ==-->
                <q-card>
                    <q-card-title>
                        DATOS DE SU ORDEN
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <dl>
                            <dt class="q-title">NÚMERO DE PEIDO: {{ order.id }}</dt>
                            <dt class="q-title">FECHA: {{ order.created_at }}</dt>
                            <dt class="q-title">CORREO: {{ order.email }}</dt>
                            <dt class="q-title">TIENDA: {{ order.store_name }}</dt>
                            <dt class="q-title">DIRECCIÓN DE TIENDA: {{ order.store_address }}</dt>
                            <dt class="q-title">TOTAL: $ {{ order.total }}</dt>
                            <dt class="q-title">FORMA DE PAGO: {{ order.payment_name }}</dt>
                        </dl>
                    </q-card-main>
                </q-card>

            </div>
        </div>
        
        <div class="row" v-if="this.$q.platform.is.desktop">
            <div class="col-md-12">
                <q-card>
                    <q-card-title>
                        DETALLES DEL PEDIDO
                    </q-card-title>
                    <q-card-main>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-left">Descripción del producto</th>
                                    <th>Precio unitario</th>
                                    <th>Cantidad</th>
                                    <th>Adicionales</th>
                                    <th>Sub-Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) of order.items" :key="index">
                                    <td class="text-left">{{ product.title }}</td>
                                    <td class="text-center">$ {{ product.price }}</td>
                                    <td class="text-center">{{ product.quantity }}</td>
                                    <td class="text-center">
                                        <div v-if="!product.options">
                                            ---
                                        </div>
                                        <div v-for="(option, i) of product.options" :key="i">{{ option.option_value }} ( {{ option.price_prefix }} $ {{ option.price }} )</div>
                                    </td>
                                    <td class="text-center">$ {{ product.total }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4"></td>
                                    <td colspan="2">TOTAL: <span class="table-price__total">$ {{order.total}}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                    </q-card-main>
                </q-card>
            </div>
        </div>

        <div class="row" v-else>
            <div class="col-md-12">
                <q-card>
                    <q-card-title>
                        DETALLES DEL PEDIDO
                    </q-card-title>
                    <q-card-main>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-left">Descripción del producto</th>
                                    <th>Sub-Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) of order.items" :key="index">
                                    <td class="text-left">{{ product.title }} X {{ product.quantity }}</td>
                                    <td class="text-center">$ {{ product.total }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2">TOTAL: <span class="table-price__total">$ {{order.total}}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                    </q-card-main>
                </q-card>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <q-card>
                    <q-card-title>
                        DATOS DE FACTURACIÓN
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <dl>
                            <dt class="q-title">NOMBRE: {{ order.payment_first_name }} {{ order.payment_last_name }}</dt>
                            <dt class="q-title">COMPAÑIA: {{ order.payment_company }}</dt>
                            <dt class="q-title">DIRECCIÓN: {{ order.shipping_address_1 }}</dt>
                            <dt class="q-title">PAIS: {{ order.payment_country }}</dt>
                            <dt class="q-title">CIUDAD: {{ order.payment_city }}</dt>
                            <dt class="q-title">ZONA: {{ order.payment_zone }}</dt>
                            <dt class="q-title">CÓDIGO POSTAL: {{ order.payment_zip_code }}</dt>
                        </dl>
                    </q-card-main>
                </q-card>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">
                <q-card>
                    <q-card-title>
                        DATOS DE ENVIO
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <dl>
                            <dt class="q-title">NOMBRE: {{ order.shipping_first_name }} {{ order.shipping_last_name }}</dt>
                            <dt class="q-title">COMPAÑIA: {{ order.shipping_company }}</dt>
                            <dt class="q-title">DIRECCIÓN: {{ order.shipping_address_1 }}</dt>
                            <dt class="q-title">PAIS: {{ order.shipping_country }}</dt>
                            <dt class="q-title">CIUDAD: {{ order.shipping_city }}</dt>
                            <dt class="q-title">ZONA: {{ order.shipping_zone }}</dt>
                            <dt class="q-title">CÓDIGO POSTAL: {{ order.shipping_zip_code }}</dt>
                        </dl>
                    </q-card-main>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
	export default{
		data() {
			return {
			}
        },
        props: ['order'],
	}
</script>

<style lang="stylus">
	
</style>