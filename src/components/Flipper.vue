<template>
  <div :class="'flip-container '+(this.flipped ? ' flipped' : '')">
    <div class="flipper">
      <div class="front">
        <slot name="front">
          Insert Front Slot
        </slot>
      </div>
      <div class="back">
        <slot name="back">
          Insert Back Slot
        </slot>
      </div>
    </div>
    <div class="flipper-controls">
      <button class="btn button" @click="toggle">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flipper',
    props:{
        frontButtonText: {
            type: String,
            default: 'back'
        },
        backButtonText: {
            type: String,
            default: 'front'
        }
    },
    data(){
        return {
            flipped: false
        }
    },
    computed: {
        buttonText(){
            return this.flipped ? this.backButtonText : this.frontButtonText;
        }
    },
    methods: {
        toggle(){
            this.flipped = !this.flipped;
        }
    }
  };
</script>

<style>
  .flip-container {
    perspective: 1000px;
  }

  .flip-container.flipped .flipper {
    transform: rotateY(180deg);
  }

  .flip-container, .front, .back {
    width: 100%;
    height: 100%;
  }

  .flipper {
    margin-top: 5%;
    height: 80%;
    width: 100%;
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .flipper-controls{
    height: 10%;
    width: 100%;
    margin-bottom: 5%;
  }

  .front, .back {
    backface-visibility: hidden;

    position: absolute;
    top: 0;
    left: 0;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .back {
    transform: rotateY(180deg);
  }
</style>
