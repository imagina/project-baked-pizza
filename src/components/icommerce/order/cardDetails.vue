<template>
    <div>
        <q-scroll-area v-if="$q.screen.width > 768" style="height: 360px;width: 100%">
          <!--<router-link :to="{name: 'order.show',params: {id: order.id}}">-->
            <div class="row q-px-xs q-pt-xs">
                <q-card class="col-12 q-mb-sm" style="border-radius: 15px;min-height: 335px">
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
                                    <q-btn color="positive" rounded label="REPETIR PEDIDO" @click="repeatOrder" />
                                </div>
                            </div>
                        </div>
                    </q-card-title>
                </q-card>
            </div>
          <!--</router-link>-->
        </q-scroll-area>
        <div class="row" v-else>
            <q-card class="col-12 q-pa-sm q-mb-md" style="border-radius: 15px">
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
                                <q-btn color="positive" rounded label="REPETIR PEDIDO" @click="repeatOrder" />
                            </div>
                        </div>
                    </div>
                </q-card-title>
            </q-card>
        </div>
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
        },
        methods:{
            repeatOrder(){
                this.$q.dialog({
                    title: '¿Desea Repetir este Pedido?',
                    color: 'positive',
                    ok: 'Sí',
                    cancel: 'No'
                }).then(async data => {
                    this.loading = true
                    for(let x in this.order.items) {
                        let formData = {
                            productId: this.order.items[x].productId,
                            quantity: this.order.items[x].quantity,
                            productOptionValues: this.order.items[x].options,
                            price: this.order.items[x].price,
                        }
                        await this.$store.dispatch('shoppingCart/SET_PRODUCT_INTO_CART', formData)
                    }
                    this.loading = false
                    this.$router.push({name: 'shopping.cart.index'})
                }).catch(() => {
                })
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