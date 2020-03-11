<template>
  <div class="columns is-multiline">
    <div class="column is-full">
      <span class="success-title">
        Comandă plasată cu succes!
        <span>ID: {{ this.$route.params.ID }}</span>
      </span>
    </div>
    <div class="column is-full">
      <img src="../assets/svg/success.svg" />
    </div>
    <div class="column is-full">
      <div class="description">
        <span>Comanda ta a fost plasată cu succes, aceasta urmează să fie preluată de un membru al platformei noastre, și îndeplinită în cel mai scurt timp posibil. </span>
        <span>Vei primi o notificare atunci când cineva îți va prelua cererea.</span>
      </div>
    </div>
    <div class="column is-full">
      <div class="container-button">
        <input class="home" @click="home" value="Către pagina principală" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async home() {
      try {
        await this.$router.push("/");
      } catch (err) {
        if (err) alert("A aparut o eroare, te rog incearca mai tarziu\n Date tehnice: " + err);
      }
    }
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
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
.success-title {
  display: block;
  font-weight: 700;
  text-align: center;
  font-size: 25px;
  margin-bottom: 20%;
}
.description {
  margin-top: 10%;
}
span {
  display: block;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
}
.container-button {
  text-align: center;
}
.home {
  text-align: center;
  float: center;
  height: 40px;
  width: 60%;
  border: 0;
  border-radius: 15px;
  background-color: #312da4;
  color: #fff;
  font-size: 13px;
  margin-top: 15vh;
}
</style>
