<template>
  <div id="app">
  	<headers></headers>
    <keep-alive> 
        <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view>
        <footers></footers>
  </div>
</template>

<script>
import headers from './components/layout/header.vue'
import footers from './components/layout/footer.vue'
export default {
  name: "app",
  components: {
  	headers,
  	footers
  }
};
</script>
<style>
@import "./statics/css/base.css";
</style>


