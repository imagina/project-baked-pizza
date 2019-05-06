<template>
  <div class="flex flex-center" style="padding-top: 200px">
    <div class="row  q-mx-xl" style="width: 550px">
      <div class="flex flex-center col-12 col-md-12"
           style="padding: 30px 25px; min-height: 365px">
        <div class="text-center">
          <q-spinner-hourglass color="primary" :size="60"/>
          <h5 class="q-ma-none q-mt-lg text-faded">Cerrando Sesion...</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      setInterval(()=>{ 
        this.$store.dispatch("auth/AUTH_LOGOUT")
        this.$router.push({name:"home"})
      }, 3000);
    }
  }
</script>

