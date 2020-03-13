<template>
  <div>
      <div v-if="1 == 0">
             <GmapMap :center="{ lat: 47.462872, lng: 26.299721 }" :zoom="14" map-type-id="terrain" style="width: 100%; height: 300px" :options="{ zoomControl: false,  mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false,disableDefaultUi: false}">
        <GmapMarker :position="{ lat: 47.462872, lng: 26.299721 }" />
    </GmapMap>
      </div>
      <div v-else>Mda, its working</div>
  </div>
</template>

<style scoped>
* {
  margin: auto 0;
}
</style>
