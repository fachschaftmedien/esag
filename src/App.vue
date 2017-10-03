<template>
  <div id="app">
    <modal v-if="isShowingMenu" :showModal="isShowingMenu" @openModal="showMenu(true)" @closeModal="showMenu(false)">
      <div slot="body">
        <ul class="nav nav-list">
          <li v-for="(offsetTop, title) in navigation.getEntries()" role="menuitem">
            <p class="nav-link" role="link" @click="scrollTo(offsetTop)">{{title.toUpperCase()}}</p>
          </li>
        </ul>
      </div>
      <span slot="close">
        zurück&nbsp;&nbsp;<span class="fa fa-close"></span>
      </span>
    </modal>
    <modal v-if="isShowingCommands" :showCommands="isShowingCommands" @openModal="showCommands(true)" @closeModal="showCommands(false)">
      <div slot="header"> Befehle </div>
      <div slot="body">
        <command-list></command-list>
      </div>
    </modal>
    <header class="page-header" data-title="start">
      <div class="page-headline headline-container">
        <div class="title-container">
          <h1 class="page-title">
            {{headline}}
          </h1>
        </div>
        <div class="subheadline-container">
          <p class="page-subheadline">
            {{subheadline}}
          </p>
        </div>
      </div>
    </header>
    <main>
      <section class="intro">
        <div class="menues content" data-title="menüs">
          <scroll-button></scroll-button>
          <hamburger-button @openModal="showMenu(true)" :showModal="isShowingMenu"></hamburger-button>
          <speech-button @showMenu="showMenu(true)" @showCommands="showCommands(true)"></speech-button>
        </div>
        <div class="background"></div>
      </section>
      <section class="esag">
        <div class="content">
          <h2 data-title="Was ist die Erstiwoche" class="content-headline"> Was ist die Ersti-Woche? </h2>
          <flipper :frontButtonText="'Kurzfassung bitte'" :backButtonText="'Text anzeigen'">
            <div class="front-text" slot="front">
              Jedes Jahr veranstalten die Fachschaften für neue Studenten eine Einführungswoche, damit euer Start an der HS Düsseldorf so angenehm wie möglich wird.
              Die Ersti-Woche findet vom <strong class="important"> 04. bis zum 09. Oktober 2017 </strong> statt.
              In diesem Zeitraum gibt es für neue Studenten eine kurze Einführung und nützliche Informationen fürs Studium.
              Außerdem geht es natürlich auch darum, dass Ihr schon mal erste Kontakte knüpft und die Leute kennen lernt,
              mit denen Ihr die nächsten Jahre über viel Zeit verbringen werdet!
              Deshalb stehen auch ein gemeinsames Frühstück, Grillen, sowie Party im Allgemeinen auf dem Programm. <br>
              Falls ihr etwas verpasst, haben wir es auch noch mal im <a class="source" href="static/studimanual.pdf">Studi-Manual</a> zum nachlesen.
            </div>
            <div class="back-text" slot="back">
              Also nocheinmal in kurz: <br>
              <br>
              Ihr wart hier noch nie? Wir führen euch einmal komplett über den Campus! <br>
              Ihr wisst nicht, was euch erwartet? Wir und die Professoren geben einen kurzen Überblick über das Studium <br>
              Ihr kennt niemanden? Wir veranstalten Spiele und feiern <br>
            </div>
          </flipper>
        </div>
        <div class="background"></div>
      </section>
      <section class="zeitplan">
        <div class="content">
          <h2 data-title="Zeitplan" class="content-headline">Zeitplan</h2>
          <p class="esag-days"> Vom 04. bis zum 09. Oktober 2017 am Campus Derendorf, Münsterstraße 156</p>
          <br>
          <calendar :schedule="calendar"></calendar>
          <p class="calendar-downloads">
            <a href="https://calendar.google.com/calendar/ical/he62a688mhrp7clfvqpkp2nio4%40group.calendar.google.com/public/basic.ics">speichern als <i>.ics</i> <span class="fa fa-download"></span></a>
            <a href="https://calendar.google.com/calendar/embed?src=he62a688mhrp7clfvqpkp2nio4%40group.calendar.google.com&ctz=Europe/Berlin">zum Google-Kalender <span class="fa fa-calendar"></span></a>
            <a href="static/img/noscript/plan.png">als PNG-Bild <span class="fa fa-image"></span></a>
          </p>
        </div>
        <div class="background"></div>
      </section>
      <section class="social">
        <div class="content">
          <h2 data-title="Social Media" class="content-headline">Social Media</h2>
          <article>
            <p class="social-info-text">
              Wir als Fachschaft informieren euch über Veranstaltungen, Projekte, das Hochschulleben und Parties.
              Wenn ihr Infos über die Ersti-Woche oder von uns organisierte Feiern haben wollt, dann folgt uns doch auf Facebook!
              Wir haben zudem eine Whats-App-Gruppe für euch als neuen Jahrgang gegründet, so dass ihr euch selbst absprechen könnt
            </p>
          </article>
          <div class="social-icons">
            <div class="facebook" target="_blank">
              <a href="https://www.facebook.com/fachschaftmedien.de">
                <span class="fa fa-facebook"></span>
                <div>auf Facebook folgen</div>
              </a>
            </div>
            <div class="whatsapp">
              <a href="https://chat.whatsapp.com/invite/AOiEg6uIcWY8EU1tNOK6rI" target="_blank">
                <span class="fa fa-whatsapp"></span>
                <div>Whatsapp-Gruppe beitreten</div>
              </a>
            </div>
            <div class="twitter" target="_blank">
              <a href="https://twitter.com/diefachschaft">
                <span class="fa fa-twitter"></span>
                <div>Twitter abonnieren</div>
              </a>
            </div>
          </div>
        </div>
        <div class="background"></div>
      </section>
      <section class="gallery">
        <div class="esag-images content">
          <h2 data-title="Bilder" class="content-headline">Bilder von der letzten Ersti-Woche</h2>
          <gallery :images="images"></gallery>
        </div>
        <div class="background"></div>
      </section>
      <section class="impressum">
        <div class="content">
          <h2 data-title="Impressum" class="content-headline">Impressum</h2>
          <address>
            Fachschaftsrat Medien <br>
            Hochschule Düsseldorf <br>
            Münsterstraße 156 <br>
            Gebäude 4 (2. Etage), Raum 04.2.029 <br>
            40476 Düsseldorf <br>
            <br>
            Raum: 04.2.029 <br>
            Tel.: +49 (211) 4351-2512 <br>
            Mail: info@fachschaftmedien.de <br>
          </address>
        </div>
        <div class="background"></div>
      </section>
    </main>
  </div>
