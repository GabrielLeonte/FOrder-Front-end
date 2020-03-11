<template>
  <div>
    <div class="section-title">
      <span>Acasă</span>
      <span class="line"></span>
    </div>
    <div class="active-orders">
      <span>Comezi active</span>
    </div>
    <div v-if="orders" class="max">
      <div class="columns is-multiline is-mobile max" v-for="(item, index) in orders" :key="index">
        <div class="column is-full order">
          <div class="service-name">
            <span>{{ item.service_name }}</span>
          </div>
          <div class="service-description">
            <span class="service-description-text">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-order" v-else>
      <span>Nici o comandă activă</span>
    </div>
    <div class="svg" v-if="orders.length">
      <img src="../assets/svg/main_page.svg" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async loadOrders() {
      try {
        this.orders = (await axios.post("http://falticeniorderapp.ddns.net:3030/getOrders", {}, { headers: { auth: this.$store.state.token } })).data.data;
      } catch (err) {
        alert("A aparut o eroare la incarcarea comenzilor active, te rog incearca mai tarziu\n Date tehnice: " + err.message);
      }
    }
  },
  created() {
    this.loadOrders();
  },
  data() {
    return {
      orders: []
    };
  }
};
</script>

<style scoped>
* {
  margin: 0 auto;
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

.svg {
  width: 70%;
  position: absolute;
  bottom: 10vh;
  right: 1vh;
}

.active-orders {
  color: #585858;
  margin-left: 20px;
  margin-top: 12px;
  font-weight: 600;
  font-size: 15px;
}

.no-order {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #727272;
}
.order {
  text-align: center;
  float: left;
  font-size: 12px;
  color: #727272;
}
.max {
  display: block;
  max-height: 10% !important;
}
.service-name {
  text-align: left;
  width: 100%;
  margin-left: 12px;
  font-weight: 700;
  color: #424242;
  font-size: 14px;
  float: left;
}
.service-description {
  text-align: left;
}
.service-description-title {
  font-weight: 700;
  margin-left: 20px;
}
.service-description-text {
  display: block;
  margin-left: 20px;
}
</style>
