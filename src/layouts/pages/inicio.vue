<template>
  <div>

    <section class="row">
      <div class="col-xs-12 col-md-12">
        <q-carousel 
          class="text-white" 
          arrows 
          infinite 
          color="white" 
          quick-nav 
          maximized 
          :height="this.$q.platform.is.desktop ? '880px' : '350px'"
          >
          <q-carousel-slide img-src="statics/sliders/1.jpg" class="flex flex-center">

            <div class="text-center">
              <div class="q-display-1 q-my-lg">¡ACEPTANDO PEDIDOS!</div>
              <div class="q-display-2 q-my-lg">PARA LLEVAR <input class="toggle toggle__textless" type="checkbox"> DOMICILIO</div>
              <div class="q-my-lg" style="font-family: Muli">(Para llevar te ahorra la fila y esperar)</div>
              <div class="q-my-lg">
                 <input type="text" required class="search">
                  <input type="button" value="RECOGER" class="button">
              </div>

              <div class="q-my-lg" style="font-family: Muli">Paga tu pedido en línea de forma segura</div>
              <img src="statics/cards2.png">
            </div>

          </q-carousel-slide>
          <q-carousel-slide img-src="statics/sliders/2.jpg" class="flex flex-center">
            <div class="text-center">
              <div class="q-display-3">Lorem ipsum dolor sit amet.</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide img-src="statics/sliders/3.jpg" class="flex flex-center">
            <div class="text-center">
              <div class="q-display-3">Lorem ipsum dolor sit amet.</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide img-src="statics/sliders/4.jpg" class="flex flex-center">
            <div class="text-center">
              <div class="q-display-3">Lorem ipsum dolor sit amet.</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide img-src="statics/sliders/5.jpg" class="flex flex-center">
            <div class="text-center">
              <div class="q-display-3">Lorem ipsum dolor sit amet.</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <section class="row" style="padding: 5% 20%; background-image: linear-gradient(to right, white, #c2c2c2);">
      <div class="col-md-6">
        <div class="q-display-1 color-baked-subtitle" align="center">¿Ya nos Conocías?</div>
        <div class="q-display-2 color-baked-title" align="center">SÓMOS BAKED PIZZA</div>
        <br><br>
        <p align="justify" class="q-mt-xs q-mx-lg" style="color: #4C3D3A; font-family: Muli; font-size: 20px">
          Nuestras deliciosas recetas son preparadas de manera artesanal con los mejores ingredientes. 
          La masa de nuestra pizza es estirada a mano dándole una textura suave y esponjosa, sus bordes 
          son ligeramente dorados y crocantes. Estamos comprometidos a ofrecer a nuestros clientes calidad, 
          generando confianza en cada plato. Nuestras preparaciones las realizamos al instante para ofrecer 
          productos siempre frescos.
        </p>
      </div>
      <div class="col-md-6 flex flex-center" style="height: 400px">

        <img src="statics/caja.png" style="position: relative; top: -50px; max-width: 100%">
      </div>
    </section>

    <section class="row desktop-only" style="background: url('/statics/textura7.jpg') no-repeat; background-size: 100%; display: none">
      <div class="col-xs-12 col-lg-6 q-py-xl q-pl-md q-px-xl only-desktop">
         <div>
            <p class="q-headline q-mt-md color-baked-title">Descarga nuestra APP</p>
            <p class="q-display-1 q-mt-md color-baked-subtitle">¡Haz tus pedidos desde el celular!</p>
            <div>
              <img src="/statics/googleplay.png" width="20%" style="cursor: pointer;">
            </div>
         </div>
      </div>
      <div class="col-xs-12 col-lg-6 q-py-xl text-white ">
        <div class="q-headline q-mt-md" align="center">¿Tienes un evento?</div>
        <div class="q-display-2 color-baked-subtitle-1" align="center">SERVICIO DE CATERING</div>
        <p align="center" class="q-mx-xl" style="margin: 20px 100px; font-family: Muli; font-size: 20px">
          En Baked Pizza queremos que pases momentos inolvidables y unicos, por esta razon te ofrecemos 
          el servicio de catering en donde puedes contar con nosotros en tus eventos empresariales y sociales.  
          Para mayor informacion envianos tus datos al correo:
        </p>
        <div class="q-display-1 q-mb-md color-baked-subtitle-1" align="center">catering@bakedpizza.com.co </div>
      </div>
    </section>

    <section class="row q-pb-lg" style="background: url('statics/textura.jpg')">
      <div class="col-md-12 q-py-xl">
        <div class="q-display-2 color-baked-title" align="center">¿Que quieres comer hoy?</div>
        <div class="q-display-3 color-baked-subtitle" align="center">CONOCE NUESTRO MENÚ</div>
      </div>

      <!-- start Categories -->
      <div class="col-md-12 flex flex-center">

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/entradas.jpg') no-repeat center;">
                Entradas
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/pizzas.jpg') no-repeat center;">
                Pizzas
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/hamburguesas.jpg') no-repeat center;">
                Hamburguesas
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>
        
      </div>

      <div class="col-md-12 flex flex-center">

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/sandwiches.jpg') no-repeat center;">
                Sandwiches
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/pastas.jpg') no-repeat center;">
                Pastas
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/panzerottis.jpg') no-repeat center;">
                Panzerottis
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/crepes.jpg') no-repeat center;">
                Crepes
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>
        
      </div>

      <div class="col-md-12 flex flex-center">

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/postres.jpg') no-repeat center;">
                Postres
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/bebidas.jpg') no-repeat center;">
                Bebidas
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>

        <div class="q-mx-sm" style="display: inline-block;">
          <div class="flex flex-center text-white border">
              <div class="flex flex-center text-white circle" style="background: url('statics/categories/otros.jpg') no-repeat center;">
                Otros
                <q-btn label="pedir" color="red" rounded style="position: absolute; margin-top: 38px;"/>
              </div>
          </div>
        </div>
        
      </div>

      <!-- End Categories -->
    </section>

  </div>
