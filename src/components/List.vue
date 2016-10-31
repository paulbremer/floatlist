<template>
  <div class="list grid">

    <div id="floatList">

      <search :items="items"></search>

      <main class="site-content" role="main" v-on:keyup.esc="closeModal">

        <ListPlaceholder v-if="isLoading"></ListPlaceholder>

        <div class="grid">
          <div class="item" v-for="item in orderedByName()" transition="item" track-by="item.id">
            <div class="item-image" v-if="item.image" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
            <a class="item-link" href="/" :data-id="item.id" :data-name="item.name.toLowerCase().replace(/\s+/g, '-')" :data-country="item.location.country.toLowerCase().replace(/\s+/g, '-')" v-on:click.prevent="openModal">
              <span class="item-name">{{item.name}}</span>
              <span class="hidden item-email">{{item.email}}</span>
              <span class="item-distance" v-if="item.distance && item.distance < 9999">📍 {{item.distance}}km</span>
              <span class="item-city" v-if="item.location.city">{{item.location.city}} </span>
              <span class="item-country-emoji" v-if="item.location.emoji">{{item.location.emoji}}</span>
            </a>
          </div>
        </div>
      </main>

      <div class="modal" v-bind:class="{ modalOpen: isModalActive }" v-on:keyup.esc="closeModal">
        <div class="modal-wrapper">
          <div class="modal-header">
            <a href="/" class="close" v-on:click.prevent="closeModal">&laquo; all items</a>
            <h2>{{singleItem.name}}</h2>
          </div>
          <div class="modal-content">
            <div class="modal-image" :style="{ backgroundImage: 'url(' + singleItem.image + ')' }"></div>
            <div class="modal-info">
              <span v-if="singleItem.phone">{{singleItem.phone}}<br></span>
              <span v-if="singleItem.website">{{singleItem.website}}<br></span>
              <span v-if="singleItem.email">{{singleItem.email}}<br></span>
              <span v-if="singleItem.logo"><img :src="singleItem.logo" height="100" /><br></span>
              <span v-if="singleItem.location.address_name">{{singleItem.location.address_name}} {{singleItem.location.address_number}}<br></span>
              <span v-if="singleItem.location.postalcode">{{singleItem.location.postalcode}}<br></span>
              <span v-if="singleItem.location.city">{{singleItem.location.city}}<br></span>
              <span v-if="singleItem.location.country">{{singleItem.location.country}}<br></span>
              <span v-if="singleItem.location.address_name"><img :src="'https://maps.googleapis.com/maps/api/staticmap?center=' + singleItem.location.address_name + ',' + singleItem.location.address_number + ',' + singleItem.location.postalcode + ',' + singleItem.location.city + '&zoom=13&size=500x200&markers=color:red%7C' + singleItem.location.address_name + ',' + singleItem.location.address_number + ',' + singleItem.location.postalcode + ',' + singleItem.location.city + '&style=feature:road%7Celement:geometry%7Clightness:50%7Cvisibility:simplified&style=feature:road%7Celement:labels%7Cvisibility:off&key=AIzaSyADaVHH2-vDrd5gv_jeVuAO4PICp3DY9cE'" :alt=" singleItem.name "/><br></span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import jquery from 'jquery';
import emojiFlags from 'emoji-flags';
import VueResource from 'vue-resource';
import Hello from 'components/Hello';
import Search from 'components/Search';
import ListPlaceholder from 'components/ListPlaceholder';

const $ = jquery;
const apiURL = 'http://www.paulbremer.nl/labs/floatlist/api/api2.php';

