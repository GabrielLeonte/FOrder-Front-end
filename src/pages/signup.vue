<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-full warn" v-if="err">
      <span>{{ err }}</span>
    </div>
    <div class="column is-full">
      <span class="signup-title">Înregistrare</span>
    </div>
    <div class="column is-full">
      <img class="svg" src="../assets/svg/signup.svg" />
    </div>
    <div class="column is-full">
      <form class="form" @submit.prevent="signup">
        <div class="column is-full">
          <div class="text-input-container">
            <input class="email-pass-input" type="email" placeholder="Adresă de email" v-model="email" required />
          </div>
        </div>
        <div class="column is-full">
          <div class="text-input-container">
            <input class="email-pass-input" type="phone" placeholder="Telefon" v-model="phone" min="10" max="10" required />
          </div>
        </div>
        <div class="column is-half">
          <div class="text-input-container">
            <input id="pass" class="email-pass-input" type="password" placeholder="Parolă" v-model="password" required />
          </div>
        </div>
        <div class="column is-half">
          <div class="button-input-container">
            <input type="submit" value="Inregistrează-te" />
          </div>
        </div>
        <div class="column is-full bottom-text">
          <div style="float: center;">
            <span> <router-link to="/login" class="link">Autentifică-te</router-link>,sau </span>
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
      phone: "",
      password: "",
      err: ""
    };
  },
  methods: {
    async signup() {
      let email = this.email;
      let password = this.password;
      let phone = this.phone;

      if (!email) return (this.$store.state.signupWarn = "Please enter a valid email!");
      if (!password) return (this.$store.state.signupWarn = "Please enter a valid password!");
      if (!phone) return (this.$store.state.signupWarn = "Please enter a valid phone number!");

      try {
        await axios.post("http://falticeniorderapp.ddns.net:3030/signup", { email, phone, password });
        const token = (await axios.post("http://falticeniorderapp.ddns.net:3030/login", { email, password })).data.token;
        const userData = (await axios.post("http://falticeniorderapp.ddns.net:3030/token", { token })).data;

        this.$store.commit("updateUser", userData);
        this.$store.commit("updateToken", token);

        await this.$router.push("/activate");
      } catch (err) {
        if (err) this.err = err.response.data.message;
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: auto 0;
  text-align: center;
}

.signup-title {
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
  bottom: 5px;
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
