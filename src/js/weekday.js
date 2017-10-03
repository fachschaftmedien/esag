/**
 * not at all reusable but I want to get this page up and running
 */
export default {

  init(){
    this.weekdays = ['Mittwoch','Donnerstag','Freitag','Samstag'];
    this.currentIndex = this.getIndexForDay();
    this.off = 3;
  },

  getIndexForDay(date=new Date()){
    let i = date.getDay();
    return this.startWednesday(i);
  },

  startWednesday(i){
    return i <= this.off ? this.off : i;
  },

  nextDay(){
    this.currentIndex = this.startWednesday((this.currentIndex + 1)%7);
    return this.nameForIndex(this.currentIndex);
  },

  prevDay(){
    this.currentIndex = this.currentIndex === this.off ? (this.off +this.weekdays.length-1) : (this.currentIndex - 1);
    return this.nameForIndex(this.currentIndex);
  },

  currentDay(){
    return this.nameForIndex(this.currentIndex);
  },

  nameForIndex(){
    return this.weekdays[this.currentIndex - this.off];
  }


}
