<template>
  <div class="hamburger menu">
    <div :class="'hamburger-container container '+(showModal?'active':'inactive')">
      <div class="hamburger" @click="showMenuOverlay">
        <span class="fa fa-bars"></span>
      </div>
    </div>
    <br>
    <p class="menu-description">Du kannst auch dieses klassische Menü nutzen</p>
  </div>
</template>

<script>

  export default {
    name: 'HamburgerButton',
    props: {
      showModal: Boolean,
      default: false
    },
    data(){
      return {

      }
    },
    methods: {
        showMenuOverlay(){
          this.$emit('openModal');
        }
    }
  }
</script>

<style>
  .hamburger-container{
    transition: ease all .5s;
  }

  .hamburger-container.active{
    box-shadow: 0 0 2em yellow;
    background-color: yellow !important;
  }

  .hamburger-container.inactive{
    box-shadow: initial;
    background-color: initial;
  }
</style>
