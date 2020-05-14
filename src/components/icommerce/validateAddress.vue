<template>
	<div class="validateAddress-content row q-mt-md">
		<div class="q-display-1 col-12" v-if="whitLabels">
			¡ACEPTANDO PEDIDOS!
		</div>
		<div class="q-display-2 col-12 q-my-md text-center">
			RECOGER EN TIENDA
			<input
							class="toggle toggle__textless"
							type="checkbox"
							v-model="typeOrder">
			DOMICILIO
		</div>
		<div class="q-my-lg col-12 text-center">
			(Recoger en tienda te ahorra la fila y esperar)
		</div>
		
		<div class="q-my-lg col-12" :id="false ? 'q-carousel-search': ''">
			<div class="row text-center gutter-xs justify-center q-px-sm">
				<div class="col-xs-6 col-sm-3">
					<q-select
									:options="typesStreet"
									inverted
									color="white"
									class="text-grey-10"
									style="border-radius: 8px"
									placeholder="seleccione"
									v-model="form.typeStreet"/>
				</div>
				
				<div class="col-xs-6 col-sm-3">
					<q-input
									v-model="form.street"
									inverted
									color="white"
									class="text-grey-10"
									style="border-radius: 8px"
									@keyup.enter="validateAddress()"
									placeholder="87b"/>
				</div>
				
				<div class="col-xs-6 col-sm-3">
					<q-input
									v-model="form.number1"
									inverted
									prefix="#"
									color="white"
									class="text-grey-10"
									@keyup.enter="validateAddress()"
									style="border-radius: 8px"
									placeholder="38a"/>
				</div>
				
				<div class="col-xs-6 col-sm-3">
					<q-input
									v-model="form.number2"
									type="number"
									inverted
									prefix="-"
									color="white"
									class="text-grey-10"
									@keyup.enter="validateAddress()"
									style="border-radius: 8px"
									placeholder="42"/>
				</div>
			</div>
			
			<div class="row text-center gutter-xs q-py-md q-mb-md flex-center">
				<div :class="'col-6 col-sm-4 q-px-sm '+($q.screen.width > 768 ? (userId?'text-right':'text-center'): 'text-center')">
                    <div class="row">
                        <div class="col-12">
                            <q-btn
                                    label="VERIFICAR COBERTURA"
                                    color="primary"
                                    size="20px"
                                    style="min-height: 40px"
                                    @click="validateAddress()"/>
                        </div>
                    </div>
                </div>
                <div :class="'col-6 col-sm-4 q-px-sm '+($q.screen.width > 768 ? 'text-left': 'text-center')" v-if="userId">
					<myAddress/>
                </div>
			</div>
		</div>
        <div class="col-12">
            <div class="row desktop-only"
                 style="font-family: Muli"
                 v-if="$q.platform.is.desktop && whitLabels">
                <div class="col-12 text-center">
                    <img
                            src="statics/cards2.png" />
                </div>
                <div class="col-12 text-center">
                    Paga tu pedido en línea de forma segura
                </div>
            </div>
        </div>

		
		<q-modal v-model="opened" class="backend-page" :content-css="{minWidth: '90vw', minHeight: '90vh'}">
			<q-modal-layout>
				<q-toolbar slot="header">
					<q-btn
									flat round dense
									v-close-overlay
									icon="close"/>
					<q-toolbar-title class="text-center">
						Validar Dirección
					</q-toolbar-title>
				</q-toolbar>
				
				
				<q-toolbar slot="footer" class="bg-white">
					<q-toolbar-title/>
					<q-btn
									label="Validar está ubicación"
									color="positive"
									icon="where_to_vote"
									@click="validateLatLng()"/>
				</q-toolbar>
				
				<div class="q-my-md">
					<!--Validate Input Address-->
					<div class="text-center q-mb-sm">
						<q-icon name="fas fa-exclamation-circle q-mr-xs" color="cyan"/>
						Cambia los datos de tu dirección o arrastra el marcador en el mapa, para indicar tu ubicación.
						<div class="row text-center gutter-x-xs justify-center">
							<div class="col-6 col-sm-3 q-mt-sm">
								<q-select
												:options="typesStreet"
												inverted
												color="white"
												class="text-grey-10"
												style="border-radius: 8px"
												placeholder="seleccione"
												v-model="form.typeStreet"/>
							</div>
							
							<div class="col-6 col-sm-2 q-mt-sm">
								<q-input
												v-model="form.street"
												inverted
												color="white"
												class="text-grey-10"
												style="border-radius: 8px"
												@keyup.enter="validateAddress()"
												placeholder="87b"/>
							</div>
							
							<div class="col-6 col-sm-2 q-mt-sm">
								<q-input
												v-model="form.number1"
												inverted
												prefix="#"
												color="white"
												class="text-grey-10"
												@keyup.enter="validateAddress()"
												style="border-radius: 8px"
												placeholder="38a"/>
							</div>
							
							<div class="col-6 col-sm-2 q-mt-sm">
								<q-input
												v-model="form.number2"
												type="number"
												inverted
												prefix="-"
												color="white"
												class="text-grey-10"
												@keyup.enter="validateAddress()"
												style="border-radius: 8px"
												placeholder="42"/>
							</div>
							<q-btn color="primary" @click="validateAddress"
							       class="q-ml-sm q-mt-sm" icon="fas fa-search" />
						</div>
					</div>
					
					<div id="map" style="width:100%; height:65vh"></div>
				</div>
			</q-modal-layout>
		</q-modal>
		
		<q-modal v-model="modalresultcoverage" no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw'}">
			<q-modal-layout>
				<div class="q-mx-md q-my-md">
					
					<div class="row" v-if="typeOrder">
						<div class="col-xs-12 col-md-12 text-center">
							<q-icon name="sentiment_very_satisfied" size="45px" v-if="coverage"/>
							<q-icon name="sentiment_very_dissatisfied" size="45px" v-else/>
						</div>
						<div class="col-xs-12 col-md-12 text-center">
							<p class="secondary-font"><b class="secondary-font">{{coverage ? coverage.status ? 'Si' : 'No' :
								'No'}}</b>
								hay cobertura en tu dirección en este momento,<br>
								<span class="secondary-font" v-if="!coverage">
									pero no te preocupes, puedes cambiar a "<b class="secondary-font">Recoger en Tienda</b>",<br>
									<b class="secondary-font">recoger en tienda te ahorra la fila y esperar</b>
									</span>
							
							
							</p>
							<p v-if="coverage && coverage.status"> Costo Domicilio ${{ coverage.price}} </p>
							
							<q-checkbox v-model="saveAddress" label="Guardar esta Dirección para futuras compras" class="q-mb-md" v-if="userId && coverage && coverage.status"/>
							
						</div>
						
						<q-btn label="Aceptar" class="full-width" color="green" @click="saveConfigAddress(true)"/>
					</div>
					
					<div class="row" v-else>
						<div class="col-md-12">
							<q-card class="no-shadow">
								<q-card-title>
									<p>Listado de tiendas disponibles</p>
								</q-card-title>
								<q-card-main>
									<q-item tag="label" v-for="(store, index) in stores" :key="index">
										<q-item-side>
											<p>
												<q-radio v-model="storeSelected" :val="store.id" />
												{{store.name}} <b class="secondary-font">{{store.address}}</b> {{store.phone}}
											</p>
										</q-item-side>
									</q-item>
								</q-card-main>
								<q-checkbox v-model="saveAddress" label="Guardar esta Dirección para futuras compras" class="q-mb-md" v-if="userId && coverage && coverage.status"/>
							</q-card>
						</div>
						<q-btn label="Aceptar" class="full-width" color="green" @click="saveConfigAddress(false)"/>
					</div>
				
				</div>
				<q-inner-loading :visible="loading">
					<q-spinner size="50px" color="primary"></q-spinner>
				</q-inner-loading>
			</q-modal-layout>
		</q-modal>
		
		<q-inner-loading :visible="visible" style="background: transparent">
			<q-spinner size="50px" color="white"></q-spinner>
		</q-inner-loading>
	
	</div>
