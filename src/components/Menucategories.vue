<template>
  <div>
    <q-collapsible :label="category.title" v-for="category in categories" :key="category.id" @show="getdata(category.id)" class="pide-menu__category" :group="group">
      <div class="pide-menu__subcategory">
        <menu-menucategories :parent="category.id" @category="getdata" :group="category.title"/>
      </div>
    </q-collapsible>
    <q-inner-loading :visible="visible" style="background-color: #f4f4f4c7">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
  </div>
</template>

<script>
  import categoryService from 'src/services/categories';
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
      getCategories: function () {
        this.visible = true
        categoryService.index({parent_id: this.parent})
          .then(response =>{
          this.categories = response.data
          this.visible = false
        })
      },
      getdata(id){
        this.$emit('category', id)
      },
    }
  }
</script>

<style>
  .label {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-width: 10px;
    border-radius: 2px;
    padding: .3rem .7rem;
    line-height: 1;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    width: 90%;
    justify-content: center;
    font-size: 2em;
    border-radius: 5px;
  }

  .category{
    border-bottom: 3px dotted #723D3D;
    color: #723D3D;
    font-size: 1.8em;
    line-height: 60px;
    margin-bottom: 0;
    margin-right: 25px;
    list-style-type: none;
    transition: .4s all;
    cursor: pointer;
  }

  .subcategory{
    padding-left: 20px;
    color:#c2c2c2;
  }
</style>