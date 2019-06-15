<template>
  <div id="informationHeader">
    <!--= Desktop =-->
    <div class="desktop-only" style="display: inherit; ">
      <div class="infoHeader infoHeader-border">
        <h6>
          <router-link tag="a" to="/inicio">
            Inicio
          </router-link>
        </h6>
      </div>
      <div class="infoHeader infoHeader-border">
        <h6>
          <router-link tag="a" to="/">
            Pide en Línea
          </router-link>
      </h6>
        
      </div>
      <div class="infoHeader infoHeader-border">
        <h6>
          <router-link tag="a" to="/about">
            Nosotros
          </router-link>
        </h6>
        <!--Social-->
      </div>

      <div class="infoHeader infoHeader-border">
        <h6>
          <router-link tag="a" to="/locations">
            ¿ Dònde Estamos ?
          </router-link>
      </h6>
        <!--Social-->
      </div>

      <div class="infoHeader ">
        <h6>
          <router-link tag="a" :to="{name:'shopping.cart.index'}">
             <span class="numberCircle">10</span>Mi Pedido
          </router-link>
      </h6>
        <!--Social-->
      </div>
    </div>

    <!--= Mobile =-->
    <q-list class="infoMobil mobile-only q-pa-none">
      <q-item class="text-center">
        <q-icon name="fab fa-facebook"></q-icon>
        <q-icon name="fab fa-twitter"></q-icon>
        <q-icon name="fab fa-instagram"></q-icon>
        <q-icon name="fab fa-youtube"></q-icon>
      </q-item>
      <q-item>
        <div class="row full-width">
          <div class="col-6">
            <a href="tel: 4885219">
              <q-icon name="fa fa-phone" />
              4885219
            </a>
          </div>
          <div class="col-6">
            <a href="whatsapp://send?abid=phonenumber&phone=+573174320413">
              <q-icon name="fab fa-whatsapp" />
              317 432 0413
            </a>
          </div>
        </div>
      </q-item>
    </q-list>
  </div>
</template>
<script>
  /*Components*/
  import socialButtons from 'src/components/master/socialButtons'

  export default {
    props: {},
    components: {socialButtons},
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}

  }
</script>
<style >
.numberCircle {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  padding: 8px;
  background: #ff8c00;
  color: #fff;
  text-align: center;
  font: 15px Arial, sans-serif;
  margin-right: 5px;
}
#informationHeader {
  display: inherit;
}
#informationHeader .infoHeader {
  line-height: 0%;
  padding: 20px 48px;
  font-weight: bold;
}
#informationHeader .infoHeader h6 {
  font-size: 15px;
  margin: 0px;
  color: #867574;
  font-weight: bold;
  line-height: 1.5;
}
#informationHeader .infoHeader .q-icon {
  color: $secondary;
  margin-right: 15px;
  font-size: 18px;
}
#informationHeader .infoHeader font {
  color: $secondary;
  font-size: 24px;
  line-height: 0;
}
#informationHeader .block1,
#informationHeader .block2 {
  border-right: 1px solid $grey-4;
}
#informationHeader .block1 h6,
#informationHeader .block2 h6 {
  margin-left: 28px;
}
#informationHeader .block3 {
  padding-right: 0;
}
#informationHeader .block3 .q-icon:last-child {
  margin: 0;
}
#informationHeader .infoMobil {
  border: 0;
}
#informationHeader .infoMobil .q-item a {
  text-decoration: none;
  color: $primary;
}
#informationHeader .infoMobil .q-item .q-icon {
  color: $secondary;
  margin-right: 7px;
  font-size: 18px;
}
#informationHeader .infoMobil .q-item:nth-child(1) .q-icon {
  margin-right: 25px;
}
#informationHeader a {
  text-decoration: none;
}
#informationHeader a:visited {
  color: #867574;
}
#informationHeader a:link {
  color: #867574;
}

.infoHeader-border{
  position: relative;
  cursor: pointer;
}

.infoHeader-border::after{
  content: '';
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  height: 50%;
  border-right: 1px #867574 solid;
  transform: skew(-15deg);
}

</style>
