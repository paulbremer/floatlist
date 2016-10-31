<template>
  <div class="search">
    <input v-model="search" ref="List">
    <p>search: {{ search }}</p>
  </div>
</template>

<script>
import _ from 'lodash';
import jquery from 'jquery';
import { load } from 'vue-google-maps';
import List from './List';

load('AIzaSyADaVHH2-vDrd5gv_jeVuAO4PICp3DY9cE', '3.24', ['maps', 'places']);

const $ = jquery;

// http://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
  const radlat1 = Math.PI * (lat1 / 180);
  const radlat2 = Math.PI * (lat2 / 180);
  const theta = lon1 - lon2;
  const radtheta = Math.PI * (theta / 180);
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)
  * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist *= (180 / Math.PI);
  dist = dist * 60 * 1.1515;
  if (unit === 'K') { dist *= 2 }
  // if (unit === 'K') { dist *= 1.6371 }
  if (unit === 'N') { dist *= 0.8684 }
  return dist;
}

export default {
  name: 'search',
  props: ['items'],
  data() {
    return {
      search: '',
    };
  },
  watch: {
    // whenever search changes, this function will run
    search: function (newSearch) {
      const self = this;
      self.getLatLong(this.search)
    },
  },
  methods: {
    getLatLong: _.debounce(
      function (search) {
        const self = this;
        const geocoder = new google.maps.Geocoder();
        let searchLat = '';
        let searchLng = '';

        geocoder.geocode( { address: search }, function(results, status) {
          if (status === 'OK') {
            searchLat = results[0].geometry.location.lat();
            searchLng = results[0].geometry.location.lng();
            self.getDistance(search, searchLat, searchLng);
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      },
      // This is the number of milliseconds we wait for the user to stop typing.
      800
    ),
    getDistance: function(search, searchLat, searchLng) {
      const self = this;
      let itemDistance = '';

      console.log('getDistance', search, searchLat, searchLng);
      for (let i = 0; i < self.items.length; i++) {
        const itemLatitude = self.items[i].location.latitude;
        const itemLongitude = self.items[i].location.longitude;
        if (itemLongitude && itemLongitude) {
          itemDistance = distance(searchLat, searchLng, itemLatitude, itemLongitude, 'K');
          if (itemDistance === 0) {
            itemDistance = 1;
          }
          self.items[i].distance = Math.round(itemDistance);
          self.items[i].email += '  ';
        } else {
          self.items[i].distance = '9999';
          self.items[i].email += '  ';
        }
      }
      return _.orderBy(this.items, 'distance');
    },
  },
};
</script>

<style scoped>

</style>
