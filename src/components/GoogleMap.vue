<template>
  <div>
    <div id="mapFooter"  style="width:100%; height:300px"></div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      map:{},
      marker:''
    };
  },
  mounted() {
    this.$nextTick(function () {
      
      this.initializeMap();
    })
  },
  methods: {
    initializeMap() {
    
      //MAP
      var center = new google.maps.LatLng( 4.6361606,  -74.16523990000002 );
      var options = {
        zoom: 16,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,// ROADMAP | SATELLITE | HYBRID | TERRAIN
      };
    
      this.map = new google.maps.Map(document.getElementById("mapFooter"), options);
    
    
      this.marker = new google.maps.Marker({
        map: this.map,
        draggable: false,
        position: center
      });
    
   
    },
  }
};
</script>