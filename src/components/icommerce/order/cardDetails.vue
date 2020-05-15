<template>
    <div>
      <router-link :to="{name: 'order.show',params: {id: order.id}}">
        <div class="row">
            <q-card class="col-12 q-pa-sm q-mb-md">
                <q-card-title>
                    <div class="row gutter-sm" v-for="(item,i) in order.items" :key="i">
                        <div class="col-7">
                            <div class="text-primary q-display1">{{ item.title }}</div>
                            <div class="color-baked-subtitle" style="line-height: 1.2rem" v-html="item.product.description">{{ item.product.description }}</div>
                        </div>
                        <div class="col-5">
                            <div :style="`background-image: url(${item.product.mainImage.path});`" class="product-img">                            &nbsp;
                            </div>
                        </div>
                    </div>
                    <q-card-separator class="q-my-sm" />
                    <div slot="subtitle">
                        <p class="color-baked-subtitle">$ {{ $n(order.total) }}</p>
                        <div class="row">
                            <div class="col-12">
                                <p class="text-primary">Detalles</p>
                            </div>
                            <div class="col-12">
                                <div>Método de Pago: {{ order.paymentMethod }}</div>
                                <div>Pedido Realizado el {{ $d($moment(order.createdAt,'YYYY-MM-DD HH:mm').toDate()) }} {{ $d($moment(order.createdAt,'YYYY-MM-DD HH:mm').toDate(),'time') }}</div>
                                <div>Estado: {{ order.statusName }}</div>
                            </div>
                            <div class="col-12 text-center q-pt-sm">
                                <q-btn color="positive" rounded label="REPETIR PEDIDO" />
                            </div>
                        </div>
                    </div>
                </q-card-title>
            </q-card>
        </div>
      </router-link>
    </div>
</template>
<script>
    export default {
        name: "details2",
        props:{
          order: {
              required: true,
          }
        },
        data(){
            return {

            }
        }
    }
</script>

<style lang="stylus">
    .product-img
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 100%;
        height 120px;
        border: 1px solid #dddddd52;
        border-radius 10px;
</style>