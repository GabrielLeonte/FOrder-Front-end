<template>
  <div>
    <div class="section-title">
      <span>{{ service.name }}</span>
      <span class="line"></span>
    </div>
    <div class="location-container">
      <span>Locație</span>
    </div>
    <div class="column">
      s
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      serviceID: this.$route.params.service,
      service: ""
    };
  },
  methods: {
    async getService() {
      try {
        this.service = (await axios.post("http://falticeniorderapp.ddns.net:3030/getService", { service: this.serviceID }, { headers: { auth: this.$store.state.token } })).data.data;
      } catch (err) {
        alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    }
  },
  created() {
    this.getService();
  }
};
</script>

<style scoped>
* {
  margin: auto 0;
  font-family: "Roboto", sans-serif;
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

.location-container {
  color: #585858;
  margin-left: 20px;
  margin-top: 12px;
  font-weight: 600;
  font-size: 13px;
}
</style>
