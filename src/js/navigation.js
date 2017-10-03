/**
 * created by NasskalteJuni
 */
const jokes = require('./jokes.json');

const getPositionsOfThemeElements = elements => {
  const scrollY = {};
  elements.forEach(element => scrollY[element.getAttribute('data-title')] = element.getBoundingClientRect().top);
  return scrollY;
};

const getTitlesFromDocument = () => {
  const elements = document.querySelectorAll('[data-title]');
  return elements;
};

const getCurrentIndexByScrollValue = (positions, scrollY) => {
  const lessThanNext = (value, currentIndex, arr) => currentIndex+1 >= arr.length || value < arr[currentIndex+1];
  return Object.values(positions).findIndex((offset, index, array) => scrollY >= offset && lessThanNext(scrollY, index, array));
};

const navigation = {
  __current: 0,
  __changeFunc: null,
  onChange: function(func){
    if(typeof func === 'function') this.__changeFunc = func;
  },
  setCurrent: function(index, triggeredBy){
    let isChange = index !== this.__current;
    this.__current = index;
    if(this.__changeFunc) this.__changeFunc(this.getCurrentTitle(),this.getCurrentPosition(), isChange, triggeredBy);
  },
  init: function(){
    this.positions = getPositionsOfThemeElements(getTitlesFromDocument());
  },
  size: function(){
    return Object.keys(this.positions).length;
  },
  next: function (change=1) {
    this.setCurrent(Math.min(this.size()-1, this.__current+change),'goto');
  },
  previous: function (change=1) {
    this.setCurrent(Math.max(0, this.__current-change),'goto');
  },
  first: function(){
    this.setCurrent(0,'goto');
  },
  last: function () {
    this.setCurrent(this.size()-1,'goto');
  },
  to: function(title){
    if(!title) return;
    title = title.toLowerCase().trim();
    let index = Object.keys(this.positions).findIndex(entry => entry.toLowerCase().trim() === title);
    if(index >= 0) this.setCurrent(index, 'goto');
  },
  getCurrentPosition: function(){
    return Object.values(this.positions)[this.__current];
  },
  getCurrentTitle: function(){
    return Object.keys(this.positions)[this.__current];
  },
  getEntries: function(){
    return this.positions;
  },
  scrollValue(y){
    if(this.positions){
      let index = getCurrentIndexByScrollValue(this.positions, y);
      if(index >= 0){
        this.setCurrent(Math.max(index, 0), 'scroll');
      }
    }
  }
};




export default navigation;
