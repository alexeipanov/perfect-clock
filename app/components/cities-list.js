import Ember from 'ember';
import moment from 'moment';

let day = 24;
let week = day * 7;

export default Ember.Component.extend({
  classNames: ['cities'],
  tagName: 'section',
  attributeBindings: ['tabindex'],
  tabindex: 1,
  hours: [],
  startX: null,
  endX: null,
  isDragging: false,
  selectedTime: null,
  displayTime: null,
  selectedPosition: null,
  isCurrent: true,
  selectedCities: Ember.computed('cities', function() {
    let selected = JSON.parse(localStorage.getItem('citiesIds')) || this.get('cities').defaultIds;
    return this.get('cities').items.filter(function(item) {
      return selected.some(elem => elem === item.id)
    });
  }),
  didInsertElement() {
    this.addObserver('selectedTime', this, 'timeChange');
    this.set('selectedTime', moment().utc().unix());
    this.send('addNextHours', week);
    this.send('addPrevHours', day);
    let citiesElement = this.get('element');
    citiesElement.focus();
    this.set('displayTime', Ember.computed('selectedTime', function() {
      this.timer();
      return this.get('selectedTime'); })
    );
  },
  timer() {
    return Ember.run.later(this, () => {
      if (this.get('isCurrent')) {
        this.set('selectedTime', moment().utc().unix());
      }
    }, 1000);
  },
  timeChange() {
    let citiesElement = this.get('element');
    let offset = (moment.unix(this.get('selectedTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'minutes')) / (this.get('hours').length * 60) * citiesElement.scrollWidth - 1 / 2 * citiesElement.offsetWidth;
    if (this.get('selectedTime') >= this.get('hours.lastObject.time')) {
      this.send('addNextHours', week);
    }
    if (this.get('selectedTime') <= this.get('hours.firstObject.time')) {
      this.send('addPrevHours', week);
      offset += week * 60;
    }
    let style = document.documentElement.style;
    style.setProperty('--tx', -1 * offset + 'px');
    this.set('selectedPosition', -1 * offset);
    if (this.get('isCurrent') || this.get('isDragging')) {
      style.setProperty('--duration', '0s');
    } else {
      style.setProperty('--duration', '0.5s');
    }
  },
  timeDiff() {
    let citiesElement = this.get('element');
    let duration = Math.round((this.get('startX') - this.get('endX')) / citiesElement.scrollWidth * this.get('hours').length * 60);
    let diff;
    if (duration >= 0) {
      diff = moment.unix(this.get('selectedTime')).add(duration, 'minutes').second(0).millisecond(0).unix();
    } else {
      diff = moment.unix(this.get('selectedTime')).subtract(duration * -1, 'minutes').second(0).millisecond(0).unix();
    }
    return diff;
  },
  timelineStart(x) {
    let citiesElement = this.get('element');
    // let infoElements = document.getElementsByClassName('info');
    // Array.from(infoElements).forEach((item) => item.classList.add('fadeout'));
    this.set('startX', x);
    this.set('isDragging', true);
    this.set('isCurrent', false);
    var offset = (moment.unix(this.get('displayTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'minutes')) / (this.get('hours').length * 60) * citiesElement.scrollWidth - 1 / 2 * citiesElement.offsetWidth;
    if (offset < 1440) {
      this.send('addPrevHours', week);
    }
    if (citiesElement.scrollWidth - offset < 3000) {
    this.send('addNextHours', week);
    }
  },
  timelineMove(x) {
    if (this.get('isDragging')) {
      this.set('endX', x);
      this.set('displayTime', this.timeDiff());
      let citiesElement = this.get('element');
      var offset = (moment.unix(this.get('displayTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'minutes')) / (this.get('hours').length * 60) * citiesElement.scrollWidth - 1 / 2 * citiesElement.offsetWidth;
      let style = document.documentElement.style;
      style.setProperty('--tx', -1 * offset + 'px');
      style.setProperty('--duration', '0s');
    }
  },
   timelineEnd(x) {
    let style = document.documentElement.style;
    style.setProperty('--tx', this.get('selectedPosition') - this.get('startX') + x + 'px');
    style.setProperty('--duration', '0s');
    this.set('endX', x);
    this.set('selectedTime', this.timeDiff());
    this.set('displayTime', this.get('selectedTime'));
    this.set('selectedPosition', this.get('selectedPosition') - this.get('startX') + x);
    this.set('isDragging', false);
  },
  touchStart(event) {
    event.preventDefault();
    this.timelineStart(event.changedTouches[0].clientX);
  },
  touchMove(event) {
    event.preventDefault();
    this.timelineMove(event.changedTouches[event.changedTouches.length - 1].clientX);
  },
  touchEnd(event) {
    event.preventDefault();
    this.timelineEnd();
  },
  mouseDown(event) {
    event.preventDefault();
    this.timelineStart(event.originalEvent.clientX);
  },
  mouseMove(event) {
    event.preventDefault();
    this.timelineMove(event.originalEvent.clientX);
  },
  mouseUp(event) {
    event.preventDefault();
    this.timelineEnd(event.originalEvent.clientX);
  },
  keyUp(event) {
    event.preventDefault();
    let action = this.get('shortcuts').resolveAction({ context: 'index', key: event.keyCode, shift: event.shiftKey });
    if (action) {
      this.send(action);
    }
  },
  actions: {
    search() {
      this.get('controller').transitionToRoute('search');
    },
    addEvent() {
      console.log('add event');
    },
    nextDay() {
      this.set('isCurrent', false);
      this.set('selectedTime', moment.unix(this.get('selectedTime')).add(1, 'days').unix());
      this.set('displayTime', this.get('selectedTime'));
    },
    prevDay() {
      this.set('isCurrent', false);
      this.set('selectedTime', moment.unix(this.get('selectedTime')).subtract(1, 'days').unix());
      this.set('displayTime', this.get('selectedTime'));
    },
    nextWeek() {
      this.set('isCurrent', false);
      this.set('selectedTime', moment.unix(this.get('selectedTime')).add(1, 'weeks').unix());
      this.set('displayTime', this.timeDiff());
    },
    prevWeek() {
      this.set('isCurrent', false);
      this.set('selectedTime', moment.unix(this.get('selectedTime')).subtract(1, 'weeks').unix());
      this.set('displayTime', this.timeDiff());
    },
    addNextHours(duration) {
      let lastTime, tmpHours;
      tmpHours = [];
      if (this.get('hours').length) {
        lastTime = moment.unix(this.get('hours.lastObject.time'));
      } else {
        lastTime = moment().subtract(19, 'hours').minute(0).second(0).millisecond(0);
      }
      for (let i = 1; i <= duration; i++) {
        tmpHours.addObject({ time: lastTime.add(1, 'hours').unix() });
      }
      this.get('hours').addObjects(tmpHours);
    },
    addPrevHours(duration) {
      let tmpHours = [];
      let firstTime = moment.unix(this.get('hours.firstObject.time'));
      for (let i = 1; i <= duration; i++) {
        tmpHours.unshiftObject({ time: firstTime.subtract(1, 'hours').unix() });
      }
      this.get('hours').unshiftObjects(tmpHours);
    },
    toNow() {
      this.set('isCurrent', true);
      this.set('selectedTime', moment().utc().unix());
      this.set('displayTime', Ember.computed('selectedTime', function() {
        this.timer();
        return this.get('selectedTime'); })
      );
    },
    hourClick(time) {
      console.log('hour event: ' + time);
    }
  }
});
