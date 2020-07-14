<template>
  <div id="OrderIndexPage" class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      Mis Pedidos
    </h1>

    <!--Content-->
    <div class="relative-position backend-page relative-position" style="min-height: 500px">
      <!--Table-->
      <div class="col-12">
        <q-tabs class="q-pa-none" inverted>
          <q-tab default slot="title" name="tab-processing" label="En Preparacion" />
	        
          <q-tab slot="title" name="tab-on-way" label="En Camino" />
	        
	        <q-tab slot="title" name="tab-completed" label="Completados" />
	        
          <q-tab-pane name="tab-processing">
            <orders status="11"></orders>
          </q-tab-pane>
	        
          <q-tab-pane name="tab-on-way">
	          <orders status="2"></orders>
          </q-tab-pane>
	        
	        <q-tab-pane name="tab-completed">
		        <orders status="4"></orders>
	        </q-tab-pane>
	        
        </q-tabs>
      </div>
      <!--Loading-->
      <inner-loading :show="loading" />
    </div>
  </div>
</template>

<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Component
  import innerLoading from 'src/components/master/innerLoading'
  import infiniteLoading from 'vue-infinite-loading';
  import orders from "src/components/icommerce/order/orders.vue";

  export default {
    components: {
      innerLoading,
      infiniteLoading,
      orders
    },
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        table: {
          data: {
            processing: [],
            completed: [],
          },
          columns: [
          {
            name: 'id',
            label: 'Numero de pedido',
            field: 'id',
          },
          {
            name: 'total',
            label: 'TOTAL',
            field: 'total',
          },
          {
            name: 'statusName',
            label: 'ESTADO',
            field: 'statusName',
          },
          {
            name: 'paymentCity',
            label: 'CIUDAD',
            field: 'paymentCity',
          },
          {
            name: 'paymentZone',
            label: 'DEPARTAMENTE',
            field: 'paymentZone',
          },
          {
            name: 'paymentCountry',
            label: 'PAIS',
            field: 'paymentCountry',
          },
          {
            name: 'email',
            label: 'E-MAIL',
            field: 'email',
          },
          {
            name: 'shippingMethod',
            label: 'MÉTODO DE ENVÍO',
            field: 'shippingMethod',
          },
          {
            name: 'actions',
            label: 'ACCIONES',
            field: 'actions',
          },
        ],
          pagination: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          pagination2: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          filter1: {
            search: null,
            customer: this.$store.state.auth.userId,
            status: '1,11,13',
            order:{
              field:'id',
              way:'DESC'
            }
          },
          filters1: {

          },
          filter2: {
            search: null,
            customer:this.$store.state.auth.userId,
            status: '4',
            order:{
              field:'id',
              way:'DESC'
            }
          },
          filters2: {

          },
          options: {
            statuses: [],
          }
        },
        loading: false,
      }
    },
    methods: {

    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #OrderIndexPage
      .q-search
        width 258px
</style>
