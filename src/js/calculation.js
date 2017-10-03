/**
 * created by NasskalteJuni
 */
import math from 'mathjs';

const keywords = [
  {
    from: 'ableitung von',
    to: ''
  },{
    from: 'wurzel aus',
    to: 'sqrt',
  },{
    from: 'hoch',
    to: '^'
  },{
    from: 'exponenziert mit',
    to: '^'
  },{
    from: 'ist',
    to: '='
  },{
    from: 'gleich',
    to: '='
  },{
    from: 'grad',
    to: 'deg'
  },{
    from: 'minus',
    to: '-'
  },{
    from: 'subtrahiert von',
    to: '-'
  },{
    from: 'plus',
    to: '+'
  },{
    from: 'addiert zu',
    to: '+'
  },{
    from: 'geteilt durch',
    to: '/'
  },{
    from: 'dividiert durch',
    to: '/'
  },{
    from: 'durch',
    to: '/'
  },{
    from: 'sternchen',
    to: '*'
  },{
    from: 'produkt',
    to: '*'
  },{
    from: 'sinus',
    to: 'sin',
  },{
    from: 'cosinus',
    to: 'cos',
  },{
    from: 'tangens',
    to: 'tan',
  },{
    from: 'klammer auf',
    to: '('
  },{
    from: 'klammer zu',
    to: ')'
  },{
    from: 'öffnende klammer',
    to: '('
  },{
    from: 'schließende klammer',
    to: ')'
  },{
    from: 'modulo',
    to: '%'
  },{
    from: 'ausrufezeichen',
    to: '!'
  },{
    from: 'fakultät',
    to: '!'
  },{
    from: 'nach x',
    to: ''
  },{
    from: 'quadrat',
    to: '^2'
  },{
    from: 'kubik',
    to: '^3'
  },{
    from: 'undefined',
    to: ''
  }
];

function translateKeywords(term){
  keywords.forEach(entry => {
    term = term.replace(entry.from, entry.to)
  });
  return term;
}

export default function calculate(term){
  if(!term) return;
  term = term.toLowerCase();
  try{
    if(term.startsWith('ableitung von ')){
      let translated = translateKeywords(term);
      return "Die Ableitung von "+translated+" ist "+math.derivative(translated,'x');
    }else{
      let translated = translateKeywords(term);
      return "Das Ergebnis von "+term+" ist "+math.eval(translated);
    }
  }catch(err){
    console.log(err);
    if(err.message.indexOf('Undefined symbol x') >= 0) return "Für Mal sage Produkt";
    return 'Das konnte ich leider nicht berechnen.'
  }
}


