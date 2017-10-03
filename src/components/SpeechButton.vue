<template>
  <div class="speech menu">
    <div :class="'speech-container container '+(sound?'active':'inactive')">
      <div class="speech" @click="activateSpeech">
        <span class="fa fa-microphone"></span>
      </div>
    </div>
    <br>
    <p class="menu-description">
      {{ description }}
      <span v-if="description.startsWith('Sage')">
        oder andere <span @click="showCommands" class="link">Befehle</span>
      </span>
    </p>
  </div>
</template>

<script>
  import commands from '../js/echo.js';
  import annyang from 'annyang/dist/annyang.min';
  import notify from '../js/notification.js';

  export default {
    name: 'SpeechButton',
    data(){
      return {
        isSpeaking: false,
        sound: false,
        annyang: window.annyang,
        description: 'Tippe dieses Icon an, um über Sprache zu navigieren',
        blockNewSound: null
      }
    },
    mounted(){
          this.annyang = require('annyang/dist/annyang.min.js');
          if(this.annyang === undefined || this.annyang === null) this.description = 'Nutze Chrome für Spracherkennung';
    },
    methods: {
        setError(){
            console.warn(arguments);
            this.description = 'Leider ging etwas schief bei der Spracherkennung'
        },
        activateSpeech(){
          if(this.annyang && !this.annyang.isListening()){
            notify('Cool!','Sprachsteuerung und Desktopnachrichten sind aktiviert');
            const restart = () => !this.annyang.isListening() ? this.annyang.start({autoRestart: true}) : false;
            this.description = 'Sage "weiter"';
            this.annyang.setLanguage("de-DE");
            this.annyang.addCommands(commands);
            this.annyang.addCallback('errorNetwork', this.setError);
            this.annyang.addCallback('errorPermissionBlocked', this.setError);
            this.annyang.addCallback('soundstart', () => {
                this.sound = true;
                this.blockNewSound = setTimeout(()=> {
                    clearTimeout(this.blockNewSound);
                    this.blockNewSound = false;
                    this.sound = false;
                },1000);
            });
            this.annyang.addCallback('error', restart);
            restart();
          }else{
            this.description = 'Nutze Chrome für Spracherkennung';
          }
        },
        showCommands(){
            this.$emit('showCommands');
        }
    }
  }
</script>

<style>
  .speech-container{
    transition: .5s ease all;
  }

  .speech-container.active{
    box-shadow: 0 0 2em yellow;
    background-color: yellow !important;
  }

  .speech-container.inactive{
    box-shadow: initial;
    background-color: initial;
  }

  .link{
    text-decoration: underline;
    cursor: pointer;
  }
</style>
