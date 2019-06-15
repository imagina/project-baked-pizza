<template>
  <div>
    <q-collapsible 
      :label="category.title" 
      v-for="category in categories" 
      :key="category.id"
       @show="getdata(category)"
      class="pide-menu__category" 
      :group="group">
      <div class="pide-menu__subcategory">
        <menu-menucategories 
        :parent="category.id" 
        @category="getdata(category)" 
        :group="category.title"/>
      </div>
    </q-collapsible>
    <q-inner-loading 
      :visible="visible" >
      <q-spinner 
        size="50px" 
        color="red"/>
    </q-inner-loading>
  </div>
</template>

<script>
  import icommerceService from 'src/services/icommerce/index'
  import menuCategories from 'src/components/Menucategories';

  export default {
    name: 'menu-menucategories',
    components:{
      'menucategories-component': menuCategories,
    },
    props:['parent', 'group'],
    data(){
      return{
        visible: false,
        showSubMenu: false,
        categories: [],
        subcategories: [],
      }
    },
    mounted(){
      this.getCategories()
    },
    methods:{
      getCategories () {
        this.visible = true
        let params = {
          params:{
            filter:{
              parent_id:this.parent
            }
          }
        }
        icommerceService.crud
        .index('apiRoutes.eCommerce.categories',params)
        .then(response =>{
          this.categories = response.data
          this.visible = false
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      getdata(category){
        this.$emit('categorySlug', category.slug)
        this.$router.push({ name: 'category' , params: { slug : category.slug } })
      },
    }
  }
</script>

<style lang="stylus">
  .label
    display -webkit-inline-box
    display -ms-inline-flexbox
    display inline-flex
    -webkit-box-orient horizontal
    -webkit-box-direction normal
    -ms-flex-direction row
    flex-direction row
    -webkit-box-align center
    -ms-flex-align center
    align-items center
    min-width 10px
    border-radius 2px
    padding .3rem .7rem
    line-height 1
    white-space nowrap
    text-align center
    vertical-align middle
    width 90%
    justify-content center
    font-size 2em
    border-radius 5px
</style>