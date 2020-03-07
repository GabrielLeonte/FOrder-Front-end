<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-full">
      <span class="login-title">Autentificare</span>
    </div>
    <div class="column is-full warn" v-if="err">
      <span>{{ err }}</span>
    </div>
    <div class="column is-full">
      <img class="svg" src="../assets/svg/login.svg" />
    </div>
    <div class="column is-full">
      <form class="form" @submit.prevent="login">
        <div class="column is-full">
          <div class="text-input-container">
            <input class="email-pass-input" type="email" placeholder="Adresă de email" v-model="email" />
          </div>
        </div>

        <div class="column is-half">
          <div class="text-input-container">
            <input id="pass" class="email-pass-input" type="password" placeholder="Parolă" v-model="password" />
          </div>
        </div>
        <div class="column is-full">
          <div class="button-input-container">
            <input type="submit" value="Intră în cont" />
          </div>
        </div>
        <div class="column is-full bottom-text">
          <div>
            <span> <router-link to="/signup" class="link">Crează un cont nou</router-link>,sau </span>
          </div>
          <div>
            <router-link to="/reset" class="link">Resetează parola</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      err: ""
    };
  },
  methods: {
    async login() {
      let email = this.email;
      let password = this.password;

      if (!email) return (this.$store.state.loginWarn = "Please enter a valid email!");
      if (!password) return (this.$store.state.loginWarn = "Please enter a valid password!");

      try {
        // post request to the api
        const token = (await axios.post("http://falticeniorderapp.ddns.net:3030/login", { email, password })).data.token;
        const userData = (await axios.post("http://falticeniorderapp.ddns.net:3030/token", { token })).data;

        this.$store.commit("updateUser", userData);
        this.$store.commit("updateToken", token);
        await this.$router.push("/");
      } catch (err) {
        if (err) this.err = err.response.data.message;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap");

* {
  margin: auto 0;
  text-align: center;
}

.login-title {
  width: 100%;
  position: absolute;
  display: block;
  color: #312da4;
  font-family: "Roboto", sans-serif;
  font-size: 30px;
  text-align: right;
  font-weight: 500;
  top: 10px;
  right: 15px;
}

.svg {
  width: 75%;
  margin-top: 20%;
}

.warn {
  position: fixed;
  font-weight: 700;
  font-size: 14px;
}

.text-input-container {
  display: block;
}

.text-input-container > input {
  width: 100%;
}

.button-input-container > input {
  height: 40px;
  width: 60%;
  border: 0;
  border-radius: 15px;
  background-color: #312da4;
  color: #fff;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  margin-top: 15vh;
}

.button-input-container > input:active {
  background-color: #050192;
}

.email-pass-input {
  height: 25px;
  vertical-align: middle;
  padding: 7px 7px 7px 7px;
  border-style: solid;
  border-color: transparent;
  border-width: 0.5px;
  box-shadow: none;
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  border-bottom: 0.02px solid #929292;
  text-align: left;
}

.bottom-text {
  position: fixed;
  bottom: 0px;
  font-size: 11px;
  text-align: center;
  width: 100%;
}

.link {
  outline: none;
  color: #393939;
  text-decoration: none;
  color: inherit;
}
</style>
