<template>
  <div class="row">
    <div class="col-md-12 flex flex-center">
      <div class="q-mx-sm" 
        v-for="(category, index) in categories"
        :key="index"
        style="display: inline-block;">
        <div class="flex flex-center text-white border">
          <div
            class="flex flex-center text-white circle text-center" 
            :style="`background: url(${category.mainImage.path}) no-repeat center;`">
            {{category.title}}
            <q-btn 
              label="pedir" 
              color="red" 
              :to="{name:'category', params: { slug: category.slug }}"
              rounded style="position: absolute; margin-top: 38px;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import icommerceService from 'src/services/icommerce/index'
  export default {
    data(){
      return{
        categories:[],
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        let params = {
          params:{}
        }
        icommerceService.crud
        .index('apiRoutes.eCommerce.categories',params)
        .then(response => {
          this.categories = response.data
        })
        .catch(error=>{
          console.warn(error)
        })
      }
    }
  }
</script>
