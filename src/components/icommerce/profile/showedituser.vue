<template>
    <div class="showinfouser">
        <div class="row">	
            <div class="col-xs-12 col-sm-12 col-md-12">
                <q-tabs>
                    <!-- Tabs - notice slot="title" -->
                    <q-tab default slot="title" label="Información" name="tab-1" />
                    <q-tab slot="title" name="tab-2" label="Cuenta" />
                    <q-tab alert slot="title" name="tab-3" label="Dirección" />
                    <q-tab slot="title" name="tab-4" label="Social" />

                    <!-- Targets -->
                    <q-tab-pane name="tab-1">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="text" v-model="userData.first_name"  float-label="Nombre" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="text" v-model="userData.last_name"  float-label="Apellido" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="text" v-model="userData.email"  float-label="E-Mail" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="text" v-model="userData.phone"  float-label="Teléfono" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-input type="text" v-model="userData.details"  float-label="Detalles" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-input type="text" v-model="userData.address"  float-label="Dirección" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-datetime type="date" v-model="userData.birthDate" @change="val => { birthDate = val }"  float-label="Fecha de nacimiento" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="text" v-model="userData.education"  float-label="Educación" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="text" v-model="userData.identification"  float-label="Identificación" style="background: transparent;" class="no-shadow" />
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-2">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="password" v-model="password"  float-label="Clave" style="background: transparent;" class="no-shadow" />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <q-input type="password" v-model="confirmPassword"  float-label="Confirme clave" style="background: transparent;" class="no-shadow" />
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-3">
                        <div class="row" v-for="(itemAddress, index) in addresses" :key="index">
                            <q-input type="text" :value="itemAddress.detail" float-label="Dirección" style="background: transparent;" class="col-xs-10 col-sm-10 col-md-10" />
                            <div class="col-xs-1 col-sm-1 col-md-1">
                               <q-btn round 
                                color="primary"
                                @click="deleteItem(addresses,itemAddress.index)" 
                                icon="fa fa-trash" />
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-4">
                        <div class="row" v-for="(itemSocials, index) in socials" :key="index">
                            <q-input type="text" :value="itemSocials.url" float-label="URL" style="background: transparent;" class="col-xs-10 col-sm-10 col-md-10" />
                            <div class="col-xs-1 col-sm-1 col-md-1">
                                <q-btn round 
                                color="primary"
                                @click="deleteItem(socials,itemSocials.index)" 
                                icon="fa fa-trash" />
                            </div>
                        </div>
                    </q-tab-pane>
                </q-tabs>
            </div>
        </div>
    </div>
</template>

<script>


import addressesComponent from 'src/components/icommerce/addresses'
import {helper} from '@imagina/qhelper/_plugins/helper';

export default {
    name: 'showedituser',
    components:{
        addressesComponent
    },
    data(){
        return {
            password: '',
            confirmPassword: '',
            addresses: [
                { id: 1 , detail: 'Dirección 1'},
                { id: 2 , detail: 'Dirección 2'},
                { id: 3 , detail: 'Dirección 3'}
            ],
            socials:[
                { id: 1 , icon: '', url: 'https://www.facebook.com/'},
                { id: 2 , icon: '', url: 'https://www.instagram.com/'},
                { id: 3 , icon: '', url: 'https://plus.google.com/'}
            ],
            birthDate: '',
            userData: [],
        }
    },
    methods: {
        setData(){
            return helper.storage.get.item('userData').then(response => {
                return this.userData = response
            })
        },
        deleteItem(array,i){
            if(confirm('¿Esta seguro de eliminar este elemento?')){
                array.splice(i, 1)
            }
        }
    },
    mounted(){
        this.setData()
    }
}
</script>

<style lang="stylus">
    .showinfouser
        .q-tab-pane
            background-color white
        hr
            border-top #8080801f
</style>
