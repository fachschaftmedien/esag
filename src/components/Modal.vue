<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Navigation
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              (Modal Text)
            </slot>
            <slot name="footer">
              <button class="modal-default-button" @click="close">
                <slot name="close"> Schließen </slot>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{
    name: 'Modal',
    props: {
        showModal: Boolean,
        default: false
    },
    data(){
        return {

        }
    },
    methods: {
      close(){
        this.$emit('closeModal');
      },
      open(){
        this.$emit('openModal');
      }
    }
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px 30px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(20, 20, 40, 0.2);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
