<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-full">
      <img src="../assets/svg/mail.svg" />
    </div>
    <div class="column is-full">
      <div class="main-text">
        <div>
          <span class="activate-title">Este timpul să îți activăm contul!</span>
        </div>
        <div>
          <span class="note">Un cod de activare a fost trimis prin email <br />la adresa {{ $store.state.user.email }}!</span>
        </div>
      </div>
    </div>
    <div class="column is-full">
      <form class="pin-form">
        <input type="tel" maxlength="1" class="pin-input" v-model="one" required @input="$event.target.nextElementSibling.focus()" />
        <input type="tel" maxlength="1" class="pin-input" v-model="two" required @input="$event.target.nextElementSibling.focus()" />
        <input type="tel" maxlength="1" class="pin-input" v-model="three" required @input="$event.target.nextElementSibling.focus()" />
        <input type="tel" maxlength="1" class="pin-input" v-model="four" required />
      </form>
    </div>
    <div class="column is-full">
      <div class="button-input-container">
        <input type="submit" value="Activează" @click="activate" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      one: "",
      two: "",
      three: "",
      four: "",
      code: "",
      generatedCode: ""
    };
  },
  methods: {
    async activate() {
      // check if all 4 fields are filled, get input code based on a simple math
      if (this.one && this.two && this.three && this.four) this.code = 1000 * this.one + 100 * this.two + 10 * this.three + 1 * this.four;

      // commit code verification inside store
      try {
        if (this.code === this.generatedCode) await axios.post("http://falticeniorderapp.ddns.net:3030/confirmAccount", {}, { headers: { auth: this.$store.state.token } });
        else return alert("Codul introdus este gresit!");
        await this.$router.push("/");
      } catch (err) {
        if (err) alert("Eroare, te rog încearcă din nou mai târziu!\n Date tehnice: " + err);
      }
    }
  },
  async mounted() {
    if (this.$store.state.user.active === 1)
      this.$router.push("/").catch(err => {
        if (err) alert(err);
      });
    else {
      try {
        // get the confirmation code from the client
        const response = await axios.post("http://falticeniorderapp.ddns.net:3030/generateConfirmationCode", {}, { headers: { auth: this.$store.state.token } });

        // update the state with the confirmation code
        this.generatedCode = response.data.data.code;
      } catch (err) {
        // catch any possible error
        if (err) alert(err);
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

.main-text {
  margin-top: 2vh;
}

.activate-title {
  position: relative;
  width: 100%;
  color: #312da4;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 700;
}

img {
  margin-top: 2vh;
  width: 200px;
  float: center;
}

.note {
  font-family: "Roboto", sans-serif;
  margin-top: 5vh;
  max-width: 200px;
  float: center;
  color: black;
  font-size: 12px;
  font-weight: 300;
}

.pin-form {
  margin-top: 20px;
}

.pin-input {
  font-family: "Roboto", sans-serif;
  color: #393939;
  width: 50px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  border: 0;
  border-bottom: 1px solid black;
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
  margin-top: 10vh;
}

.button-input-container > input:active {
  background-color: #050192;
}
</style>
