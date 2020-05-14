<template>
  <div>
    <breadcrumb-component
      class="q-mb-lg gt-sm"
      name="Pide en linea"
      image="statics/header-pide.jpg"/>

    <div id="showProductPage" class="q-container">

      <div
        class="row gutter-x-sm"
        v-if="!isValidateAddress"
        style="background:#c4c4c438;border-radius: 17px;">
        <div class="col-md-12 flex flex-center gutter-x-sm q-mt-lg">
          <p>Ingresa tu dirección para comenzar tu pedido</p>
        </div>
        <div
          class="col-md-12 flex flex-center gutter-x-sm q-mb-md">
          <validateaddressComponent
          :whitLabels="false"
          @addressValidated="isValidateAddress = true"/>
        </div>
      </div>

      <div v-else class="row gutter-x-sm q-mt-md ">
        <div class="col-12 col-md-3 desktop-only">
          <menu-categories class="widgetMenuCategories" title="· Nuestro Menú ·"/>
        </div>
        <!--== Content ==-->
        <div id="showProductContent" :class="'col-12' + (this.$q.platform.is.desktop ? ' col-md-9' : '')">
          <div class="relative-position" style="min-height: 150px">
            <!--Product-->
            <div class="row justify-end" v-if="productData">
              <!--Products of same category-->
              <div class="selectorOtherProducts col-12 col-md-7 desktop-only q-mb-lg">
                <div class="q-title q-py-sm q-mr-sm title">
                  Seleccione un Producto:
                </div>
                <select-products :category-id="productData.categoryId" v-model="productSelectd"
                                 @input="$router.push({name: 'product.show', params : {slugProduct : productSelectd}})"/>
              </div>

              <!--Data product-->
              <div class="col-12 row gutter-x-sm content">
                <!--Name and description-->
                <div class="col-12 col-md-4 q-mt-sm'">
                    <div class="q-display-2 color-baked-title text-center">
                        {{productData.name}}
                    </div>
                    <div class="text-center q-pb-md">
                        <img :src="productData.mainImage.path"
                             :class="'responsive m-w-100 full-width' + (this.$q.platform.is.desktop ? '' : ' img-mobile') ">
                    </div>
                </div>
                <!--Image-->
                <div class="col-12 col-md-8">
                    <div v-html="productData.description" class="q-title">{{productData.description}}</div>
                    <add-to-cart :product-id="productData.id" :price="productData.price" :additional-price="false"/>
                </div>
              </div>
            </div>
            <!--Not found-->
            <not-found route-name="products.index" button-label="Go to Products"
                       v-else-if="!loading"/>
            <!--Inner Loading-->
            <inner-loading :visible="loading"></inner-loading>
          </div>
          <!--Inner Loading-->
          <inner-loading :visible="loading"/>
        </div>
        <!--<div class="col-12 col-md-3 mobile-only q-mt-md">
          <menu-categories class="widgetMenuCategories" title="· Nuestro Menú ·"/>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  // Components
  import menuCategories from '@imagina/qcommerce/_components/frontend/categories/menu'
  import innerLoading from 'src/components/master/innerLoading'
  import selectProducts from '@imagina/qcommerce/_components/frontend/products/widgets/selectProducts'
  import addToCart from 'src/components/icommerce/cart/widgets/addToCartOptions'
  import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
  import notFound from 'src/components/404'
  import validateaddressComponent from 'src/components/icommerce/validateAddress'

  // Services
  import icommerceService from '@imagina/qcommerce/_services/index';

  import {helper} from '@imagina/qhelper/_plugins/helper'

  export default {
    props: {},
    components: {
      menuCategories,
      innerLoading,
      selectProducts,
      addToCart,
      breadcrumbComponent,
      notFound,
      validateaddressComponent
    },
    mounted() {
      this.$nextTick(function () {
        this.getData()
        this.isAddressValidate()
      })
    },
    watch: {
      $route(to, from) {
        this.getData()
      }
    },
    data() {
      return {
        loading: false,
        productData: false,
        productSelectd: false,
        isValidateAddress:true,
      }
    },
    computed: {},
    methods: {
      //Get data
      getData() {
        this.loading = true
        let slugProduct = this.$route.params.slugProduct
        let params = {
          refresh: true,
          params: {filter: {field: 'slug'}, include: 'productOptions,optionValues'}
        }
        icommerceService.crud.show('apiRoutes.eCommerce.products', slugProduct, params).then(response => {
          this.productData = response.data//Add data
          this.productSelectd = response.data.slug//Set product selected
          this.loading = false
        }).catch(error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.loading = false
        })
      },
      isAddressValidate(){
				helper.storage.get.item('dataAddress').then(res => {
          if (res != null) {
            this.isValidateAddress = true
          }else{
            this.isValidateAddress = false
          }
        })
			},
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #showProductPage
    margin 25px auto
    #showProductContent
      .border-top
        border-top 2px solid $grey-3

      .selectorOtherProducts
        display flex

        .title
          min-width max-content

      .content
        img
          border 1px solid $grey-3
          border-radius 20px
        @media (max-width: 768px)
          img.img-mobile
            width auto !important
            height 180px !important
            max-width: 100% !important
          img.img-mobile-options
            width auto !important
            height 60px !important
            max-width: 100% !important
        @media (min-width: 768px)
          .options-value-select
            text-align: center!important
      #widgetSelectProducts
        .vue-treeselect
          border 0px
          border-bottom 2px solid $tertiary

          .vue-treeselect__single-value
            font-size 22px
            color $tertiary
            line-height 1.3

          .vue-treeselect__control-arrow-container
            svg
              color $primary

</style>
