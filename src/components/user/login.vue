<template>
  <q-page class="flex flex-center">
    <div class="row" style="width: 500px">
      <div id="form-login-right"
        class="col-12 col-md-12">
        
        <h4 class="text-primary text-center q-mt-none q-mb-md q-pb-sm">
          <img src="statics/logo.png"> <br>
        </h4>
        <!--=== USER ===-->
        <q-field
          :error="$v.form.username.$error"
          error-label="Este Campo es requerido"
          class="q-mb-md">
          <q-input name="email"
            autofocus
            autocomplete="off"
            v-model="form.username"
            type="text"
            :before="[{icon: 'person'}]"
            float-label="Correo Electrónico"/>
        </q-field>
        <!--=== PASS ===-->
        <q-field
          :error="$v.form.password.$error"
          error-label="Este Campo es requerido"
          class="q-my-md">
          <q-input v-model="form.password"
            type="password"
            name="password"
            :before="[{icon: 'lock'}]"
            float-label="Contraseña"/>
        </q-field>
        <!--=== LOGIN ===-->
        <div class="text-center q-pt-lg">
          <q-btn 
            :loading="loading_login"
            color="primary"
            name="submit"
            class="full-width"
            @click="authenticate()">
            Acceder
            <span slot="loading">
              <q-spinner-hourglass class="on-left"/>
              Validando...
            </span>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
  import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import {helper} from '@imagina/qhelper/_plugins/helper'
  export default {
    data() {
      return {
        form: {
          username: null,
          password: null
        },
        rememberData: true,
        loading_login: false
      }
    },
    validations: {
      form: {
        username: {required},
        password: {required}
      }
    },
    methods: {
      async authenticate() {
        this.$v.$touch();
        if (this.$v.$error) {
          alert.error('Por favor revise los campos de nuevo.', 'bottom');
        } else {
          this.loading_login = !this.loading_login;
          const {username, password} = this.form;
          this.$store.dispatch("auth/AUTH_REQUEST", {username, password}).then(response => {
            this.loading_login = !this.loading_login;
            this.$emit('userLogged')
            this.$root.$emit('sesionStart')
          });
        }
      },
    }
  }
</script>
