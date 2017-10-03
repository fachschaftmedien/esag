<template>
  <div :class="'notifications '+this.shownClass">
    <div class="notification-text">
      <slot name="notification-text">
        Nutze Push Notifications?
      </slot>
    </div>
    <div class="notification-controls">
      <button class="button btn allow" @click="allow">
        <slot name="notification-allow">
          Nutzen
        </slot>
      </button>
      <button class="button btn deny" @click="deny">
        <slot name="notification-deny">
          Nein Danke
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Notifications',
    props: {
      isShown: {
        type: Boolean,
        default: false
      }
    },
    data(){
        return {
            isAllowed: false,
        }
    },
    computed: {
      shownClass(){
        return (this.isShown && !this.isAllowed) ? 'visible' : 'hidden';
      }
    },
    methods: {
      allow(){
        this.$emit('allow');
        this.$emit('requestNotifications', true);
        this.isAllowed = true;
      },
      deny(){
        this.$emit('requestNotifications', false);
        this.$emit('deny');
        this.isAllowed = false;
      }
    }
  }
</script>

<style lang="scss">
  $height: 1.5em;

  .notifications{
    background-color: white;
    position: fixed;
    left: 0;
    width: 100%;
    min-width: 100vw;
    padding: 0;
    margin: 0;
    z-index: 100;
    height: $height;
    display: flex;
    flex-direction: row;

    div{
      height: 100%;
      font-size: 0.9em;
      display: flex;
      align-items: center;
    }

    .notification-text{
      width: 74%;
      margin-left: 1%;
      justify-content: flex-start;
    }

    .notification-controls{
      min-width: 24%;
      margin-right: 1%;
      justify-content: space-around;

      button{
        width:  45%;
        height: 90%;
      }
    }

    transition: top 1.5s ease, opacity 1s ease;
  }

  .notifications.hidden{
    top: -$height;
    opacity: 0;
  }

  .notifications.visible{
    top: 0;
    opacity: 1;
  }

  @media (max-width: 1300px){
    .notifications{
      font-size: 0.85em;
    }

    .notifications>.notification-text{
      width: 64%;
    }

    .notifications>.notification-controls{
      min-width: 34%;
    }
  }

  @media (max-width: 900px){
    .notifications>.notification-text{
      width: 49%;
    }

    .notifications>.notification-controls{
      width: 49%;
    }
  }

  @media (max-width: 600px){
    $height: 2em;

    .notifications{
      font-size: 0.8em;
      height: $height;
    }
  }

</style>
