<template>
    <div class="showinfouser">
        <div class="row">	
            <div class="col-xs-12 col-sm-12 col-md-12">
                <q-tabs class="box"> 
                    <!-- Tabs - notice slot="title" -->
                    <q-tab default slot="title" label="Información" name="tab-1" />
                    <q-tab slot="title" name="tab-2" label="Cuenta" />
                    <q-tab alert slot="title" name="tab-3" label="Dirección" />
                    <q-tab slot="title" name="tab-4" label="Social" />

                    <!-- Targets -->
                    <q-tab-pane name="tab-1">
                        <div>
                            <div class="q-title">
                                Profesión
                            </div>
                            <div class="text-weight-medium">
                                Webmaster
                            </div>
                            <hr>
                            <div class="q-title">
                                Educación
                            </div>
                            <div class="text-weight-medium">
                                Ingeniero en Informatica CC <b> xxxx </b>
                            </div>
                            <hr>
                            <div class="q-title">
                                Detalles
                            </div>
                            <div class="text-weight-medium">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maxime voluptates, recusandae sed saepe voluptatibus ipsam tempore suscipit earum commodi maiores repellat iusto minus laboriosam quis repellendus asperiores debitis. Deleniti.
                            </div>
                            <hr>
                            <div class="q-title">
                                Cumpleaños
                            </div>
                            <div class="text-weight-medium">
                                05-10-1992
                            </div>
                            <hr>
                            <div class="q-title">
                                Teléfono
                            </div>
                            <div class="text-weight-medium">
                                04264170396
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-2">
                        <div>
                            <div class="q-title">
                                Nombre de pila
                            </div>
                            <div class="text-weight-medium">
                                Imagina
                            </div>
                            <hr>
                            <div class="q-title">
                                Apellido
                            </div>
                            <div class="text-weight-medium">
                                Colombia
                            </div>
                            <hr>
                            <div class="q-title">
                                Email
                            </div>
                            <div class="text-weight-medium">
                                soporte@imaginacolombia.com
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-3">
                        <div>
                            <div class="q-title">
                                Carlos Devia, calle 14, Ibague, Bogotá DC, CO
                            </div>
                            <hr>
                            <div class="q-title">
                                Juan Escalante2, calle 29, Petare, Caracas, VE
                            </div>
                            <hr>
                            <div class="q-title">
                                Sabas Vega, Calle Federación, Punto Fijo, Falcón, VE
                            </div>
                            <hr>
                            <div class="q-title">
                                Marcos Rativa, calle 12, Ibague, Tolima, CO 
                            </div>
                            <hr>
                            <div class="q-title">
                                Imagina Colombia, calle 29 # 7-54, Ibague, Tolima, CO
                            </div>
                        </div>
                    </q-tab-pane>
                    <q-tab-pane name="tab-4">
                        <div>
                            <div class="q-title">
                                FACEBOOK
                            </div>
                            <div class="text-weight-medium">
                                ImaginaColombia
                            </div>
                            <hr>
                            <div class="q-title">
                                GOOGLE +
                            </div>
                            <div class="text-weight-medium">
                                imaginaC
                            </div>
                        </div>
                    </q-tab-pane>
                </q-tabs>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'showinfouser'
}
</script>

<style lang="stylus">
    .showinfouser
        .q-tab-pane
            background-color white
        hr
            border-top #8080801f
</style>
