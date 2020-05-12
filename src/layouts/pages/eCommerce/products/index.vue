<template>
  <section>
    <breadcrumb-component
      class="q-mb-lg desktop-only"
      name="Pide en linea"
      image="statics/header-pide.jpg"/>

    <div class="q-container relative-position">
      <div class="row gutter-x-sm q-mb-md"
        v-if="!isValidateAddress"
        style="background:#c4c4c438;border-radius: 17px;">
        <div class="col-md-12 flex flex-center gutter-x-sm q-mt-lg">
          <p>Ingresa tu dirección para comenzar tu pedido</p>
        </div>
        <div
          class="col-md-12 flex flex-center gutter-x-sm q-mb-md">
          <validateAddressComponent
          :whitLabels="false"
          @addressValidated="isValidateAddress = true"/>
        </div>
      </div>

      <div class="row gutter-x-sm" style="min-width: 150px" v-else>
        <div class="col-xs-12 col-sm-12 col-md-3 desktop-only">
          <menu-categories class="widgetMenuCategories" title="· Nuestro Menú ·" />
        </div>
        <div :class="$q.platform.is.desktop ? 'col-12 col-md-9' : 'col-12'">
          <div
            class="row gutter-x-sm"
            v-if="products.length">
            <router-link
              tag="div"
              v-for="(product, index) in products"
              :key="index"
              :class="'col-12' + ($q.platform.is.desktop ? ' col-md-4': ' col-md-6 col-xl-4') +' text-center product'"
              :to="{name:'product.show', params: { slugProduct: product.slug }}">
              <div v-if="$q.platform.is.desktop">
                <div
                        :style="`background-image: url(${product.mainImage.path});`"
                        class="product-img">
                  <q-btn
                          :to="{name:'product.show', params: { slugProduct: product.slug }}"
                          label="Pedir"
                          color="primary"
                          class="q-btn inline q-my-md btn-product"/>
                </div>
                <div class="q-mt-lg">
                  <span class="q-display-1 color-baked-title">
                    {{product.name}}
                  </span>
                  <p class="">
                    {{$n(product.price) | money }}
                  </p>
                </div>
              </div>
              <div class="row q-mb-md gutter-sm" v-else>
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
                  <div :style="`background-image: url(${product.mainImage.path});`" class="product-img">
                    &nbsp;
                  </div>
                </div>
              </div>
              <!---->
            </router-link>
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
    components:{
      validateAddressComponent,
      breadcrumbComponent,
      menuCategories,
      innerLoading,
      recursiveTab
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
    background-size: cover;
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
