<template>
	<div class="row">	
        <div class="box">
            <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle img-responsive" src="../../../assets/image/logo-login.png" alt="User profile picture">
                <h3 class="profile-username text-center">Imagina Colombia</h3>
                <hr>
                <div class="options-pc">
                    <q-btn flat label="Edit perfil" class="full-width" v-on:click="showInfoEdit" />
                    <q-btn outline label="Mis Orden" to="/orders" class="full-width"/>
                    <q-btn outline label="Desconectar" class="full-width" />
                </div>
                <q-btn-dropdown label="OPCIONES" class="options-mobile">
                    <!-- dropdown content -->
                    <q-list link>
                        <q-item>
                            <q-item-main>
                                <q-item-tile label><q-btn flat label="Edit perfil" class="full-width" v-on:click="showInfoEdit" /></q-item-tile>
                                <q-item-tile label><q-btn flat label="OPCIONES" to="/orders" class="full-width"/></q-item-tile>
                                <q-item-tile label><q-btn flat label="Desconectar" class="full-width" /></q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </div>
	</div>
</template>

<script>


export default {
    name: 'usercard',
    data(){
        return {
            showuseredit: false
        }
    },
    methods:{
        showInfoEdit(){
            this.$emit('showuseredit',true);
        },
    }
}
</script>

<style lang="stylus">
    .perfil
    .q-display-1
        color: #8e7e7d;
    .q-btn-inner
        font-size 1.1rem
    .box
        position relative
        border-radius 3px
        background #ffffff
        border-top 3px solid #d2d6de
        border-top-color #ed4400
        margin-bottom 20px
        width 100%
        box-shadow 0 1px 1px rgba(0,0,0,0.1)
        .profile-user-img
            margin 0 auto
            width 100px
            padding 3px
            border 3px solid #d2d6de
        .img-circle
            border-radius 50%
            margin-top 1.2rem
        .img-responsive
            display block
            max-width 100%
            height auto
        .profile-username
            font-size 21px
            margin-top 5px
        .box-body 
            border-top-left-radius 0
            border-top-right-radius 0
            border-bottom-right-radius 3px
            border-bottom-left-radius 3px
            padding 10px
        .text-muted 
	        color #777
        .q-btn
            border: 1px solid #80808047
            margin-top .2rem
        hr
            border-top: 1px solid #80808047
    .q-btn-dropdown
        width 100%!important
    .options-mobile
        display none


    @media only screen and (max-width: 600px) {
		.perfil{
            .options-mobile{
                display: block!important;
            }
            .options-pc{
                display: none!important;
            }
        }
	}

</style>


