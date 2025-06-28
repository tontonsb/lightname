<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { ref } from "vue"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"

const zoom = ref(2)
</script>

<template>
  <div style="height:600px; width:800px">
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></LTileLayer>
      <!--
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
	    {
	      attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
	      subdomains: 'abcd',
	      maxZoom: 14,
	    }
      -->
    </LMap>
  </div>
</template>
