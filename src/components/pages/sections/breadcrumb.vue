<template>
  <section class="container-fluid container-breadcrumb" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
    <div class="container-section">
      <div class="row">
        <div class="col-12">
          <div class="container-breadcrumb__content">
            <router-link tag="a" to="/inicio"> <span>Inicio</span> </router-link> | <span>{{ name }}</span>
          </div>
        </div>    
      </div>
    </div>
  </section>
</template>

<script>
  
  export default {
    name: 'breadcrumb',
    props: {
      'name': { type: String,  default: '' },
      'image' :  {  type: String,   default: '/statics/header-nosotros.png' },
    }
  }
</script>