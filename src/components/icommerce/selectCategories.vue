<template>
	<div>
		<treeselect
			@input="handleChangeSelect"
			class="q-title"
			:clearable="false"
			:options="categories" v-model="select"
			placeholder="Selecciona una opción"
		/>
	</div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import commerceServices from "@imagina/qcommerce/_services";

  export default {
    name: "selectCategories",
	  components:{
      Treeselect
	  },
	  data(){
      return {
        select: null,
        categories: []
      }
	  },
    mounted() {
      this.$nextTick(function () {
        this.getCategories()
	      
      })
    },
	  methods:{
      handleChangeSelect(){
        this.$router.push({ name: 'products.index', params: {slugCategory: this.select}})
      },
      getCategories() {
        this.loading = true
        let params = {
          refresh: true,
          params: {
            filter:{
              order:
                {
                  field:"position",
                  way:"asc"
                }
            }
          }
        }
        commerceServices.crud.index('apiRoutes.eCommerce.categories', params).then(response => {
	        this.categories = response.data.map( item => ({label: item.title, id: item.slug}))
	        this.select = this.$route.params.slugCategory
          this.loading = false
        }).catch(error => {
          console.warn('Error getting categories',error)
          this.loading = false
        })
      },
	  }
  }
</script>

<style scoped>

</style>