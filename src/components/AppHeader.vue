<template>
  <header>
   <img src="https://pdssa.com.ar/wp-content/uploads/2021/03/logo_st.png">
   <div class="button-logout"  v-if="currentRoutePath === '/'" @click="logout">Logout</div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app-header",
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    currentRoutePath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/Var.scss";
  .button-logout{
    position: absolute;
    right: 5%;
    top: 5%;
    color: white;
    box-shadow: $shadow-login;
    font-size: x-large;
    padding: 1%;
    cursor: pointer;
  }
</style>