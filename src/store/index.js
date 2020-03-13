import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    user: {},
    location: {},
    confirmationCode: ""
  },
  mutations: {
    async addToCart(state, payload) {
      try {
        const response = await axios.post("http://falticeniorderapp.ddns.net:3030/getProduct", { puid: payload.id }, { headers: { auth: state.token } });

        if (state.cart.find(element => element.puid === payload.id))
          state.cart.forEach(element => {
            if (element.puid === payload.id) return element.quantity++;
          });
        // add the product in the state cart object
        else
          state.cart.push({
            name: response.data.data.name,
            puid: response.data.data.uuid,
            quantity: 1,
            shop: response.data.data.shop,
            price: response.data.data.price,
            weight: response.data.data.weight
          });
      } catch (err) {
        alert(err);
      }
    },
    updateCoordinates(state, payload) {
      axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${payload.obj.lat}+${payload.obj.lng}&key=43459ac2d66244678ec6b582c6d83b58`).then(data => {
        state.location = {
          village: data.data.results[0].components.village,
          county: data.data.results[0].components.county,
          postcode: data.data.results[0].components.postcode
        };
      });
    },
    updateToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    updateUser(state, data) {
      state.user = data;
    }
  },
  actions: {
    async checkToken({ state }) {
      const token = state.token || localStorage.getItem("token");

      try {
        let userData = await axios.post("http://falticeniorderapp.ddns.net:3030/token", { token });
        state.user = userData.data.data;
      } catch (err) {
        alert(err);
      }
    },
    async logout({ state }) {
      try {
        state.user = "";
        state.token = "";
        localStorage.removeItem("token");
        router.push("/login");
      } catch (err) {
        if (err) alert(err);
      }
    },
    cleanWarns({ state }) {
      state.signupWarn = "";
      state.loginWarn = "";
    }
  }
});
