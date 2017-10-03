<template>
  <div class="calendar-container">
    <div class="calendar">
      <div class="weekdays table-head">
        <p class="table-head-item"> ZEIT </p>
        <p v-for="(data, weekday) in schedule" :class="'table-head-item weekday-label weekday-label-'+weekday"> {{weekday.toUpperCase()}} </p>
      </div>
      <div class="schedule table-body">
        <div class="hours table-column">
          <div v-for="(hour, index) in hours" :class="'hour-label start-'+hour+' table-body-item hour-index-'+index" v-if="hour <= 24"> {{toHourFormat(hour)}} </div>
        </div>
        <div v-for="(data, weekday) in schedule" :class="'weekday table-column weekday-'+weekday">
          <div v-for="slot in data" :class="'table-body-item start-'+getStartHours(slot)+' duration-'+getDurationInFullHours(slot)+(isHalfSlot(slot, weekday) ? ' half-sized' : '')+(isSecondHalfSlot(slot, weekday)? ' second-half' :'')" @click="setActive($event, slot)">
            {{slot.title}}
          </div>
        </div>
      </div>
      <div class="table-body-background">
          <div v-for="(hour, index) in hours" :class="'hour-row start-'+hour+' duration-1 hour-index-'+index" v-if="hour <= 24"></div>
      </div>
      <div class="calendar-day-controls" v-touch:swipe.right="prevDay" v-touch:swipe.left="nextDay">
        <div class="calendar-day-prev" v-touch:tap="prevDay">
          <span class="fa fa-chevron-left"></span>
        </div>
        <div class="calendar-day-next" v-touch:tap="nextDay">
          <span class="fa fa-chevron-right"></span>
        </div>
      </div>
    </div>
    <div class="calendar-detail">
      <div v-if="current">
        <h2 class="detail-headline">
          {{current.title}}
        </h2>
        <table class="description">
          <tbody>
            <tr>
              <td> Beginn </td><td> {{current.start}} Uhr </td>
            </tr>
            <tr>
              <td> Ende </td><td> {{(current.end.startsWith(25) ? 'Ende offen' : (current.end+' Uhr'))}} </td>
            </tr>
            <tr>
              <td> Ort </td><td> {{current.location}} </td>
            </tr>
            <tr>
              <td colspan="2"> Beschreibung <br><br> {{current.description}} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="calender-no-detail" v-else>
        <span class="fa fa-info-circle calendar-detail-info"></span>
        <p> klicke auf einen Termin, um genaueres zu erfahren </p>
      </div>
    </div>
  </div>
</template>

<script>
  import weekday from '../js/weekday.js';
  weekday.init();

  export default {
    name: 'Calendar',
    props: {
      schedule: Object,
    },
    data(){
      return {
        current: null,
      };
    },
    computed: {
      hours(){
        const hourList = [];
        const start = this.splitTime(this.earliestTime).hour - 1;
        const end = this.splitTime(this.latestTime).hour;
        for(let i = start; i <= end; i++){
            hourList.push(i);
        }
        return hourList;
      },
      weekdays(){
        return Object.keys(this.schedule);
      },
      allApointments(){
        return Object.values(this.schedule).reduce((all, appointments) => all.concat(appointments), []);
      },
      earliestTime(){
        if (this.allApointments.length === 0) return null;
        return this.allApointments.reduce((earliest, appointment) => {
          let start = appointment.start;
          if (this.compareTimes(start, earliest) < 0) earliest = start;
          return earliest;
        }, this.allApointments[0].start);
      },
      latestTime(){
        if (this.allApointments.length === 0) return null;
        return this.allApointments.reduce((latest, appointment) => {
          let end = appointment.end;
          if (this.compareTimes(end, latest) > 0) latest = end;
          return latest;
        }, this.allApointments[0].end);
      }
    },
    methods: {
      setActive(event, slot){
        this.current = slot;
        event.target.parentNode.parentNode.childNodes.forEach(column => {
            column.childNodes.forEach(item => {
                if(item && item.classList) item.classList.remove('active');
            });
        });
        event.target.classList.add('active');
      },
      allApointmentsForDay(day){
          return this.schedule[day];
      },
      splitTime(time){
        let [hour, minute] = time.split(':');
        hour = ~~hour;
        minute = ~~minute;
        return {hour, minute}
      },
      minuteToPercentage(minutes){
        return 60/minutes;
      },
      compareTimes(time1, time2){
        const hourDifference = +this.splitTime(time1).hour - +this.splitTime(time2).hour;
        if (hourDifference !== 0) {
          return hourDifference;
        } else {
          return this.splitTime(time1).minute - this.splitTime(time2).minute;
        }
      },
      getDurationInFullHours(appointment){
          return Math.abs(this.getEndHours(appointment) - this.getStartHours(appointment));
      },
      getStartHours(appointment){
          return +this.splitTime(appointment.start).hour;
      },
      getEndHours(appointment){
          return +this.splitTime(appointment.end).hour;
      },
      toHourFormat(intgr){
          return (intgr < 10 ? '0'+intgr : ''+intgr)+':00';
      },
      isHalfSlot(slot, day){
          return this.allApointmentsForDay(day).filter(appointment => this.getStartHours(slot) === this.getStartHours(appointment)).length > 1
      },
      isSecondHalfSlot(slot , day){
        return this.allApointmentsForDay(day).filter(appointment => this.getStartHours(slot) === this.getStartHours(appointment)).findIndex(appointment => slot.title === appointment.title) > 0;
      },
      nextDay(){
          this.setDay(weekday.nextDay());
      },
      prevDay(){
        this.setDay(weekday.prevDay());
      },
      setDay(day){
        document.querySelectorAll('.weekday-'+day).forEach(activeColumn => {
          activeColumn.parentNode.childNodes.forEach(column => {
            if(column.classList) column.classList.remove('active-weekday')
          });
          activeColumn.classList.add('active-weekday');
        });
        document.querySelectorAll('.weekday-label-'+day).forEach(activeLabel => {
          activeLabel.parentNode.childNodes.forEach(column => {
            if(column.classList) column.classList.remove('active-weekday-label')
          });
          activeLabel.classList.add('active-weekday-label');
        });
      }
    },
    mounted(){
      window.addEventListener('load',() => {
        weekday.init();
        this.setDay(weekday.currentDay());
      });

    }
  }
