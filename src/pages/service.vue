<template>
  <div>
    <form @submit.prevent="proceed">
      <div class="back-button">
        <span @click="goBack">Back</span>
      </div>
      <div class="form-title">
        <span>{{ service.name }}</span>
        <span class="line"></span>
      </div>
      <div class="form-column">
        <span>Persoana de contact</span>
        <div class="contact-person">
          <div>
            <span>Nume</span>
            <div><input type="text" v-model="firstname" required /></div>
          </div>
          <div>
            <span>Prenume</span>
            <div><input type="text" v-model="lastname" required /></div>
          </div>
        </div>
      </div>
      <div class="form-column">
        <span>Descriere cerere</span>
        <div>
          <textarea cols="20" rows="3" v-model="description" required />
        </div>
      </div>
      <div class="form-column">
        <span>Adresă</span>
        <div class="street">
          <span>Stradă</span>
          <select v-model="chosenStreet">
            <option v-for="(item, index) in streets" :key="index" :value="item.name">{{ item.name }}</option>
          </select>
        </div>
        <div class="phoneNumber">
          <span>Număr de telefon</span>
          <div>
            <input type="number" v-model="phone" required />
          </div>
        </div>
        <div class="address">
          <div class="address-block">
            <span>Bloc</span>
            <div><input type="text" v-model="block_number" required /></div>
          </div>
          <div class="address-number">
            <span>Număr</span>
            <div><input type="number" v-model="house_number" required /></div>
          </div>
          <div class="addr=ess-apartment">
            <span>Apartament</span>
            <div><input type="number" v-model="apartment_number" required /></div>
          </div>
        </div>
      </div>
      <div class="form-column">
        <span>Recompensă</span>
        <div class="price-form">
          <div><input type="number" v-model="offer" required /> RON</div>
        </div>
      </div>
      <div class="submit-button">
        <input type="submit" value="Continuă" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      serviceID: this.$route.params.service,
      service: "",
      streets: "",
      chosenStreet: "",
      description: "",
      phone: Number(`40${this.$store.state.user.phone}`),
      firstname: this.$store.state.user.first_name,
      lastname: this.$store.state.user.last_name,
      house_number: "",
      block_number: "",
      apartment_number: "",
      offer: ""
    };
  },
  methods: {
    async getService() {
      try {
        this.service = (await axios.post("http://falticeniorderapp.ddns.net:3030/getService", { service: this.serviceID }, { headers: { auth: this.$store.state.token } })).data.data;
      } catch (err) {
        if (err) alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    },
    async getStreets() {
      try {
        this.streets = (await axios.post("http://falticeniorderapp.ddns.net:3030/getStreets", {}, { headers: { auth: this.$store.state.token } })).data.data;
        this.chosenStreet = this.streets[0].name;
      } catch (err) {
        if (err) alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    },
    async goBack() {
      try {
        await this.$router.push("/search");
      } catch (err) {
        if (err) alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    },
    async proceed() {
      try {
        // get post request data
        let data = await axios.post(
          "http://falticeniorderapp.ddns.net:3030/createOrder",
          {
            serviceID: Number(this.serviceID),
            street: this.chosenStreet,
            description: this.description,
            contact_phone: Number(this.phone),
            contact_firstname: this.firstname,
            contact_lastname: this.lastname,
            house_number: Number(this.house_number),
            block_number: this.block_number,
            apartment_number: Number(this.apartment_number),
            offer: Number(this.offer)
          },
          { headers: { auth: this.$store.state.token } }
        );

        // push to success page
        await this.$router.push(`/successOrder/${data.data.id}`);
      } catch (err) {
        if (err)
          if (err.response.data.message === "Limita de cereri maxime a fost atinsă! (2 cereri)") alert(err.response.data.message);
          else alert("A aparut o eroare, te rog incearca mai tarziu\nDate tehnice: " + err.response.data.message);
      }
    }
  },
  created() {
    this.getService();
    this.getStreets();
  }
};
</script>

<style scoped>
* {
  margin: auto 0;
  font-family: "Roboto", sans-serif;
  outline: none;
  user-select: none;
}
.back-button {
  position: fixed;
  top: 10px;
  left: 15px;
  font-weight: 600;
  color: #414141;
  font-size: 13px;
}
.form-title {
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
.street > select {
  width: 95%;
  padding: 0 0 7px 0;
  color: #585858;
  border: 0;
  border-bottom: 0.02px solid #929292;
  background: 0 0;
}
.form-column {
  color: #585858;
  margin-left: 20px;
  margin-top: 25px;
  font-size: 13px;
}
.form-column > span {
  font-weight: 600;
  font-size: 13px;
}
.form-column > div > textarea {
  resize: none;
  width: 95%;
  height: 60px;
  margin-top: 10px;
}
.address {
  display: flex;
  margin-top: 20px;
}
.address-number {
  width: 50px;
  margin-left: 10px;
  margin-right: 20px;
}
.address-block {
  width: 50px;
  margin-right: 10px;
}
.address-apartment {
  margin-left: 15px;
  margin-right: 10px;
  width: 50px;
}
.address > div > div > input {
  width: 60px;
}
.phoneNumber > div > input {
  width: 95%;
}
input {
  border: 0;
  border-bottom: 0.02px solid #929292;
}
.contact-person {
  display: flex;
}
.contact-person,
.phoneNumber,
.street,
.price-form {
  margin-top: 10px;
}
.contact-person > div > div > input {
  width: 150px;
  margin-right: 20px;
}
.price-form > div > input {
  width: 70px;
}
.submit-button {
  text-align: center;
  padding-top: 100px;
}

.submit-button > input {
  height: 40px;
  width: 60%;
  border: 0;
  border-radius: 15px;
  background-color: #312da4;
  color: #fff;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
}
</style>
