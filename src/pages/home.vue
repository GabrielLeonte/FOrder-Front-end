<template>
  <div>
    <div class="section-title">
      <span>Acasă</span>
      <span class="line"></span>
    </div>
    <div class="active-orders">
      <span>Comezi active</span>
    </div>
    <div class="no-order">
      <span>Nici o comandă activă</span>
    </div>
    <div class="svg">
      <img src="../assets/svg/main_page.svg" />
    </div>
  </div>
</template>

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
  font-size: 13px;
}

.no-order {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #727272;
}
</style>
