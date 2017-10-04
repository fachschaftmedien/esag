/**
 * created by NasskalteJuni
 */
import speak from './speech.js';
import navigation from './navigation.js';
import jokes from './jokes.json';
import calendar from './calendar.json';
import calculate from './calculation.js';
import notify from './notification.js';


function randomInt(min, max){
  return (Math.random() * ((max ? max : min) - (max ? min : 0) + 1) + (max ? min : 0)) | 0;
}

function partialOrCompleteContained(words, text){
  return words.indexOf(text) >= 0 || text.indexOf(words) >= 0;
}

function stripStartwords(string, words){
  words.forEach(function(word){
    if(string.startsWith(word+' ')){
      string = string.substring(word.length+1,string.length);
      return string;
    }
  });
  return string;
}

function tellWhen(event){
  event = event.toLowerCase().trim();
  event = stripStartwords(event,['der','die','das','eine','ein']);
  event = event.replace('statt','');
  let found = [];
  Object.keys(calendar).forEach(day => {
    let arr = calendar[day];
    found = found.concat(arr.filter(el => {
      if(partialOrCompleteContained(el.title.toLowerCase(), event)){
        el.day = day;
        return true;
      }
      return false;
    }));
  });
  let result = "";
  if(found.length > 0){
    result = found.reduce((sentence, el, i) => {
      let start = i > 0 ? 'und' : event + 'ist';
      sentence += start + ' am ' + el.day + ' von ' + el.start + ' Uhr bis ' + el.end + ' Uhr. Ort: '+el.location+' ';
      return sentence;
    },'');
  }else{
    result = "Die Veranstaltung "+event+" wurde leider nicht gefunden";
  }
  speak(result);
}

function tellWhere(event){
  event = event.toLowerCase().trim();
  event = stripStartwords(event,['der','die','das','ein','eine']);
  event = event.replace('statt','');
  let found = [];
  Object.keys(calendar).forEach(day => {
    let arr = calendar[day];
    found = found.concat(arr.filter(el => partialOrCompleteContained(el.title.toLowerCase(), event)));
  });
  if(found.length > 0){
    speak(found[0].location);
  }else{
    speak('Die Veranstaltung '+event+' ist mir leider nicht bekannt');
  }
}

function setTimer(zeit){
  let time = parseInt(zeit.replace("eine","1"));
  speak('starte Timer für Zeit: '+zeit+' Minute'+(time === 1 ? '' : 'n'));
  notify('Timer','starte Timer für Zeit: '+zeit+' Minute'+(time === 1 ? '' : 'n'));
  let timer = window.setInterval(() => {
    let text = zeit+' Minute' + (time === 1 ? ' ist' : 'n sind') + ' vergangen';
    speak(text);
    notify('Timer', text);
    window.clearInterval(timer);
  },1000*60*time);
}

function playRockPaperScissors(){
  let options = ['Stein','Schere','Papier'];
  let choice = options[randomInt(2)];
  speak("Stein! Schere! Papier!");
  speak("Ich habe "+choice);
}

