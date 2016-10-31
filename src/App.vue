<template>
  <div id="app">
    <div class="wrapper">
      <h1><a href="/">FloatList</a></h1>
    </div>

    <nav>
      <router-link to="/" exact>FloatList</router-link>
      <router-link to="/foo">About FloatList</router-link>
      <router-link to="/bar">Contact</router-link>
    </nav>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import jquery from 'jquery';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueAnimatedList from 'vue-animated-list';
import Hello from './components/Hello';
import List from './components/List';
import ListPlaceholder from './components/ListPlaceholder';

import './assets/css/main.css';

Vue.use(VueRouter, VueResource, VueAnimatedList);

export default {
  name: 'app',
  components: {
    Hello,
    List,
    ListPlaceholder,
  },
  beforeMount: function() {
    const self = this;
    console.log('initialmount', this.$route.path)
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .wrapper {
    max-width: 1100px;
    max-width: calc(1100px + 1em);
    margin: 0 auto;
  }

  .wrapper h1 {
    margin: 0 0 0 11.156px;
    text-align: left;
  }

  .wrapper h1 a {
    display: inline-block;
    text-decoration: none;
    line-height: 26px;
  }

  .wrapper h1 a:after {
    content: '';
    height: 3px;
    width: 0px;
    display: block;
    margin: auto;
    background: transparent;
    transition: width 0.5s ease, background-color 0.5s ease, font-weight 0.5s ease;
  }

  .wrapper h1 a:hover:after {
    position: relative;
    width: 98.2%;
    left: 0.8%;
    background: blue;
  }

  nav {
    background-color: #fff;
    margin-bottom: 10px;
  }

  nav a {
    position: relative;
    display: inline-block;
    color: #2d2d2d;
    padding: 10px 0;
    margin: 0 10px;
    line-height: 20px;
    font-size: 0.8em;
    text-transform: uppercase;
    text-decoration: none;
  }

  nav a:after {
    content: '';
    height: 1px;
    width: 0px;
    display: block;
    margin: auto;
    background: transparent;
    transition: width 0.5s ease, background-color 0.5s ease, font-weight 0.5s ease;
  }

  nav a:hover {
  }

  nav a:hover:after {
    width: 100%;
    background: #2d2d2d;
  }

  .router-link-active {
  }
  .router-link-active:after {
    width: 100%;
    background: #2d2d2d;
  }
</style>