</script>

<style lang="scss">

  $oneHourHeight: 4vh;
  $startHour: 8;
  $startOffset: $startHour * $oneHourHeight;

  @for $i from 1 through 24{
    .duration-#{$i}{
      height: $oneHourHeight * $i;
    }
  }

  .calendar-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .calendar{
    width: 50%;
    min-height: 50vh;
  }

  .table-body, .table-head{
    position: relative;
    z-index: 5;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .table-body-background{
    position: relative;
    width: 100%;
    z-index: 4;
  }

  .calendar-day-controls{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 6;
    display: none;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;

    .calendar-day-prev, .calendar-day-next{
      pointer-events: auto;
      background-color: rgba(255,255,255,0.9);
      width: 2*$oneHourHeight;
      height: 2*$oneHourHeight;
      border-radius: $oneHourHeight;
      margin: 0 0.2em;
      cursor: pointer;

      span{
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(20,20,40,0.5);
        width: 100%;
        height: 100%;
      }
    }
  }

  .hour-row{
    width: 100%;
  }

  .table-column{
    position: relative;
    height: 100%;
    z-index: 6;
  }

  .table-head-item, .table-body-item, .table-column{
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .weekday-label, .hour-label{
    height: $oneHourHeight;
  }

  @for $i from 1 through 24{
    .start-#{$i}{
      position: absolute;
      left: 0;
      top: ($i * $oneHourHeight) - $startOffset;
    }
  }

  .table-body-item.half-sized{
    width: 50%;
  }

  .table-body-item.half-sized.second-half{
    left: 50%;
  }

  .description>tr:hover{
    background-color: rgba(20,20,40,0.01);
  }

  .description td{
    width: 50%;
    line-height: 1.1em;
    font-size: 0.9em;
  }

  .description td[colspan="2"]{
    width: 100%;
    line-height: initial;
  }

  .start-25{
    display: none;
  }


  @media (max-width: 1500px){
    .calendar, .calendar-detail{
      font-size: 0.7em;
    }
  }


  @media(max-width: 1000px){
    main>.zeitplan .calendar-container{
      flex-direction: column;
      margin-bottom: 3em;
    }

    main>.zeitplan .calendar-container>div {
      font-size: 0.8em;
      width: 100%;
      margin-top: 2em;
    }

    main>.zeitplan .calendar{
      padding: 0.1em;
    }

    main>.zeitplan .calendar-detail{
      height: 30%;
    }
  }

  @media (max-width: 650px){
    $oneHourHeight: 6vh;

    .weekday-label{
      display: none;
    }

    .active-weekday-label{
      width: 400%;
      display: flex;
    }

    .calendar-day-controls{
      display: flex;
      user-select: none;
    }

    .hours{
      font-size: 0.5em;
    }

    .weekday{
      display: none;
    }

    .active-weekday{
      display: flex;
      width: 400%;
    }

    .calendar .table-column .table-body-item{
      font-size: 0.9em;
    }

  }
</style>