</template>

<script>
import Modal from '@/components/Modal';
import ScrollButton from '@/components/ScrollButton';
import SpeechButton from '@/components/SpeechButton';
import HamburgerButton from '@/components/HamburgerButton';
import Calendar from '@/components/Calendar';
import Gallery from '@/components/Gallery';
import Flipper from '@/components/Flipper';
import CommandList from '@/components/CommandList';
import navigation from './js/navigation';
import schedule from './js/calendar.json';
import images from './js/images.json';
import notify from './js/notification';


navigation.onChange(function(title, y, isChanged, changedBy){
    if(isChanged && changedBy !== 'scroll'){
        scroll(0, y);
    }
});

export default {
  name: 'app',
  components: {
    Modal,
    ScrollButton,
    SpeechButton,
    HamburgerButton,
    Calendar,
    Gallery,
    Flipper,
    CommandList
  },
  data(){
      return {
        headline: 'Ersti Woche 2017',
        subheadline: 'MI, MT & TUB, Fachbereich Medien, HSD',
        isShowingMenu: false,
        isShowingCommands: false,
        navigation: navigation,
        menuItems: {},
        calendar: schedule,
        isShowingNotificationRequest: false,
        images: images.map(image => {
            return {
              "src": "./static/img/gallery/images/"+image,
              "thumb": "./static/img/gallery/thumbs/"+image,
              "caption": "Bild "+image.replace('.jpg')
            }
        })
      }
  },
  mounted(){
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('load', this.handleReady);
      window.addEventListener('beforeunload',this.handleReset);
      document.body.addEventListener('keydown', this.handleKey);
  },
  methods: {
      showMenu(bool){
          this.isShowingMenu = bool;
      },
      showCommands(bool){
          this.isShowingCommands = bool;
      },
      scrollTo(y){
          window.scroll(0,y);
      },
      handleScroll(){
        this.navigation.scrollValue(this.getScrollTop()+5); //add a few pixels to be sure not to be in the previous menu
      },
      handleKey(e){
        let key = e.key;
        if(key === 'ArrowRight') this.navigation.next();
        if(key === 'ArrowLeft') this.navigation.previous();
      },
      handleReady(){
        this.navigation.init();
        this.navigation.scrollValue(document.body.scrollTop);
        this.menuItems = this.navigation.getEntries();
      },
      handleReset(){
          window.scroll(0,0);
      },
      getScrollTop(){
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      }
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
