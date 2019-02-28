<template>
    <div>
        <div class="q-mx-sm" style="display: inline-block;" v-for="(item, index) of data" :key="index">
            <div class="flex flex-center text-white border">
                <div class="flex flex-center text-white circle" style="background: url('statics/categories/entradas.jpg') no-repeat center;">
                    {{ item.title }}
                    <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data']
}
</script>