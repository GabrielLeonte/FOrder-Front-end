// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});
