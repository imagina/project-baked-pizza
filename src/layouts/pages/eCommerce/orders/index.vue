<template>
  <div id="OrderIndexPage" class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      Mis Pedidos
    </h1>

    <!--Content-->
    <div class="relative-position backend-page">
      <!--Table-->
      <div class="col-12">
        <q-tabs class="q-pa-none" inverted>
          <q-tab default slot="title" name="tab-processing" label="Pendientes" />
          <q-tab slot="title" name="tab-completed" label="Confirmados" />
          <q-tab-pane name="tab-processing">
              <div class="row gutter-sm">
                <card-details class="col-12 col-md-4" v-for="(order, i) in table.data.processing" :order="order" :key="i" />
              </div>
            <infinite-loading @infinite="infinite1">
                <div slot="spinner">Cargando...</div>
                <div slot="no-more">No hay más ordenes de compra disponibles</div>
                <div slot="no-results">Sin Resultados</div>
            </infinite-loading>
          </q-tab-pane>
          <q-tab-pane name="tab-completed">
              <card-details v-for="(order, j) in table.data.completed" :key="j" :order="order" />
              <infinite-loading @infinite="infinite2">
                  <div slot="spinner">Cargando...</div>
                  <div slot="no-more">No hay más ordenes de compra disponibles</div>
                  <div slot="no-results">Sin Resultados</div>
              </infinite-loading>
          </q-tab-pane>
        </q-tabs>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading" />
    </div>
  </div>
</template>

<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Component
  import innerLoading from 'src/components/master/innerLoading'
  import infiniteLoading from 'vue-infinite-loading';
  import cardDetails from "src/components/icommerce/order/cardDetails";

  export default {
    components: {
      innerLoading,
      infiniteLoading,
      cardDetails,
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
            customer:this.$store.state.auth.userId,
            status: '1,11',
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
            status: 13,
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
      async infinite1(handler){
          //Params to request
          let params = {
              refresh: true,
              params: {
                  filter: Object.assign({}, this.table.filter1, this.table.filters1),
                  page: this.table.pagination.page,
                  take: this.table.pagination.rowsPerPage,
                  include: 'orderItems.product',
              }
          }
          //Request
          commerceServices.crud.index('apiRoutes.eCommerce.orders', params)
              .then(response => {
                  this.table.data.processing = this.table.data.processing.concat(response.data)
                  if(response.meta && response.data.length > 0) {
                      this.table.pagination.page = response.meta.page.currentPage
                      this.table.pagination.rowsNumber = response.meta.page.total
                      this.table.pagination.rowsPerPage = response.meta.page.perPage
                      this.table.pagination.page++
                      handler.loaded()
                  }else{
                      handler.complete()
                  }
              })
              .catch(error => {
                  this.$helper.alert.error('Failed: ' + error, 'bottom')
                  handler.complete()
              })
      },
      async infinite2(handler){
          //Params to request
          let params = {
              refresh: true,
              params: {
                  filter: Object.assign({}, this.table.filter2, this.table.filters2),
                  page: this.table.pagination2.page,
                  take: this.table.pagination2.rowsPerPage,
                  include: 'orderItems.product',
              }
          }
          //Request
          commerceServices.crud.index('apiRoutes.eCommerce.orders', params)
              .then(response => {
                  this.table.data.completed = this.table.data.completed.concat(response.data)
                  if(response.meta && response.data.length > 0) {
                      this.table.pagination2.page = response.meta.page.currentPage
                      this.table.pagination2.rowsNumber = response.meta.page.total
                      this.table.pagination2.rowsPerPage = response.meta.page.perPage
                      this.table.pagination2.page++
                      handler.loaded()
                  }else{
                      handler.complete()
                  }
              })
              .catch(error => {
                  this.$helper.alert.error('Failed: ' + error, 'bottom')
                  handler.complete()
              })
        handler.complete()
      },
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #OrderIndexPage
      .q-search
        width 258px
</style>
