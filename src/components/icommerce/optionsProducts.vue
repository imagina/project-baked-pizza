<template>
  <div>
    
    <div 
      class="row"
      v-for="(option,index) in options" 
      :key="index">
      <pre v-show="false">{{option.model}}</pre>
      <div class="col-md-12">
        <p><b>{{ option.description }}</b></p>
      </div>

      <div 
        class="col-md-12"
        v-if="option.type == 'select'">
        <p>
          <q-select 
          placeholder="Selecciona Opcion"
          @input="getTotalOptions()"
          v-model="option.model"  
          :options="option.values" />
        </p>
      </div>

      <div 
        class="col-md-12"
        v-if="option.type == 'radio'">
        <span 
          v-for="(item, index2) in option.values" 
          :key="index2">
 
          <label>
            <input 
              @input="getTotalOptions()"
              v-model="option.model" 
              type="radio" 
              :value="item.value" 
              class="radio">
            <img  
              :src="item.value.mainImage.path" 
              class="responsive m-w-100 imgradio">
          </label>
        </span>
      </div>

      <div v-if="option.type =='checkbox'">
        <p>
          <q-checkbox
            @input="getTotalOptions()"
            style="display: block;"
            v-for="(item, index3) in option.values" 
            :key="index3"
            v-model="option.model" 
            :true-value="item.value"
            :false-value="false"
            :val="item.value">
            {{`${item.value.optionValue} (${item.value.pricePrefix}$${item.value.price})`}}
        </q-checkbox>
        </p>

      </div>
    </div>
    <div class="col-md-12 q-pt-md">
      <p style="display:inline">
        <b>Cantidad</b>
      </p>
      <input 
        label="Cantidad"
        type="number" 
        class="input-count-product col-xs-12 col-sm-12 col-md-5" 
        min="0"  
        v-model="quantity">
    </div>
    <div 
      class="col-md-12 q-pt-md">
      <p>Precio <b>${{total * quantity}}</b></p>
    </div>

  </div>
</template>

<script>
  export default {
    props:{
      product:{
        type:Object,
        default:{}
      }
    },
    data(){
      return{
        selectedOptions:false,
        options:[],
        total:0,
        quantity:1,
      }
    },
    computed:{
    },
    watch:{
      product(last, old){
        this.getOptions()
      }
    },
    mounted(){
      this.getOptions()
    },
    methods:{
      select(array){
        return array.map(item=>{
          return {label:`${item.optionValue} (${item.pricePrefix}$${item.price})`, value:item}
        })
      },
      getOptions(){
        let response = []
        for(let productOption of this.product.productOptions){
          let values = this.product.optionValues.filter(optionValue =>{
            return optionValue.productOptionId == productOption.id
          })
          let option = {
            id: productOption.id,
            type: productOption.type,
            description: productOption.description,
            productId: productOption.productId,
            optionId: productOption.optionId,
            model: productOption.type == 'checkbox' ? [] : '',
            values:this.select(values)
          }
          response.push(option)
        }
        this.total = parseInt(this.product.price)
        this.quantity = 1
        this.options = response
      },
      getTotalOptions(){
        this.total = parseInt(this.product.price)
        this.options.forEach(option=>{
          if(option.type == 'checkbox'){
            option.model.forEach(item=>{
              if(item.pricePrefix == '+'){
                this.total = this.total + parseInt(item.price)
              }
              if(item.pricePrefix == '-'){
                this.total = this.total - parseInt(item.price)
              }
            })
          }else{
            if(option.model.pricePrefix == '+'){
              this.total = this.total + parseInt(option.model.price)
            }
            if(option.model.pricePrefix == '-'){
              this.total = this.total - parseInt(option.model.price)
            }
          }
        })
      }
    }
  }
</script>