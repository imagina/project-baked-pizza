<template>
	<div class="row">	
        <q-card class="col-xs-12 col-sm-12 col-md-12">
        <q-card-media>
            <img src="../../../assets/image/logo-login.png" alt="">
        </q-card-media>
        <q-card-separator />
        <q-card-title>
            <span class="name">Imagina Colombia</span>
        </q-card-title>
        <q-card-separator />
        <!-- Vertical actions -->
        <q-card-actions vertical>
        <q-btn flat label="Edit perfil" />
        <q-btn flat label="Mis Orden" to="/orders"/>
        <q-btn flat label="Desconectar" />
        </q-card-actions>
        </q-card>
	</div>
</template>

<script>

export default {
    name: 'usercard',
}
</script>

<style lang="stylus">
   .name
       font-size 1.5rem

   .q-btn-inner
        font-size 1.1rem

</style>


