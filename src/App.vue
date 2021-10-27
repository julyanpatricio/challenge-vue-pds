<template>
  <div id="app">
    <img src="https://pdssa.com.ar/wp-content/uploads/2021/03/logo_st.png">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/Var.scss';

html, body, #app{
  height: -webkit-fill-available;
}

body{
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: $background-app;
}


</style>