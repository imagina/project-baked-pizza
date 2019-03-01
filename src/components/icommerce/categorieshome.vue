<template>
    <div>
        <div class="row" v-for="(item, index) of body" :key="index">
            <categoryitemComponent :data="item.row" />
        </div>
        <!--<div class="row">
            <div class="col-md-12 flex flex-center">
                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/entradas.jpg') no-repeat center;">
                            Entradas
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/pizzas.jpg') no-repeat center;">
                            Pizzas
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/hamburguesas.jpg') no-repeat center;">
                            Hamburguesas
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 flex flex-center">
                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/sandwiches.jpg') no-repeat center;">
                            Sandwiches
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/pastas.jpg') no-repeat center;">
                            Pastas
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/panzerottis.jpg') no-repeat center;">
                            Panzerottis
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/crepes.jpg') no-repeat center;">
                            Crepes
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 flex flex-center">
                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/postres.jpg') no-repeat center;">
                            Postres
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/bebidas.jpg') no-repeat center;">
                            Bebidas
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>

                <div class="q-mx-sm" style="display: inline-block;">
                    <div class="flex flex-center text-white border">
                        <div class="flex flex-center text-white circle" style="background: url('statics/categories/otros.jpg') no-repeat center;">
                            Otros
                            <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
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
