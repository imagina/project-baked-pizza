<template>
	<div>
	</div>
</template>

<script>
    import Echo from "laravel-echo"
    import {helper} from "@imagina/qhelper/_plugins/helper";

    export default {
    data(){
      return {
        permissionForNotification: false,
        echo: false,
        channels: 'global',
        listen: '.orderStatusCreated',
        optionsPusher:{
          broadcaster: env('BROADCAST_DRIVER', 'pusher'),
          key: env('PUSHER_APP_KEY'),
          cluster: env('PUSHER_APP_CLUSTER'),
          encrypted: env('PUSHER_APP_ENCRYPTED')
        },
        userId: null
      }
    },
	  created() {
      this.$nextTick( async () => {
        helper.storage.get.item('userId').then( async response => {
          if (response != null){
            this.userId = response
		        await this.checkPermissionForNotification()
		        await this.initPusher()
		        await this.initChanels()
          }
        }).catch( error => console.warn(error))
      })
    },
    methods:{
      async initPusher(){
        this.echo = null
	      this.echo = new Echo(this.optionsPusher)
	      console.log('[APP] init pusher')
      },
      async initChanels(){
        this.echo.channel(this.channels).listen(`${this.listen}${this.userId}`, ({ order }) => {
	        if (order.customerId == this.userId){
            let configNotification = {
              title: 'Su Orden se actualizo',
              message: `La Orden #${order.id} ha cambiado de estado a ${order.statusName}`,
              icon: this.$store.getters['site/getSettingMediaByName']('isite::logo1').path,
              click_action: `https://www.bakedpizza.com.co/#/order/${order.id}`,
            }
            this.showPushNotitication(configNotification)
            if(this.$q.platform.is.cordova){
              FCMPlugin.subscribeToTopic(`orderStatusCreated${this.$store.state.quserAuth.userData.id}`);
            }
	        }
        })
        console.log('[APP] init channels')
	    },
      checkPermissionForNotification(){
        window.Notification.requestPermission().then( response => {
          if (response === 'granted'){
            this.permissionForNotification = true
          }
        })
        console.log('[APP] Set permission for push notification')
      },
      showPushNotitication({title = '', message = '', icon = '', click_action = ''}){
        if (this.permissionForNotification ){
          navigator.serviceWorker.ready.then( registration => {
            registration.showNotification(title, {
              body: message,
              icon: icon,
              click_action: click_action
            })
          }).catch(error => console.error(error))
        }
        console.log('[APP] Send Push Notification')
      },
		}
  }
</script>