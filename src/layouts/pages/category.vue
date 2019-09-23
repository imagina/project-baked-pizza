<template>
  <section class="container-fluid">
    <breadcrumb-component name="Pide en linea" image="statics/header-pide.jpg"/>
    <div class="container-section">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-3">
          <div class="label bg-deep-orange-7 text-white full-width title-menu">
            <span>· Nuestro Menú ·</span>
          </div>
          <q-list sublabel-lines id="pide-menu">
            <menuCategories/>
          </q-list>
        </div>

        <div class="col-md-9" v-if="!showProduct">
          <div class="row grid-products" v-if="products.length">
            <div class="col-xs-12 col-sm-12 col-md-4" align="center" v-for="product in products" :key="product.id">
              <div class="card-product-img">
                <img :src="product.mainImage.path"  class="responsive m-w-100">
                <q-btn 
                  type="submit" 
                  label="Pedir" 
                  color="red" 
                  sence 
                  class="q-my-md round-borders-0 btn-add-card" @click="productSelected(product)"/>
              </div>
              <div class="q-mt-lg">
                <span class="q-display-1 color-baked-title">{{product.name}}</span>
                <p class="baked-price">${{product.price}}</p>
              </div>
            </div>
          </div>
          <div class="row" v-else align="center">
            <div class="col-md-12">
              <span class="q-display-1 color-baked-title">No hay productos que concuerden con la selección.</span>
            </div>	
          </div>
          <q-inner-loading :visible="visible">
            <q-spinner size="50px" color="red"></q-spinner>
          </q-inner-loading>
        </div>
        <showComponent v-else :products="products" :product="selected"/>

      </div>
    </div>
  </section>
</template>

<script>
  import icommerceService from 'src/services/icommerce/index'
  import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
  import menuCategories from '@imagina/qcommerce/_components/frontend/categories/menu'
  import showComponent from 'src/components/icommerce/show'

  export default {
    components:{
      breadcrumbComponent,
      menuCategories,
      showComponent
    },
    data(){
      return{
        showProduct:false,
        selected:{
          product:{}
        },
        visible:false,
        products:[]
      }
    },
    mounted(){
      this.getProducts(this.$route.params.slug)
    },
    methods:{
      getProducts(slug){
        this.visible = true
        let params = {
          params:{
            filter:{
              categorySlug:slug,
              locale:'es'
            },
            include:'productOptions,optionValues'
          }
        }
        icommerceService.crud
        .index('apiRoutes.eCommerce.products',params)
        .then(response=>{
          this.products = response.data
          this.visible = false
        })
        .catch(error=>{
          console.warn(error)
          this.visible = false
        })
      },
      refreshCategories(slug){
        this.showProduct = false
        this.getProducts(slug)
      },
      productSelected(product){
        this.showProduct = true
				this.selected.product = product
      }
    }
  }
</script>