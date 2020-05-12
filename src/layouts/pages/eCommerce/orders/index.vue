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
            <div v-for="(order, i) in table.data.processing" :key="i">
              <p>{{ order.total }}</p>
            </div>
            <infinite-loading @infinite="infinite1"></infinite-loading>
          </q-tab-pane>
          <q-tab-pane name="tab-completed">
            <div v-for="(order, j) in table.data.completed" :key="j">
              <p>{{ order.total }}</p>
            </div>
            <infinite-loading @infinite="infinite2"></infinite-loading>
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

  export default {
    components: {
      innerLoading,
      infiniteLoading,
    },
    mounted() {
      this.$nextTick(function () {
        this.getDataTable()
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
            status: 1,
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
      //Request products with params from server table
      async getDataTable(refresh = false) {
        await this.getdata({pagination: this.table.pagination}, refresh)
        await this.getdata2({pagination: this.table.pagination}, refresh)
      },
      //Get processing orders
      async getdata({pagination, filter}, refresh = false) {
        this.loading = true
        //Params to request
        let params = {
          refresh: refresh,
          params: {
            filter: Object.assign({}, this.table.filter1, this.table.filters1),
            page: pagination.page,
            take: pagination.rowsPerPage,
          }
        }
        //Request
        commerceServices.crud.index('apiRoutes.eCommerce.orders', params)
        .then(response => {
          this.table.data.processing = response.data
          this.table.pagination.page = response.meta.page.currentPage
          this.table.pagination.rowsNumber = response.meta.page.total
          this.table.pagination.rowsPerPage = pagination.rowsPerPage
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error, 'bottom')
        })
      },
      async infinite1(handler){
        this.table.pagination ++
        await this.getdata({pagination: this.table.pagination})
        handler.loaded()
      },
      //Get completed orders
      async getdata2({pagination, filter}, refresh = false) {
        this.loading = true
        //Params to request
        let params = {
          refresh: refresh,
          params: {
            filter: Object.assign({}, this.table.filter2, this.table.filters2),
            page: pagination.page,
            take: pagination.rowsPerPage,
          }
        }
        //Request
        commerceServices.crud.index('apiRoutes.eCommerce.orders', params)
            .then(response => {
              this.table.data.completed = response.data
              this.table.pagination2.page = response.meta.page.currentPage
              this.table.pagination2.rowsNumber = response.meta.page.total
              this.table.pagination2.rowsPerPage = pagination.rowsPerPage
              this.loading = false
            })
            .catch(error => {
              this.loading = false
              this.$helper.alert.error('Failed: ' + error, 'bottom')
            })
      },
      async infinite2(handler){
        this.table.pagination2 ++
        await this.getdata2({pagination: this.table.pagination2})
        handler.loaded()
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