export default {
  name: 'list',
  components: {
    Hello,
    Search,
    ListPlaceholder,
  },
  data() {
    return {
      isModalActive: false,
      isLoading: false,
      singleItem: {
        location: {},
      },
      items: null,
      sortKey: '',
      searchKey: '',
    };
  },
  created: function() {
    this.isLoading = true;
    this.fetchData();

    if (this.$route.path !== '/') {
      const path = this.$route.path.slice(window.location.href.indexOf('?') + 2).split('/');
      const routename = path[1];
      const routecountry = path[0];

      this.openNewModal(routename, routecountry);
      this.singleItem = {
        name: routename,
        location: {
          country: routecountry,
        },
      }
    }
  },
  methods: {
    fetchData: function() {
      const self = this;

      $.get( apiURL, function(data) {
        self.items = data
        self.isLoading = false;
        console.log(data);
      }, 'json').done(function() {
        for (let i = 0; i < self.items.length; i++) {
          const countrycode = self.items[i].location.countrycode;
          if (countrycode) {
            self.items[i].location.emoji = emojiFlags.countryCode(countrycode).emoji;
            self.items[i].distance = 0;
          }
        }
        if (self.$route.path !== '/') {
          const path = self.$route.path.slice(window.location.href.indexOf('?') + 2).split('/');
          const routename = path[1];
          const routecountry = path[0];
          self.getSingleItem(routename, routecountry);
        }
      });
    },
    openNewModal: function(name, country) {
      this.isModalActive = true;
      console.log(name, country);
      history.pushState({}, null, country + '/' + name);
    },
    openModal: function(event) {
      const self = this;
      const el = event.currentTarget;
      const id = el.getAttribute('data-id');
      const name = el.getAttribute('data-name');
      const country = el.getAttribute('data-country');

      this.isModalActive = true;
      self.getSingleItem(name, country);
      history.pushState({}, null, country + '/' + name);
    },
    closeModal: function(event) {
      this.isModalActive = false;
      this.singleItem = { location: {} }
      history.pushState({}, null, '/')
    },
    getSingleItem: function(name, country) {
      console.log('getSingleItem', name, country);
      const self = this;

      for (let i = 0; i < this.items.length; i++) {
        if ( this.items[i].name.toLowerCase().replace(/\s+/g, '-') === name ) {
          this.singleItem = this.items[i];
          this.singleItem.location = this.items[i].location;
        }
      }
    },
    sortBy: function(sortKey) {
      // this.reverse = (this.reverse === -1) ? 1 : -1;
      // this.sortKey = sortKey;
    },
    orderedByName: function () {
      return _.orderBy(this.items, 'distance');
    },
  },
  computed: {
    orderedItems: function () {
      // return _.orderBy(this.items, 'location.city');
    },
  },
  beforeMount: function() {
    // console.log('before ready')
  },
  mounted: function() {
    // console.log('ready')
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    margin: 0;
  }

  .grid {
    max-width: 1100px;
    max-width: calc(1100px + 1em);
    margin: 0 auto;
    overflow: hidden;
  }

  .item {
    position: relative;
    width: calc(31.33333% - 2px);
    float: left;
    margin: 0 1% 20px;
    min-height: 200px;
    vertical-align: middle;
    background-color: #f2f2f2;
    border: 1px solid #eee;
    border-radius: 3px;
  }

  .item-move {
    /* applied to the element when moving */
    transition: transform .5s cubic-bezier(.55,0,.1,1);
  }

  .item-link {
    position: relative;
    // background: rgba(255,255,255,0.3);
    height: 200px;
    display: block;
    text-decoration: none;
    z-index: 1;
  }

  .item-name {
    position: absolute;
    bottom: 0;
    left: 15px;
    padding: 7px 10px 3px;
    max-width: 210px;
    text-align: left;
    background: rgba(255,255,255, 0.8);
    color: #000;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .item-distance {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 3px 6px;
    background: rgba(255,255,255, 0.8);
    color: #000;
    font-size: 85%;
    border-top-left-radius: 8px;
  }

  .item-image {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
  }

  .item-city {
    position: absolute;
    right: 0;
    padding: 7px 40px 5px 10px;
    padding-right: 40px;
    padding-top: 7px;
    text-align: right;
    background: rgba(255,255,255, 0.8);
    color: #000;
    border-bottom-left-radius: 8px;
  }

  .item-country-emoji {
    position: absolute;
    right: 15px;
    top: 5px;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 120vw;
    background: #fff;
    width: 100%;
    min-height: 100vh;
    height: auto;
    height: 100%;
    transition: left .5s;
    z-index: 9999;
  }
  .modal .close {
    position: absolute;
    left: 10px;
    height: 40px;
    margin: 30px 0;
    line-height: 40px;
  }

  .modal.modalOpen {
    left: 0;
  }

  .modal-wrapper {
    overflow-y: scroll;
    height: 100%;
  }

  .modal-header {
    background-color: #eee;
    height: 100px;
    line-height: 100px;
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-content {
    text-align: left;
    overflow: hidden;
  }

  .modal-image {
    background-color: #f2f2f2;
    background-size: cover;
    background-position: center center;
    float: left;
    width: 40%;
    overflow: hidden;
    min-height: calc(100vh - 100px);
  }

  .modal-info {
    float: left;
    width: calc(60% - 40px);
    padding: 20px;
  }

  .modal-info img {
    max-width: 100%;
  }



  @media screen and (max-width: 600px) {
    .item {
      width: calc(100% - 2px);
      min-height: 250px;
    }
    .item-link {
      height: 250px;
    }
  }
</style>
