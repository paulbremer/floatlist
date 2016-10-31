<template>
  <div class="grid grid-placeholder">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script>
export default {
  name: 'listplaceholder',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-placeholder .item {
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

  .grid-placeholder .item::before {
    content: '';
    display: inline-block;
    width: 80%;
    height: 30px;
    background: #e8e8e8;
    border-radius: 3px;
    position: absolute;
    bottom: 8px;
    left: 8px;
  }
</style>
