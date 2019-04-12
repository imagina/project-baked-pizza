<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <q-btn color="primary" icon="add" label="Nueva dirección" class="float-rigth" @click="opened = true" />
            </div>
        </div>

        <q-modal v-model="opened" :content-css="{maxWidth: '80vw', minHeight: '80vh'}">
            <q-modal-layout>
                <q-toolbar slot="header">
                <q-btn
                    flat
                    round
                    dense
                    v-close-overlay
                    icon="close"
                />
                <q-toolbar-title>
                    Nueva Dirección
                </q-toolbar-title>
                </q-toolbar>   
                    <addComponent :dataEdit="addressEdit"/>
                </q-modal-layout>
        </q-modal>
        
        <div class="row q-mt-sm">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <q-card class="no-shadow" v-for="(address, index) in addresses" :key="index">
                    <q-card-main>
                        {{address.first_name}} {{address.last_name}}<q-icon name="star" v-if="address.default"/><br>
                        {{address.address_1.address}}<br>
                        {{address.company}}<br>
                    </q-card-main>
                    <q-card-actions>
                        {{address.options.address}}
                        <q-btn flat round dense icon="delete" @click="destroy(address.id)"/>
                        <q-btn flat round dense icon="edit" @click="selectDataEdit(address)"/>
                        <q-item tag="label">
                            <q-item-side>
                                <input v-model="option" type="radio" :value="address.id" class="radio" @click="setUpdatedefault(address.id)">
                            </q-item-side>
                            <q-item-main>
                                <q-item-tile label>Dirección por defecto</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <q-pagination 
				boundary-links  
				v-model="page" 
				:max="parseInt(pagination.lastPage)" 
				color="red" 
				@input="otherPageOrder()" 
				:max-pages="5"/>
            </div>
        </div>
    </div>
</template>

<script>
// Services
import addresService from 'src/services/addresses'

//Tools
import EventBus from 'src/utils/event-bus'
import {alert} from '@imagina/qhelper/_plugins/alert'
import {mapState} from 'vuex'

// Components
import addComponent from 'src/components/icommerce/address/add'

export default {
    components:{
        addComponent
    },
    data() {
        return {
           option       : '',
           addressEdit  : [],
           opened       : false,
           page         : 1,
        }
    },
    created() {
        this.getAddresses()
    },
    watch: {
        opened: function(val){
            if (!val) {
                this.addressEdit = []
            }
        }
    },
    computed: {
       ...mapState({
           addresses        : state => state.address.addresses,
           user             : state => state.address.user,
           defaultAddress   : state => state.address.defaultAddress,
           modal            : state => state.address.modal,
           pagination       : state => state.address.pagination,
       })
    },
    mounted() {
        EventBus.$on('closeModal', (data) => {
			this.opened = false
		})
    },
    methods: {
        getAddresses(){
            this.$store.dispatch('address/getAddresses').then(response => {
                this.option = this.defaultAddress.id
            })
        },
        setUpdatedefault(option){
            let lastData = {
                id: this.defaultAddress.id,
                attributes : {
                    default : 0
                }
            }

            var newData =  {
                id: option,
                attributes : {
                    default : 1
                }
            }

            this.$store.dispatch('address/updateAddress',lastData).then(response => {
                this.$store.dispatch('address/updateAddress',newData).then(response => {
                    alert.success('Registro actualizado')
                })
            })
            
        },
        selectDataEdit(address){
            this.addressEdit = address
            this.opened      = true
        },
        destroy(id){
            this.$q.dialog({
                title: 'Confirmar',
                message: '¿ Desea eliminar este registro ?',
                ok: 'Aceptar',
                cancel: 'Cancelar'
            }).then(() => {
                this.$store.dispatch('address/deleteAddress', id)
                .then(response=>{
                    this.getAddresses()
                    alert.success('Registro eliminado')
                })
            }).catch(() => {
                
            })
        },
        otherPageOrder(){
            this.$store.dispatch('address/page',this.page)
  			this.getAddresses()
  		},
    },
}
</script>