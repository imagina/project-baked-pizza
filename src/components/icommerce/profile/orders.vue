<template>
	<div>
        <div class="row">
            <div class="col-md-6">
                <div class="q-display-1">Mis Ordenes</div>
            </div>
        </div>
        <div class="row">	
            <q-table
                title="Mis Ordenes"
                :data="tableData"
                :columns="columns"
                class="col-xs-12 col-sm-12 col-md-12 table-white"
                row-key="name"
            >
            <template slot="top-right" slot-scope="props">
                <q-btn type="button" label="Mi Perfil" size="md" to="/perfil" icon="fa fa-user" color="red" sence class="q-my-md round-borders-0"/>
            </template>
            </q-table>
        </div>
    </div>
</template>

<script>

export default {
    name: 'orders',
    data(){
        return{
            columns: [
                    {
                        name: 'desc',
                        required: true,
                        label: 'ID',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                        classes: 'my-class',
                        style: 'width: 500px'
                    },
                    {
                        name: 'desc',
                        required: true,
                        label: 'Email',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                        classes: 'my-class',
                        style: 'width: 500px'
                    },
                    {
                        name: 'desc',
                        required: true,
                        label: 'Total',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                        classes: 'my-class',
                        style: 'width: 500px'
                    },
                    {
                        name: 'desc',
                        required: true,
                        label: 'Estatus',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                        classes: 'my-class',
                        style: 'width: 500px'
                    },
                    {
                        name: 'desc',
                        required: true,
                        label: 'Creado el',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                        classes: 'my-class',
                        style: 'width: 500px'
                    },
                    ],
                    tableData: [
                            {
                                name: 'Orden 1',
                                calories: 159,
                                fat: 6.0,
                                carbs: 24,
                                protein: 4.0,
                                sodium: 87,
                                calcium: '14%',
                                iron: '1%'
                            },
                            {
                                name: 'Orden 2',
                                calories: 159,
                                fat: 6.0,
                                carbs: 24,
                                protein: 4.0,
                                sodium: 87,
                                calcium: '14%',
                                iron: '1%'
                            },
                            {
                                name: 'Orden 3',
                                calories: 159,
                                fat: 6.0,
                                carbs: 24,
                                protein: 4.0,
                                sodium: 87,
                                calcium: '14%',
                                iron: '1%'
                            },
                    ]
        }
    }
}
</script>

<style lang="stylus">
    .table-white
        background-color white
</style>
