<template>
  <header-component />
  <router-view />
</template>

<script setup>
import HeaderComponent from '@/components/header-component.vue';
</script>

<style lang="scss">
  @import "../public/normalize.css";
  body {
    background: #212633;
  }
</style>

