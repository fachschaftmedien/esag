/**
 * created by NasskalteJuni
 */
export default function(text, lang='de-DE'){
  if(window.speechSynthesis){
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }
}
