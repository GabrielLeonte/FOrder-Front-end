<template>
  <div>
    <div class="section-title">
      <span>Profil</span>
      <span class="line"></span>
    </div>
    <div class="svg">
      <img src="../assets/svg/profile.svg" />
    </div>
  </div>
</template>

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
</style>
