<template>
  <section>
    <breadcrumb-component
      class="q-mb-lg desktop-only"
      name="Pide en linea"
      image="statics/header-pide.jpg"/>

    <div class="q-container relative-position" >
      <div class="row q-mb-md"
        v-if="!isValidateAddress"
        style="background:#c4c4c438;border-radius: 17px;">
        <div class="col-12 text-center q-mt-lg">
            <p>Ingresa tu dirección para comenzar tu pedido</p>
        </div>
        <div
          class="col-12 q-mb-md">
          <validateAddressComponent
          :whitLabels="false"
          @addressValidated="isValidateAddress = true"/>
        </div>
      </div>

      <div class="row gutter-x-sm" style="min-width: 150px" v-else>
	      
	      <div class="col-12">
					<div class="row">
						
						<div class="col-xs-12 col-md-8 q-px-md">
							
							<div class="col-12 desktop-only q-mb-lg">
								<div class="row">
									<div class="col-md-3">
										<div
											class="bg-primary text-white text-center flex flex-center q-mr-lg"
											style="border-radius: 10px; height: 70%">
											<div>
												<div class="q-title">
													- Nuestro Menú -
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-6 q-mb-md">
										<selectCategories/>
									</div>
								</div>
							</div>
							
							<div
								class="row gutter-x-sm"
								v-if="products.length">
								<div
									v-for="(product, index) in products"
									:key="index"
									:class="'col-12' + ($q.platform.is.desktop ? ' col-md-6': ' col-md-6 col-xl-4') +'  '">
									<div v-if="$q.platform.is.desktop">
										<div class="row q-mb-lg">
											<div class="col-7 col-sm-7">
												<div class="q-mt-lg">
			                    <span class="q-headline color-baked-title text-bold">
				                    <router-link
					                    tag="div"
					                    class="product"
					                    :to="{name:'product.show', params: { slugProduct: product.slug }}">
					                    {{product.name}}
				                    </router-link>
			                    </span>
													<p class="q-body-1">
														{{ product.summary }} <br>
														<span class="color-baked-subtitle q-title">
														{{$n(product.price) | money }}
													</span>
													</p>
												</div>
											</div>
											<div class="col-5 col-sm-5">
												<div
													:style="`background-image: url(${product.mainImage.path}); height:150px; position: relative`"
													class="product-img flex flex-center content-end">
													<q-btn
														dense
														size="md"
														:to="{name:'product.show', params: { slugProduct: product.slug }}"
														color="primary"
														style="position: absolute; bottom: -15px;"
														class="">
														<div class="q-mx-md">
															Pedir
														</div>
													</q-btn>
												</div>
											</div>
										</div>
										<hr>
									</div>
									<router-link
										tag="div"
										v-else
										class="row q-mb-md gutter-sm product"
										:to="{name:'product.show', params: { slugProduct: product.slug }}">
										<div class="col-7 col-sm-6">
											<div class="q-mt-lg">
		                    <span class="q-title color-baked-title">
		                      {{product.name}}
		                    </span>
												<p class="q-caption">
													{{ product.summary }}
												</p>
												<p class="">
													{{$n(product.price) | money }}
												</p>
											</div>
										</div>
										<div class="col-5 col-sm-6">
											<div :style="`background-image: url(${product.mainImage.path});`" class="product-img">                    &nbsp;
											</div>
										</div>
									</router-link>
									<!---->
								</div>
							</div>
						</div>
						<div class="col-md-4 desktop-only" >
							<myOrder/>
						</div>
					</div>
	      </div>
          <div
	          class="row q-mb-lg"
	          v-if="paginate.maxPages > 1">
            <div class="col-md-12 flex justify-end q-pt-xl">
              <q-pagination
                direction-links
                @input="getProducts()"
                v-model="paginate.page"
                :min="paginate.minPages"
                :max="paginate.maxPages" />
            </div>
          </div>
	      <!--old components-->
        <div class="col-12" v-if="false">
          <div
            class="row gutter-x-sm"
            v-if="products.length">
            <div
		          v-for="(product, index) in products"
		          :key="index"
		          :class="'col-12' + ($q.platform.is.desktop ? ' col-md-6': ' col-md-6 col-xl-4') +'  product'">
              <div v-if="$q.platform.is.desktop">
	              <div class="row">
		              <div class="col-7 col-sm-9">
			              <div class="q-mt-lg">
                    <span class="q-display-1 color-baked-title">
                      {{product.name}}
                    </span>
				              <p>
					              {{ product.summary }}
				              </p>
				              <p class="color-baked-subtitle">
					              {{$n(product.price) | money }}
				              </p>
			              </div>
		              </div>
		              <div class="col-5 col-sm-3">
			              <div
				              :style="`background-image: url(${product.mainImage.path}); height:150px`"
				              class="product-img">
			              </div>
		              </div>
	              </div>
	              <hr>
              </div>
              <div class="row q-mb-md gutter-sm" v-else>
                <div class="col-7 col-sm-6">
                  <div class="q-mt-lg">
                    <span class="q-title color-baked-title">
                      {{product.name}}ss
                    </span>
                    <p class="q-caption">
                      {{ product.summary }}
                    </p>
                    <p class="">
                      {{$n(product.price) | money }}
                    </p>
                  </div>
                </div>
                <div class="col-5 col-sm-6">
                  <div :style="`background-image: url(${product.mainImage.path});`" class="product-img">                    &nbsp;
                  </div>
                </div>
              </div>
              <!---->
            </div>
          </div>
          <div
            class="row"
            v-else>
            <div class="col-md-12">
              <span class="q-display-1">
                No hay productos que concuerden con la selección.
              </span>
            </div>
          </div>
          <div
            class="row"
            v-if="paginate.maxPages > 1">
            <div class="col-md-12 flex justify-end q-pt-xl">
              <q-pagination
                direction-links
                @input="getProducts()"
                v-model="paginate.page"
                :min="paginate.minPages"
                :max="paginate.maxPages" />
            </div>
          </div>
        </div>
      </div>
      <inner-loading :visible="visible"></inner-loading>
    </div>
  </section>
