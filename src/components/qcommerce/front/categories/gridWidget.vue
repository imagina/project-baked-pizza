<template>
  <div>
    <div 
      class="row" 
      v-for="(item, index) of body" 
      :key="index">
      <categoryitemComponent 
        :data="item.row" />
    </div>
  </div>
</template>

<script>
  //services
  import categoryService from 'src/services/categories';

  //components
  import categoryitemComponent from 'src/components/icommerce/categoryitembody'

  export default {
    name: 'categorieshome',
    components: {
      categoryitemComponent
    },
    data() {
      return {
        categories: [],
        countcategories: 0,
        parent: 0,
        body: [],
      }
    },
    props: [''],
    methods: {
        createBody: function(categories){
            let resul   = []
            let section = 1
            let i       = 1
            let objeto  = []

            for (let index = 0; index < categories.length; index++) {
                
                if(section === 1){

                    objeto.push({
                        id      : categories[index].id,
                        title   : categories[index].title,
                        img     : 'statics/categories/entradas.jpg'
                    })

                    if (index + 1 === categories.length || i === 3) {
                        resul.push({type : '3' , row : objeto })
                        section = 2
                        i       = 1
                        objeto  = []
                    }

                    i++

                }else{

                    objeto.push({
                        id      : categories[index].id,
                        title   : categories[index].title,
                        img     : 'statics/categories/entradas.jpg'
                    })

                    if (index + 1 === categories.length || i === 7) {
                        resul.push({type : '4' , row : objeto })
                        section = 1
                        i       = 1
                        objeto  = []
                    }
                    i++
                    
                }
            }
            
            return resul
        },
        getCategories: function () {
            this.visible = true
            categoryService.index({parent_id: this.parent})
            .then(response =>{
            this.categories         = response.data
            this.visible            = false
            this.countcategories    = this.categories.length
            this.body               = this.createBody(this.categories)
            })
        }
    },
    mounted(){
      this.categories = this.getCategories();
    },
}
</script>
