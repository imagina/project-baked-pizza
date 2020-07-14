<template>
	<div>
		<div class="row gutter-sm">
			<card-details
				class="col-12 col-md-4"
				v-for="(order, key) in orders"
				:order="order"
				:key="key" />
		</div>
		<infinite-loading @infinite="getOrders">
			<div slot="no-more">&nbsp;No hay mas resultados</div>
			<div slot="no-results" class="q-pt-lg">&nbsp;Sin resultados</div>
		</infinite-loading>
	</div>
</template>

<script>
  import commerceServices from "@imagina/qcommerce/_services";
  import infiniteLoading from 'vue-infinite-loading';
  import cardDetails from "src/components/icommerce/order/cardDetails";

  export default {
    props:{
      status: {
        type: String,
	      required: true,
      }
    },
    components:{
      infiniteLoading,
      cardDetails
    },
    data(){
      return{
        orders: [],
        page: 1,
        rowsPerPage: 10,
      }
    },
	  methods: {
      getOrders($state){
				const params = {
          refresh: true,
          params: {
            filter: {
              customer: this.$store.state.auth.userId,
              status: this.status,
              order:{
                field: 'id',
                way: 'DESC'
              }
            },
            page: this.page,
            take: this.rowsPerPage,
            include: 'orderItems.product',
          }
				}
        commerceServices.crud.index('apiRoutes.eCommerce.orders', params).then(response => {
          if(response.data.length){
            this.page += 1
            this.orders.push(...response.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        }).catch(error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          $state.complete()
        })
      }
	  }
  }
</script>

<style scoped>

</style>