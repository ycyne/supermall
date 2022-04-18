<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar{
    position: fixed;
    display: flex;
    bottom: 0px;
    right: 0px;
    left: 0px;
    background-color: #f6f6f6;
    box-shadow: 0px -2px 1px rgba(100,100,100,0.1);
  }
</style>