</template>

<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'

  // Services
  import icommerceService from '@imagina/qcommerce/_services/index';

  // Components
  import menuCategories from '@imagina/qcommerce/_components/frontend/categories/menu'
  import recursiveTab from 'src/components/master/recursiveTab'
  import validateAddressComponent from 'src/components/icommerce/validateAddress'
  import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
  import innerLoading from 'src/components/master/innerLoading'
  import menuTabs from '@imagina/qcommerce/_components/frontend/categories/menuTabs'
  import myOrder from "../../../../components/icommerce/myOrder";
  import selectCategories from "../../../../components/icommerce/selectCategories";

  export default {
    data(){
      return{
        showProduct:false,
        visible:false,
        products:[],
        categoryChildren:[],
        paginate:{
          page: 1,
          take:10,
          minPages: 1,
          maxPages: 0
        },
        isValidateAddress:true,
      }
    },
    filters:{
      money(val){
        return `$ ${val}`
      }
    },
    computed:{
      priceShipping(){
        if(this.address.coverage!= null){
          return this.address.coverage.price
        }
      }
    },
    components:{
      validateAddressComponent,
      breadcrumbComponent,
      menuCategories,
      innerLoading,
      recursiveTab,
      menuTabs,
      myOrder,
      selectCategories
    },
    watch:{
      $route(to, from) {
        this.getProducts(true)
      }
    },
    created(){
      this.$nextTick( () => {
        this.getProducts(true)
        this.isAddressValidate()
      })
    },
    methods:{
      // Get all products by category :slug
      getProducts(refresh = false){
        this.visible = true
        let params = {
          refresh:refresh,
          remember:false,
          params:{
            filter:{
              status:'1',
              categorySlug:this.$route.params.slugCategory,
              locale:'es'
            },
            include:'productOptions,optionValues',
            take:this.paginate.take,
            page:this.paginate.page,
          }
        }
        icommerceService.crud
        .index('apiRoutes.eCommerce.products',params)
        .then(response=>{
          this.paginate.maxPages = response.meta.page.lastPage
          this.products = response.data
          this.visible = false
        })
        .catch(error=>{
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.visible = false
        })
      },
      isAddressValidate() {
        helper.storage.get.item('dataAddress').then(res => {
          console.warn(res)
          if (res != null) {
            this.isValidateAddress = true
          } else {
            this.isValidateAddress = false
          }
        })
      },
    }
  }

</script>

<style scoped lang="stylus">

  @import "~variables";

  div.product
    cursor pointer

  .product-img
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border: 1px solid #dddddd52
    border-radius 10px
    width: 100%;
    height: 260px;
  @media screen and (max-width: 768px)
    .product-img
      height: 150px;
  .btn-product
    margin-top 240px

  .color-secondary
    color: $secondary

  .color-primary
    color: $secondary
  
</style>