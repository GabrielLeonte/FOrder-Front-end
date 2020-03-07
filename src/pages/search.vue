<template>
  <div>
    <div class="section-title">
      <span>Servicii</span>
      <span class="line"></span>
    </div>
    <div class="columns is-gapless">
      <div class="column is-full" v-for="(item, index) in services" :key="index">
        <div class="service">
          <div class="service-title">
            <span>{{ item.name }}</span>
          </div>
          <div class="service-description">
            <span>&bull; {{ item.description }}</span>
          </div>
          <div class="service-button">
            <span @click="createOrder(item.uuid)"> Crează o cerere </span>
          </div>
        </div>
      </div>
    </div>
    <div class="svg">
      <img src="../assets/svg/services.svg" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getServices();
  },
  methods: {
    async getServices() {
      try {
        // prettier-ignore
        this.services = (await axios.post("http://falticeniorderapp.ddns.net:3030/getServices", {}, { headers: { auth: this.$store.state.token } })).data.data;
      } catch (err) {
        alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    },
    createOrder(item) {
      try {
        this.$router.push(`/service/${item}`);
      } catch (err) {
        alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    }
  },
  data() {
    return {
      services: ""
    };
  }
};
</script>

<style scoped>
* {
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
}

.column {
  display: block;
}

.columns {
  margin-top: 12px;
}

.service {
  display: block;
  position: relative;
  height: 60px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  color: #393939;
}

.service-title > span {
  color: #585858;
  margin-top: 12px;
  font-weight: 600;
  font-size: 15px;
}

.service-description {
  line-height: 13px;
}

.service-description > span {
  color: #727272;
  font-weight: 300;
  font-size: 11px;
  margin-left: 5px;
}
.service-button {
  position: absolute;
  right: 0px;
  margin-top: 10px;
}
.service-button > span {
  font-size: 13px;
  font-weight: 600;
  color: #464646;
}

.section-title {
  font-size: 25px;
  color: #414141;
  font-weight: 600;
  margin-left: 20px;
}

.line {
  display: block;
  width: 100%;
  margin-top: 5px;
  border-top: solid #e18080e7 0.5px;
}

.svg {
  width: 60%;
  position: absolute;
  bottom: 10vh;
  right: 1vh;
}
</style>
