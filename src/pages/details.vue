<template>
  <div>
    <div class="section-title">
      <span>{{ item.service_name }}</span>
      <span class="line"></span>
    </div>
    <div class="columns is-multiline is-gapless list-container">
      <div class="column">
        <span class="status">Status:</span>
        <span class="data">&#8226; {{ item.status }}</span>
      </div>
      <div class="column">
        <span class="status">ID Cerere:</span>
        <span class="data">&#8226; {{ item.id }}</span>
      </div>
      <div class="column">
        <span class="status">Descriere:</span>
        <span class="data">&#8226; {{ item.description }}</span>
      </div>
      <div class="column">
        <span class="status">Buget: </span>
        <span class="data">&#8226; {{ item.budget }} RON</span>
      </div>
      <div class="column">
        <span class="status">Data </span>
        <span class="data">&#8226; {{ new Date(item.timestamp).toUTCString() }}</span>
      </div>

      <div class="column">
        <div v-if="item.taken_by">
          <span>Curier: {{ item.taken_by }}</span>
          <span class="data"> {{ item.last_location }}</span>
        </div>
        <div v-else>
          <span>Nu se pot afisa date de tip geolocatie</span>
        </div>
      </div>
    </div>
    <div class="svg">
      <img src="../assets/svg/details.svg" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: JSON.parse(this.$route.params.ID)
    };
  }
};
</script>

<style scoped>
* {
  margin: auto 0;
  font-family: "Roboto", sans-serif;
}
.section-title {
  font-size: 20px;
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
.list-container {
  margin-left: 20px;
  line-height: 24px;
  margin-top: 20px;
}
.status {
  position: relative;
  color: #585858;
  padding-top: 12px;
  font-weight: 600;
  font-size: 15px;
}
.data {
  font-weight: 700;
  font-size: 13px;
  color: #393939;
  margin-left: 12px;
}
</style>
