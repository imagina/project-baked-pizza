<template>
  <div id="footerMaster">
    <div class="container-fluid" style="background: #f3f1dd url('statics/textura2.jpg');">
      <div class="q-container">
        <section class="row q-pt-md">
          <div class="col-12 col-md-6 q-mb-lg">
            <div class="q-display-1 color-baked-subtitle">Permítenos atenderte</div>
            <div class="q-display-2 color-baked-title">¡VISÍTANOS PRONTO!</div>
            <div class="googlemap-container">
              <google-map/>
            </div>
          </div>
          <div class="col-12 col-md-6 q-mb-lg relative-position">
            <div class="q-display-1 color-baked-subtitle">¿Necesitas ayuda?</div>
            <div class="q-display-2 color-baked-title">DÉJANOS UN MENSAJE</div>

            <q-field
              :error="$v.form.name.$error" :count="45"
              error-label="Este campo es requerido"
            >
              <q-input :maxlength="45"
                       clearable
                       v-model="form.name"
                       float-label="Nombre Complejo"/>
            </q-field>
            <q-field
              :error="$v.form.phone.$error" :count="14"
              error-label="Este campo es requerido"
            >
              <q-input :maxlength="14"
                       @input="forceSet('phone',mask(form.phone))"
                       clearable inputmode="numeric"
                       type="text" v-model="form.phone" float-label="Número de contacto"/>
            </q-field>
            <q-field
              :error="$v.form.address.$error" :count="45"
              error-label="Este campo es requerido"
            >
              <q-input :maxlength="45"
                       clearable
                       v-model="form.address" float-label="Dirección de Dominilio"/>
            </q-field>
            <q-field
              :error="$v.form.message.$error" :count="300"
              error-label="Este campo es requerido"
            >
              <q-input v-model="form.message"
                       :maxlength="300"
                       float-label="Mensaje"
                       type="textarea"/>

            </q-field>
              <div class="text-right">
                <q-btn label="- Enviar -"
                       size="lg"
                       color="primary"
                       sence class="q-my-md round-borders-0"
                       @click="sendMessage"/>
              </div>
            <!--Loading-->
            <inner-loading :visible="loading" />
          </div>
        </section>
      </div>
    </div>

    <q-layout-footer id="footer" class="no-shadow" style="background: url('statics/footer.jpg');">

      <div class="flex flex-center">
        <img src="statics/logo.png" class="desktop-only" style="position: absolute; top: -70px;" >
      </div>

      <div class="row">
        <div class="col-12 q-my-lg q-pt-lg">
         <div class="flex flex-center text-white">
            <div class="flex flex-center text-white q-pt-lg footer__link-social">
              <a href="#" target="_blank"><i class="fab fa-facebook-f q-px-md hover-icon"></i></a>
              <a href="#" target="_blank"><i class="fab fa-twitter q-px-md hover-icon"></i></a>
              <a href="#" target="_blank"><i class="fab fa-instagram q-px-md hover-icon"></i></a>
              <a href="#" target="_blank"><i class="fab fa-google-plus-g q-px-md hover-icon"></i></a>
              <a href="#" target="_blank"><i class="fab fa-linkedin-in q-px-md hover-icon"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div class="row q-pb-lg footer_link-contact" style="margin: 0 8%">
        <div class="col-12 q-py-sm">
          <div class="flex flex-center text-white">
            <a href="tel:+57300-000-0000" class="q-px-lg text-white">
              <span class="baked-icon-color">
                <i class="fab fa-whatsapp"></i> (+57)
              </span>
               300-000-0000
            </a>
            <a href="email:info@bakedpizza.com.co" class="q-px-lg text-white">
              <span class="baked-icon-color"><i class="fas fa-envelope"></i> </span>
              info@bakedpizza.com.co
            </a>
            <span class="q-px-lg">
              <span class="baked-icon-color"><i class="material-icons"> phone </i> </span>
              <a href="tel:4515624">4515624</a> / <a href="tel:4810127">4810127</a>
            </span>
          </div>
        </div>
      </div>

      <!--=== INFORMACION ===-->
      <!--===<information-footer></information-footer> ===-->
      <!--=== COPYRIGHT ===-->
      <div class="copyright q-py-sm q-px-lg">
        <div :class="'row align-items-center '+($q.platform.is.desktop ? 'q-container' : '')">
          <div class="col-xs-12 col-md-4" align="center">
            <logo-imagina></logo-imagina>
          </div>
          <div class="col-xs-12 col-md-4 my-2" align="center">
            © Baked Pizza. Todos los Derechos Reservados.
          </div>
          <div class="col-xs-12 col-md-4" align="center">
            <img src="statics/cards.png">
          </div>
        </div>
      </div>
    </q-layout-footer>
  </div>
