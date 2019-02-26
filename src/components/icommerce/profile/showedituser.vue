<template>
    <div class="showinfouser">
        <div class="row">	
            <div class="col-md-12">
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
                        <div class="row" v-for="(item, index) in addresses" :key="index">
                            <q-input type="text" :value="item.detail" float-label="Dirección" style="background: transparent;" class="col-xs-10 col-sm-10 col-md-9" />
                            <div class="col-md-3">
                                <q-btn
                                color="primary"
                                label="Eliminar"
                                @click="deleteAddress(item.index)"
                                />
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-4">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-input type="text" v-model="socials"  float-label="Redes sociales" style="background: transparent;" class="no-shadow" />
                            </div>
                        </div>
                    </q-tab-pane>
                </q-tabs>
            </div>
        </div>
    </div>
</template>

<script>

import {helper} from '@imagina/qhelper/_plugins/helper';

export default {
    name: 'showedituser',
    data(){
        return {
            password: '',
            confirmPassword: '',
            addresses: [
                { id: 1 , detail: 'Dirección 1'},
                { id: 2 , detail: 'Dirección 2'},
                { id: 3 , detail: 'Dirección 3'}
            ],
            socials: '',
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
        deleteAddress(i){
            this.addresses.splice(i, 1)
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
