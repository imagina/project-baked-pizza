<template>
	<div>
        <div class="row">	
            <q-table
                title="Mis Ordenes"
                :data="tableData"
                :columns="columns"
                class="col-xs-12 col-sm-12 col-md-12 table-white"
                row-key="name"/>
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

    .q-table-container
        position relative
        border-radius 3px
        background #ffffff
        border-top 3px solid #d2d6de
        border-top-color #ed4400
        margin-bottom 20px
        width 100%
        box-shadow 0 1px 1px rgba(0,0,0,0.1)

    .table-white
        background-color white
</style>
