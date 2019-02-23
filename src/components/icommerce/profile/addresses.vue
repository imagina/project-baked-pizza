<template>
    <div>
        <div class="row">	
            <q-table
                title="Mis Direcciones"
                :data="tableData"
                :columns="columns"
                class="col-xs-12 col-sm-12 col-md-12 table-white"
                row-key="name"
            /> 
        </div>
    </div>
</template>

<script>

export default {
    name: 'addresses',
    data(){
        return{
            columns: [
                    {
                        name: 'desc',
                        required: true,
                        label: 'Dirección',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                        classes: 'my-class',
                        style: 'width: 500px'
                    },
                    ],
                    tableData: [
                            {
                                name: 'Carrera 1 # 4544',
                                calories: 159,
                                fat: 6.0,
                                carbs: 24,
                                protein: 4.0,
                                sodium: 87,
                                calcium: '14%',
                                iron: '1%'
                            },
                            {
                                name: 'Carrera 2 # 56546',
                                calories: 159,
                                fat: 6.0,
                                carbs: 24,
                                protein: 4.0,
                                sodium: 87,
                                calcium: '14%',
                                iron: '1%'
                            },
                            {
                                name: 'Carrera 3 # 4154',
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
        border-top 3px solid #d2d6de
        border-top-color #ed4400
</style>
