<template>
  <div class="scroll menu">
    <div :class="'scroll-down-container container '+(isScrolling?'active':'inactive')">
      <div class="scroll-down">
        <span class="fa fa-arrow-down"></span>
      </div>
    </div>
    <br>
    <p class="menu-description">Für nützliche Informationen kannst du scrollen</p>
  </div>
</template>

<script>
  export default {
    name: 'ScrollButton',
    data(){
      return {
        isScrolling: false,
        blockNewScroll: null
      };
    },
    created(){
      window.addEventListener('scroll', () => {
          this.isScrolling = true;
          this.blockNewScroll = setTimeout(() => {
            clearTimeout(this.blockNewScroll);
            this.blockNewScroll = null;
            this.isScrolling = false;
          }, 1000);
      });
    }
  }
</script>

<style>
.scroll-down-container{
  transition: .5s ease all;
}

.scroll-down-container.active{
  box-shadow: 0 0 2em yellow;
  background-color: yellow !important;
}

.scroll-down-container.inactive{
  box-shadow: initial;
  background-color: initial;
}
</style>