</template>
<style lang="stylus">
    @media screen and (max-width: 768px)
    {
        .csh3
        {
            background-image: none;
        }

        .m-wd-full{
            width: 100%;
        }

        .button-search{
            width: 70%!important;
        }

        .validateAddress-content .q-display-2{
            font-size: 20px!important;
        }

        .validateAddress-content .islider-inner{
            width: 100%!important;
        }

        .validateAddress-content .q-display-1{
            font-size: 20px!important;
        }

        .validateAddress-content .q-carousel-right-arrow,.q-carousel-left-arrow{
            display: none;
        }

        .validateAddress-content .q-carousel-quick-nav{
            display: none
        }

        .validateAddress-content .search{
            margin-top: 5px;
        }
        .validateAddress-content .btns{
            text-align: center!important;
        }

    }
</style>
<script>
    import mapService from 'src/services/maparea'
    import {required} from 'vuelidate/lib/validators'
    import {helper} from '@imagina/qhelper/_plugins/helper'
    import addressesService from 'src/services/addresses'
    import {alert} from '@imagina/qhelper/_plugins/alert'
    import myAddress from "./myAddress";

    export default {
        components:{
            myAddress
        },
        props: {
            whitLabels: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                userId: false,
                geocoder: {},
                map: '',
                marker: '',
                opened: false,
                areas: [],
                areasValidated: [],
                ifcoberture: false,
                typeOrder: false,
                storeSelected: '',
                typesStreet:
                    [
                        {label: 'Calle', value: 'Calle'},
                        {label: 'Carrera', value: 'Carrera'},
                        {label: 'Avenida', value: 'Avenida'},
                        {label: 'Diagonal', value: 'Diagonal'},
                        {label: 'Transversal', value: 'Transversal'},
                        {label: 'Vía', value: 'Vía'},
                    ],
                addresslatLng: {},
                markers: [],
                form: {
                    typeStreet: '',
                    street: '',
                    number1: '',
                    number2: '',
                },
                visible: false,
                results: [],
                map: false,
                stores: [],
                store_id: '',
                containerMap: false,
                addressSelected: [],
                coverage: [],
                modalresultcoverage: false,
                loading: true,
                userId: false,
                myAddres: [],
                modalMyAddress: false,
                saveAddress: false,
            }
        },
        validations: {
            storeSelected: {required},
            form: {
                typeStreet: {required},
                street: {required},
                number1: {required},
                number2: {required},
            }
        },
        computed: {
            fullAddress() {
                return this.form.typeStreet + ' ' +
                    this.form.street + ' ' +
                    this.form.number1 + ' ' +
                    this.form.number2 +
                    ',Bogotá,CO'
            },
            polygons() {
                return this.areas.map(area => {
                    return {
                        path: area.polygon,
                        price: area.price,
                        id: area.name,
                        strokeColor: '#000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#000',
                        fillOpacity: 0.35
                    }
                })
            },
        },
        mounted() {
            this.$nextTick(() => {
                this.geocoder = new google.maps.Geocoder();
                this.getDataFromStorage()
                //this.isLoggued()
                this.getUser()
                this.getMapAreas()
                this.getStores()
		            this.getUserId()
            })
        },
        methods: {
            async getUser(){
                this.userId = await helper.storage.get.item('userId')
            },
            validateAddress() {
                this.containerMap = false
                this.$v.form.$touch()
                if (this.$v.form.$error) {
                    alert.error('Faltan datos para validar su direccion.', 'bottom', false, 2500)
                    return
                } else {
                    this.results = []
                    this.geocoder.geocode({'address': this.fullAddress}, (results, status) => {

                        if (status == 'OK') {
                            this.opened = true
                            if (results.length >= 1)
                                setTimeout(() => {
                                    this.initializeMap(results[0])
                                }, 500)

                        } else {
                            alert.error('No se consiguieron', 'bottom', false, 2500)
                        }
                    });

                }
            },

            initializeMap(map) {
                //MAP
                var latitude = map.geometry.location.lat();
                var longitude = map.geometry.location.lng();
                this.addresslatLng = map.geometry.location
                var center = new google.maps.LatLng(latitude, longitude);
                var options = {
                    zoom: 16,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,// ROADMAP | SATELLITE | HYBRID | TERRAIN
                };

                this.map = new google.maps.Map(document.getElementById("map"), options);

                //GEOCODER
                this.geocoder = new google.maps.Geocoder();

                this.marker = new google.maps.Marker({
                    map: this.map,
                    draggable: true,
                    position: center
                });


                this.polygons.forEach(polygon => {
                    // Construct the polygon.
                    let bermudaTriangle = new google.maps.Polygon(polygon);
                    bermudaTriangle.setMap(this.map);

                })


                //Add a listener to the marker for reverse geocoding
                google.maps.event.addListener(this.marker, 'drag', () => {
                    this.addresslatLng = this.marker.getPosition()

                });
            },


            showMap(map) {
                this.markers = []
                this.containerMap = true
                this.addresslatLng = map.geometry.location
                this.markers.push({
                    position: map.geometry.location
                })
            },
            validateLatLng() {
                this.coverage = false
                let address = new google.maps.LatLng(this.addresslatLng.lat(), this.addresslatLng.lng())
                this.polygons.forEach(polygon => {
                    setTimeout(() => {
                        let response = google.maps.geometry.poly.containsLocation(address, new google.maps.Polygon(polygon))
                        if (response) {
                            this.coverage = {
                                status: response,
                                price: polygon.price,
                                area: polygon.id
                            }
                        }
                    }, 1000)
                })
                this.opened = false
                this.modalresultcoverage = true
                setTimeout(() => {
                    this.loading = false
                }, 2000)
            },
            saveConfigAddress(typeOrder) {

                helper.storage.remove('dataAddress')
                if (!this.coverage.status && !this.storeSelected && !this.typeOrder) {
                    //this.modalresultcoverage = false
                    alert.error('Seleccione una tienda', 'bottom', false, 2500)
                    return
                }

                if (this.typeOrder && !this.coverage) {
                    this.modalresultcoverage = false
                    return
                }
                let data = {}
                data.typeOrder = this.typeOrder
                data.form = {
                    typeStreet: this.form.typeStreet,
                    street: this.form.street,
                    number1: this.form.number1,
                    number2: this.form.number2,
                }
                data.addresslatLng = {lat: this.addresslatLng.lat(), lng: this.addresslatLng.lng()}
                if (this.typeOrder) {
                    data.coverage = this.coverage
                }
                if (!typeOrder) {
                    let store = this.stores.find(store => store.id = this.storeSelected)
                    data.store = this.storeSelected
                    data.storeAddress = store.address
                    data.storeName = store.name
                }
                if (!typeOrder && this.storeSelected == '') {
                    alert.error('Seleccione una tienda', 'bottom', false, 2500)
                    return
                }
								if(this.saveAddress && this.userId){
								    this.saveAddressInProfile(data)
								}
                this.modalresultcoverage = false
                helper.storage.set('dataAddress', data)
                this.$emit('addressValidated')
                this.$alert.success('Validación de cobertura exitosa', 'top')
                this.$router.push({path: '/products/pizzas'})
            },
		        async getUserId(){
                this.userId = await helper.storage.get.item('userId')
		        },
		        saveAddressInProfile(data){
                let formData = {
                    attributes:{
                        first_name: "default",
                        last_name: "default",
                        address_1: "default",
                        options: data
                    }
                }
              addressesService.create(formData).then( response => {
                  this.$alert.success('Direccion Guardada de manera correcta', 'top')
              }).catch( error => console.warn(error))
		        },
            getDataFromStorage() {
                helper.storage.get.item('dataAddress').then(res => {
                    if (res !== null) {
                        this.typeOrder = res.typeOrder
                        this.form.typeStreet = res.form.typeStreet
                        this.form.street = res.form.street
                        this.form.number1 = res.form.number1
                        this.form.number2 = res.form.number2
                        this.addresslatLng = res.addresslatLng
                        this.coverage = res.coverage
                        if (res.typeOrder) {
                            this.storeSelected = res.store
                        }
                    }
                })
            },

            isLoggued() {
                helper.storage.get.item('userData').then(response => {
                    if (response !== null) {
                        this.userId = response.id
                        this.getAddresOfUserLogued(response.id)
                    }
                })
            },
            getAddresOfUserLogued(userId) {
                let filter = {
                    user: userId
                }
                this.visible = true
                addressesService.index(filter)
                    .then(response => {
                        this.myAddres = response.data
                        this.visible = false
                    })
                    .catch(error => {
                        this.visible = false
                    })
            },

            openMyAddress() {
                this.modalMyAddress = true
            },
            setAddresFromMyAddress(address) {
                this.form.typeStreet = address.address_1.typeStreet
                this.form.street = address.address_1.street
                this.form.number1 = address.address_1.number1
                this.form.number2 = address.address_1.number2

                this.modalMyAddress = false
            },
            getMapAreas() {
                mapService.mapareas()
                    .then(response => {
                        this.areas = response.data
                    })
                    .catch(error => {
                    })
            },
            getStores() {
                mapService.stores()
                    .then(response => {
                        this.stores = response.data
                    })
                    .catch(error => {
                    })
            },

        }
    }
</script>
