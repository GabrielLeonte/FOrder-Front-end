<template>
  <div>
    <div class="section-title">
      <span>Preia un serviciu</span>
      <span class="line"></span>
    </div>
    <div class="active-orders">
      <span>Cereri în așteptare</span>
    </div>
    <div v-if="orders.length > 0" class="max">
      <div class="columns is-multiline is-mobile max" v-for="(item, index) in orders" :key="index">
        <div class="column is-full order">
          <div class="service-name">
            <span>{{ item.service_name }} </span>
          </div>
          <div class="service-description">
            <span class="service-description-text">&#8226; {{ item.description }}</span>
            <span class="location">&#8226; Locatie: {{ item.street }}, Numarul: {{ item.address_house_number }}</span> <br />
            <span class="price">&#8226; Ofer: {{ item.budget }} RON</span>
          </div>
          <div class="service-footer"></div>
        </div>
      </div>
    </div>
    <div class="no-order" v-else>
      <span>Nici o cerere în așteptare</span>
    </div>
    <div class="svg">
      <img src="../assets/svg/take-a-service.svg" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    async getAllOrders() {
      try {
        this.orders = (await axios.post("http://falticeniorderapp.ddns.net:3030/getAllOrders", {}, { headers: { auth: this.$store.state.token } })).data.data;
      } catch (err) {
        alert("A aparut o eroare la incarcarea comenzilor active, te rog incearca mai tarziu\n Date tehnice: " + err.response.data);
      }
    }
  },
  created() {
    this.getAllOrders();
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
.svg {
  width: 60%;
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
.order {
  text-align: center;
  float: left;
  font-size: 12px;
  color: #727272;
}
.no-order {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #727272;
}
.max {
  display: block;
  margin-top: 12px;
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
.service-footer {
  margin-left: 12px;
  text-align: left;
}
.service-description > .price {
  margin-left: 10px;
  font-weight: 700;
  width: 100%;
}
.service-footer > .date {
  float: right;
}
.service-description > .status {
  font-weight: 700;
  margin-left: 12px;
}
.service-description > .location {
  margin-left: 20px;
}
</style>
