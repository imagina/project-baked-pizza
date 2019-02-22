<template>
	<div>
        <div class="row">
            <div class="col-md-6">
                <h5>Mis Ordenes</h5>
            </div>
            <div class="col-md-6 text-right">
                <q-btn type="button" label="Mi Perfil" size="md" to="/perfil" icon="fa fa-user" color="red" sence class="q-my-md round-borders-0"/>
            </div>
        </div>
        <div class="row">	
            <q-table
                title="Mis Ordenes"
                :data="tableData"
                :columns="columns"
                class="col-xs-12 col-sm-12 col-md-12"
                row-key="name"
            /> 
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
                        label: 'Dessert (100g serving)',
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

</style>