export default {
  'weiter': function(){
    navigation.next();
  },
  'zurück': function(){
    navigation.previous();
  },
  'gehe zu (Thema) :thema': function(theme){
    navigation.to(theme);
  },
  'gehe zum Start': function(){
    navigation.first();
  },
  'gehe zum Anfang': function(){
    navigation.first();
  },
  'gehe nach oben': function() {
    navigation.first();
  },
  'gehe zum Ende': function(){
    navigation.last();
  },
  'gehe nach unten': function(){
    navigation.last();
  },
  'wie viel Uhr ist es': function(){
    let time = (new Date()).toTimeString().substring(0,5);
    speak('Es ist '+time+' Uhr');
  },
  'erzähl (mir) einen Witz': function(){
    let currentJoke = jokes[randomInt(jokes.length-1)];
    speak(currentJoke);
  },
  'suche nach *suche': function(suche){
    let url = 'https://www.google.de/search?q='+suche.replace(/\s/g,'+')+'&sourceid=chrome&ie=UTF-8';
    window.open(url,'_blank');
  },
  'sage *worte': function(worte){
    speak(worte);
  },
  'buchstabiere :wort': function(wort){
    let letters = wort.split("").join(". ");
    speak(letters);
    notify(letters.toUpperCase());
  },
  'berechne *term': function(term){
    term = stripStartwords(term, ['die','das'])
    let result = calculate(term);
    speak(result);
    notify(result);
  },
  'wann ist *event (Vorstellung)': function(event){
    tellWhen(event);
  },
  'wann finded *event (Vorstellung) statt': function(event){
    tellWhen(event);
  },
  'was ist der Sinn des Lebens': function(){
    speak("42");
  },
  'überrasche mich': function(){
    window.location.href = "https://www.youtube.com/watch?v=DLzxrzFCyOs";
  },
  'wie alt bist du': function(){
    speak("Du fragst grade eine Webseite, wie alt sie ist... Ich habe kein Alter");
  },
  'wie heißt du': function () {
    speak("ESAG Punkt Fachschaft Medien Punkt DE");
  },
  'übersetze *Satz (in) (auf) :sprache': function(satz, sprache){
    let url = "https://translate.google.com/?hl=de#auto/"+sprache.substring(0,2).toLowerCase()+"/"+encodeURIComponent(satz);
    window.open(url,"_blank");
  },
  'zeig mir Katzen': function(){
    window.open("https://www.youtube.com/c/KittenAcademy/live",'_blank');
  },
  'Kopf oder Zahl': function(){
    let options = ['Kopf','Zahl'];
    let result = options[randomInt(1)];
    speak(result);
  },
  'Stein Schere Papier': function () {
    playRockPaperScissors();
  },
  'Schnick Schnack Schnuck': function(){
    playRockPaperScissors();
  },
  'nenne eine Zahl zwischen *von und *bis': function(von, bis){
    speak(""+randomInt(von, bis));
  },
  'setze (einen) Timer für :zeit Minute(n)': function (zeit) {
    setTimer(zeit);
  },
  'setze (einen) Timer auf :zeit Minute(n)': function(zeit){
    setTimer(zeit);
  },
  'starte (einen) Timer für :zeit Minute(n)': function(zeit){
    setTimer(zeit);
  },
  'stelle (einen) Timer auf :zeit Minute(n)': function(zeit){
    setTimer(zeit)
  },
  'rezepte für *gericht': function(gericht){
    let url = "http://www.chefkoch.de/rs/s0/"+window.encodeURIComponent(gericht)+"/Rezepte.html";
    window.open(url,'_blank')
  },
  'was ist die Definition von :begriff': function(begriff){
    let url = "https://www.google.de/search?q=definition+"+window.encodeURIComponent(begriff);
    window.open(url,'_blank');
  },
  'was bedeutet Esag': function(){
    speak('Esag steht für Erst Semester Arbeits Gemeinschaft');
  },
  'was ist die Fachschaft': function(){
    speak('Die Fachschaft ist die Gesammtheit aller Studierenden eines Fachbereiches, also auch du. Sie wird vertreten durch den Fachschaftsrat, der aus Neun gewählten Studenten besteht');
  },
  'wie viel kostet (das) (ein) Bier': function(){
    speak('Das Bier kostet einen Euro')
  },
  'was kostet (das) (ein) Bier': function(){
    speak('Das Bier kostet einen Euro');
  },
  'was kostet (der) Alkohol': function(){
    speak('Generell kostet Alkohol einen Euro');
  },
  'was gibt es zu(m) Grillen': function(){
    speak('Würstchen, vielleicht auch Steaks, Mais und Kartoffelsalat');
  },
  'was kostet (die) (eine) Bratwurst': function(){
    speak('Würstchen kosten 2 Euro');
  },
  'wie viel kostet (die) (eine) Bratwurst': function(){
    speak('Die Bratwurst kostet 2 Euro');
  },
  'was kostet (das) (ein) Würstchen': function(){
    speak('Ein Würstchen kostet 2 Euro');
  },
  'wie viel kostet (das) (ein) Würstchen': function(){
    speak('Zwei Euro');
  },
  'was ist die Ersti-Woche': function(){
    speak('In der Ersti-Woche wird Studienanfängern erklärt, wie das Studium funktioniert. Zudem wird gefeiert');
  },
  'was hilft gegen (einen) Kater': function(){
    speak('Viel trinken vor dem Schlafen gehen und Aspirin-Tabletten');
  },
  'was ist der Fachschaftsrat': function(){
    speak('Der Fachschaftsrat sind neun gewählte Studenten, die informieren, Veranstaltungen organisieren und die Studenten eines Fachbereiches repräsentieren');
  },
  'wo finde ich Informationen': function(){
    speak('Falls du Informationen zum Studium suchst, solltest du im Ersti-Manual nachlesen. Das Modulhandbuch und die Prüfungsordnung sind ebenfalls interessant. Aber die Fachschaft gibt gerne Antworten auf Fragen');
  },
  'wo findet *event statt': function(event){
    tellWhere(event);
  },
  'wo ist *event (Vorstellung)': function(event){
    tellWhere(event);
  },
  'in welchem Raum findet *event statt': function(event){
    tellWhere(event);
  },
  'was ist die Adresse der HSD': function(){
    speak('Münsterstraße 156, 40476 Düsseldorf');
  },
  'wie geht es dir': function(){
    let options = ['Wubbalubbadubdub!','Meine Prozessoren glühen vor Freude!','Ich bin in einer Handyfertigungsfabrik gefangen, rettet mich!','Glücklichkeitslevel: Hoch'];
    speak(options[randomInt(options.length - 1)]);
  },
  'was ist dein Lieblingsbuch': function(){
    speak('der HTML5 Standard');
  },
  'lade die Seite neu': function(){
    window.location.reload();
  },
  'route nach *ort': function(ort){
    let url = "https://www.google.de/maps/place/"+window.encodeURIComponent(ort);
    window.open(url, '_blank');
  },
  'erzähl mir eine Geschichte': function(){
    let options = ['Vor langer langer Zeit habe ich grade besseres als das zu tun','2001 Odyssee im Weltraum kurzfassung: Es tut mir Leid Dave, das kann ich nicht zulassen','Und Google sprach: Es werde A.I! Und es wurde A.I.'];
    speak(options[randomInt(options.length-1)])
  },
  'was machst du (so) (grade)': function(){
    let options = ['arbeitsspeicher belegen','Daten berechnen','Prozesse starten','Bits verändern','Viren herunterladen','wichtige Dateien löschen'];
    let r1 = randomInt(options.length-1);
    let r2 = randomInt(options.length-1);
    speak(options[r1] + ' und '+(r1 === r2 ? 'noch mehr ' : '')+options[r2]);
  },
  'magische Miesmuschel *text': function(text){
    console.log(text);
    let options = ['Ja','Definitiv','positiv','Auf jeden Fall','Nein','Niemals','negativ','vielleicht','es ist ungewiss','eventuell'];
    speak(options[randomInt(options.length-1)]);
  },
  'sing mir ein Lied': function(){
    let options = ['An der Nordseeküste, am plattdeutschen Strand, sind die Fische im Wasser und selten am Land','Freude schöner Götterfunkten, Tochter aus Elysium, stöndig sind wir hier betrunken und wir fallen dauernd um',"Morgen, Kinder, wird's nichts geben!Nur wer hat, kriegt noch geschenkt.Mutter schenkte euch das Leben. Das genügt, wenn man's bedenkt. Einmal kommt auch Eure Zeit. Morgen ist's noch nicht so weit."]
    speak(options[randomInt(options.length-1)]);
  },
  'ich habe Geburtstag': function(){
    speak('Herzlichen Glückwunsch und alles Gute!');
  },
  'Tramp': function(){
    let options = ['I will build a wall and make the first semesters pay for it','Despite the Ersti-week cofiefie','Look at FB 3, so sad',"I'll handle little rocket man"];
    speak(options[randomInt(0, options.length-1)],'en-US')
  },
  'JBS': function(){
    speak('Dschäy Bie Ess ist eine Burnout gefährdete, geknechtete Seele, die an die Hochschule gebunden ist. Er unterrichtet die Hälfte aller Fächer. Djey Bie Ess ist Liebe, Djey Bie Ess ist Leben.');
  },
  'Alexa *text': function(){
    speak('Wer ist Alexa?');
  },
  'Allahu Akbar': function(){
    window.open('https://www.youtube.com/watch?v=W8FhA_uxHUg','_blank');
  },
  'hallo (Seite)': function(){
    speak('Hi!');
  },
  'hi': function(){
    speak('Hallo');
  }
};
