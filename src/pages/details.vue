<template>
  <div>
    <div class="section-title">
      <span>{{ item.service_name }}</span>
      <span class="line"></span>
    </div>
    <div class="column is-full full">
      <div class="details">
        <span class="big-title">Detalii</span> <br />
        <span>Status {{ item.status }}</span> <br />
        <span>ID Comanda {{ item.id }}</span> <br />
        <span>Buget {{ item.budget }} RON </span> <br />
        <span>Solicitant: {{ item.contact_firstname }} {{ item.contact_lastname }}</span> <br />
        <span>Contact Solicitant: +{{ item.contact_phone }} (RO)</span> <br />
      </div>
      <div class="details">
        <span class="big-title">Locatie</span> <br />
        <span>{{ item.street }}, Numarul {{ item.address_house_number }} </span> <br />
        <span>Blocul {{ item.address_block_number.toUpperCase() }}</span> <br />
        <span>Apartamentul {{ item.address_apartament_number }} </span><br />
        <span v-if="item.taken_by">{{ item }}</span>
      </div>
      <div class="details">
        <span class="big-title">Descriere</span> <br />
        <span>
          {{ item.description }}
        </span>
      </div>
      <!-- <div class="column">
        <div v-if="item.taken_by">
          <span>Curier: {{ item.taken_by }}</span>
          <span class="data"> {{ item.last_location }}</span>
        </div>
        <div v-else>
          <span>Nu se pot afisa date de tip geolocatie</span>
        </div>
      </div>-->
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
  line-height: 24px;
  margin-top: 20px;
}
.status {
  position: relative;
  color: #393939;
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
.column {
  text-align: center;
}
.full {
  display: block;
  font-size: 13px;
}
.details {
  display: block;
  margin-top: 20px;
  box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.18);
  text-align: left;
  padding: 10px 10px 5px 10px;
  border-radius: 2px;
}
.big-title {
  display: block;
  font-weight: 700;
  margin-bottom: -15px;
}
</style>
