<template>
  <div id="app">
    <div v-if="active">
      <splashScreen />
    </div>
    <div v-else>
      <router-view />
      <tabs v-if="$store.state.token && $store.state.user.active && (this.$route.name != 'ServicePage') && (this.$route.name != 'successOrderPage') && (this.$route.name != 'detailsPage')" />
    </div>
  </div>
</template>

<script>
import splashScreen from "./components/splashscreen";
import top from "./components/header";
import tabs from "./components/tabs";

export default {
  name: "App",
  data() {
    return {
      active: true
    };
  },
  components: {
    splashScreen,
    tabs
  },
  async created() {
    try {
      // show splash screen after 3000 ms (3 sec)
      setTimeout(() => (this.active = !this.active), 3000);

      // load user data into store if state have a token
      if (this.$store.state.token) this.$store.dispatch("checkToken");
      // make sure that the account is active
      if (!this.$store.state.user.active && !!this.$store.state.token) await this.$router.push("/activate");
    } catch (err) {
      if (err) alert(err);
    }
  },
  watch: {
    $route(to, from) {
      if (this.$store.state.token) this.$store.dispatch("checkToken");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto:200,400,700&display=swap");

* {
  margin: 0 auto;
  user-select: none;
  outline: none;
}

html,
body {
  background-color: #fdfdff;
}

#app {
  color: #393939;
  margin-top: 30px;
}
</style>
