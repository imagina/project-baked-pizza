<template>

</template>

<script>
	import optionsComponent from 'src/components/icommerce/optionsProducts'
	export default {
		props:{
			products:{
				type:Array,
				default:[]
			},
			product:{
				type:Object,
				default:{}
			},
		},
		components:{
			optionsComponent
		},
		data(){
			return{
				quantity : 1,
			}
		},
		created(){
		},
		computed:{
			selectProduts(){
				return this.select(this.products)
			},
			calculatePrice(){
			}
		},
		mounted(){
		},
		methods:{
			select(dataArray) {
				return dataArray.map(item=>{
          return {label: item.name ? item.name :'default' , value:item}
        })
			},
			addCart(){
				
			},
		}
	}
</script>