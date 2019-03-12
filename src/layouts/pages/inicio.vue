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
            <!--== START VALIDATE ADDRESS ==-->
            <validateaddress-component/>
            <!--== END VALIDATE ADDRESS ==-->
          </q-carousel-slide>

        </q-carousel>
      </div>
    </section>

    <section class="container-fluid" style="background-image: linear-gradient(to right, white, #c2c2c2);">
      <div class="container-section">
        <div class="row">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6 flex flex-center" style="height: 400px">
            <img src="statics/caja.png" style="position: relative; top: -50px; max-width: 100%">
          </div>
        </div>
      </div>
    </section>
    
    <!--== START CATERING ==-->
    <section-carting-app />
    <!--== END CATERING ==-->

    <section class="container-fluid q-pb-lg" style="background: url('statics/textura.jpg')">
      <div class="container-section">
        <div class="row">        
          <div class="col-xs-12 col-sm-12 col-md-12 q-py-xl">
            <div class="q-display-2 color-baked-title" align="center">¿Que quieres comer hoy?</div>
            <div class="q-display-3 color-baked-subtitle" align="center">CONOCE NUESTRO MENÚ</div>
          </div>
        </div>
          <!--== START CATEGORIES ==-->
          <categorieshomeComponent />
          <!--== END CATEGORIES ==-->
      </div>
    </section>

  </div>
</template>

<script>
  import categorieshomeComponent from 'src/components/icommerce/categorieshome'
  import validateaddressComponent from 'src/components/icommerce/validateAddress'
  
  export default{
    components:{
      categorieshomeComponent,
      validateaddressComponent,
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

  @media screen and (min-width: 700px)
  {
    #q-carousel-search
    {
      width: 600px;
      max-width: 100%;
    }
  }

  .search {
    padding: 14px 14px 10px 14px;
    width: 75%;
    border:0px solid #dbdbdb;
    border-radius: 7px 7px 7px 7px;
  }

  .button {
    position:relative;
    padding:6px 15px;
    left:-8px;
    width: 30%;
    border:2px solid #EC3800;
    border-radius: 7px 7px 7px 7px;
    background-color:#EC3800;
    color:#fafafa;
    cursor: pointer;
  }
  .button-search
  {
    font-size: 1.4rem;
    left: 0px;
    margin: auto;
    margin-top: 10px;
    border-width: 1px;
    padding: 10px 14px 8px 14px;
  }

  .button-search:disabled {
      color: #ffffff7a !important;
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


  .q-carousel-quick-nav
  {
      text-align: right;
      background-color: transparent;
  }

  .q-carousel-quick-nav .q-btn-dense
  {
      border: 2px solid white;
      opacity: 1;
      height: 2rem;
      width: 2rem;
      margin: 8px;
  }

  .q-carousel-quick-nav .q-btn-dense.inactive
  {
    opacity: 1;
  }

  .q-carousel-quick-nav .q-btn-dense:not(.inactive),
  .q-carousel-quick-nav .q-btn-dense:hover,
  .q-carousel-quick-nav .q-btn-dense:hover .q-btn-inner,
  .q-carousel-quick-nav .q-btn-dense:not(.inactive) .q-btn-inner 
  {
    border-color: #f44336;
    color: #f44336;
  }


  .vertical-align-center {
      display: flex;
      align-items: center;
  }
  .csh3

  .vertical-align-center {
    display: flex;
    align-items: center;
  }

  .csh3
  {
    background-image: url('/statics/textura7.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .csh3__app_col
  {
    display: flex;
    align-items: center;
  }

  .csh3__catering_col
  {
    background-position: right;
    padding-left: 2rem;
    display: flex;
    align-items: center;
  }

  .csh3__catering_title,
  .csh3__catering_email
  {
    color: #F8B41C;
  }

  .csh3__app_col .csh3__content
  {
    width: 50%;
    padding-left: 2rem;
  }

  .csh3__app_col .csh3__content,
  .csh3__catering_col .csh3__content
  {
    padding-top: 60px;
    padding-bottom: 60px;  
  }

  .csh3__catering_col .csh3__content
  {
    width: 80%;
  }

  .csh3 > .row
  {
    min-height: 100%;
  }
  .islider-inner{
    position: absolute;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }


    @media screen and (max-width: 768px)
    {
      .csh3 .container-section
      {
        padding: 0px !important;
      }
      .csh3__app_col
      {
        background-image: url('/statics/textura4-md.png');
        background-size: cover;
      }
      .csh3__catering_col
      {
        background-image: url('/statics/textura5.png');
      }
    }
    @media screen and (max-width: 768px)
    { 
      .csh3
      {
        background-image: none;
      }
    }
</style>