</template>
<script>
  /*Components*/
  import informationFooter from 'src/components/master/footer/information'
  import logoImagina from 'src/components/master/footer/imaginaSVG'
  import GoogleMap from "src/components/GoogleMap";
  import iformService from "src/services/iform/index"
  import {required, email, numeric, minLength} from 'vuelidate/lib/validators'

  import innerLoading from 'src/components/master/innerLoading'
  export default {
    props: {},
    components: {
      informationFooter,
      logoImagina,
      GoogleMap,
      innerLoading
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    /*=== VALIDATIONS ===*/
    validations: {
      form: {
        name: {required},
        phone: {required},
        address: {required},
        message: {required},

      }
    },
    data() {
      return {
        form:{
          name: '',
          phone: null,
          address: '',
          message: '',
          formId: 1
        },
        loading: false
      }
    },
    methods: {
      /*force set val on qinput*/
      forceSet(field, value) {
        this.$nextTick(() => {
          this.form[field] = value
        })
      },

      /*mask value with format phone US*/
      mask(data) {
        return this.$helper.maskPhone(data)
      },

      sendMessage(){
       this.$v.$touch();
       if (this.$v.$error) {
         this.$alert.error('Por favor revisa de nuevo los campos.', 'bottom');
        } else {
          this.loading = true;
          iformService.crud.create('apiRoutes.iform.send', this.form).then(response => {

            if(response.status==="error"){
              this.loading = false;
              this.$alert.error('Ha ocurrido un error al enviar el correo.', 'bottom');
            }else {
              this.loading = false;
              this.$alert.success('Mensaje enviado exitosamente. Pronto nos pondremos en contacto con usted.', 'top');
              this.$router.push({ name: 'app.home' })
            }
            this.$v.$reset()
            this.form = {
              name: '',
              phone: null,
              address: '',
              message: '',
              formId: 1
            }
          });
        }
      }

    }

  }
</script>
<style lang="stylus">
  @import "~variables";
  #footerMaster
    #footer
      position: relative;
      color #DDDDDD !important;
      filter: contrast(110%);
      background-size: cover;
      border-top: 9px solid #EC3800;
      .copyright
        min-height 74px
        font-size 12px
        padding 18px
        svg
          fill #DDDDDD

    .title-uno
      font-size 2.6em

    .baked-icon-color
      color #EC3800
    .googlemap-container
      width 90%!important


    .hover-icon
      transition all .2s
      &:hover
        color #EC3800

    .q-if-standard.q-if-has-label
      margin-top: 7px;
      padding-top: 19px;
      padding: 20px 18px 10px 18px;
      box-shadow: 0px 3px 5px -1px #c1c1c1;
      background-color: white;
    .footer_link-contact
      border-bottom: 1px solid #dddddd82;
      a
        text-decoration: none;
        color: white;
        margin-top: 5px;
        margin-bottom: 5px;
        &:active,
        &:focus,
        &:hover
          color: white;
          text-decoration: underline;
    .footer__link-social a
      color: white;
      &:active,
      &:focus,
      &:hover
        color: #ec3800;

    @media only screen and (max-width: 600px) {
      .googlemap-container{
        width: 100%!important;
      }
	  }

</style>