</template>

<script>
  
  export default {

    data(){
      return{
        checked: false
      }
    },
    components: {
      
    },
  }
</script>

<style >


 .yellow-texture{

  background: #F8b41c url('/statics/appbaked.png') no-repeat top right;
  background-size: 45%;

 }

 .red-texture{
  position: relative;

  background: #C02400 url('/statics/textura6.png') no-repeat right top;  
 }


  .diagonal-texture{
    background: linear-gradient(to right bottom, #F5A613 50%, #C02400 50%);
  }

  .diagonal{
    position: relative;
    color: #fff;
  }

  .diagonal::after{
    content: '';
    position: absolute;
    top: 0;
    left: -250px;
    width: 50%;
    height: 100%;
    background: #c02400;
    transform: skew(-15deg);
  }

  .texture {
    background: repeating-conic-gradient(
        hsla(0,0%,100%,.2) 0deg 7deg,
        hsla(0,0%,100%,0) 0deg 14deg
    ) #F8B31B;
  }

  .border{
    border-radius: 50%;height: 200px; width: 200px; border: 2px #8e7e7d dashed;
    transition: all .7s;
  }

  .circle{
    border-radius: 50%; background: #c02400; height: 90%; width: 90%; font-size: 25px;
    
  }
  .border:hover{
    background: #EB3800;
    border: 2px #EB3800 solid;
  }


input.toggle {
  position: relative;
  width: 90px;
  height: 42px;
  -webkit-appearance: initial;
  -moz-appearance: initial;
  appearance: initial;
  border-radius: 21px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
  cursor: pointer;
  transition: all .3s ease;
}
input.toggle:before, input.toggle:after {
  transition: all .3s ease;
}
input.toggle:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: calc(0% + 8px);
  transform: translate3d(0, -50%, 0);
  border-radius: 50%;
}
input.toggle:after {
  content: "OFF";
  position: absolute;
  top: 50%;
  left: calc(0% + 24px + 16px);
  transform: translate3d(0, -50%, 0);
  font-size: 20px;
}
input.toggle:checked {
  border-bottom-color: #0facf3;
}
input.toggle:checked:before {
  left: calc(100% - 24px - 8px);
  transform: translate3d(0, -50%, 0);
  border-radius: 50%;
}
input.toggle:checked:after {
  content: "ON";
  left: calc(0% + 16px);
}
input.toggle__light {
  background: #f0f1f2;
  border-bottom: 2px solid #dddddd;
  font-weight: 500;
}
input.toggle__light:before {
  background: #3c4859;
}
input.toggle__light:after {
  color: #3c4859;
}
input.toggle__light:checked {
  border-color: #4cd964;
}
input.toggle__light:checked:before {
  background: #4cd964;
}
input.toggle__light:checked:after {
  color: #4cd964;
}
input.toggle__textless {
  background: #f0f1f2;
  border-bottom: 2px solid #ddd;
  width: 80px;
}
input.toggle__textless:before {
  background: #EC3800;
  border: 2px solid #f0f1f2;
  width: 28px;
  height: 28px;
}
input.toggle__textless:after {
  content: none;
}
input.toggle__textless:checked {
  border-color: black;
}
input.toggle__textless:checked:before {
  left: calc(100% - 30px - 8px);
  background: #EC3800;
}
input.toggle__textless:checked:after {
  content: none;
}
input.toggle__outline {
  background: #transparent;
  border: 2px solid #fff;
}
input.toggle__outline:before {
  background: transparent;
  border: 2px solid #f0f1f2;
}
input.toggle__outline:after {
  color: #f0f1f2;
}
input.toggle__outline:checked {
  border-color: #fff;
}
input.toggle__outline:checked:before {
  border: 2px solid #fff;
  left: calc(100% - 28px - 8px);
  background: #fff;
}
input.toggle__outline:checked:after {
  color: #fff;
}

.search {
  padding:8px 15px;
  width: 75%;
  border:0px solid #dbdbdb;
  border-radius: 7px 0px 0px 7px;
}

.button {
  position:relative;
  padding:6px 15px;
  left:-8px;
  width: 25%;
  border:2px solid #EC3800;
  border-radius: 0px 7px 7px 0px;
  background-color:#EC3800;
  color:#fafafa;
  cursor: pointer;
}

.color-baked-title{
  color: #EB3800;
}

.color-baked-subtitle{
  color: #723D3D;
}

.color-baked-subtitle-1{
  color: #F5A613;
}




</style>