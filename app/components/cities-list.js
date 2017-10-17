import Ember from 'ember';
import { inject as service } from '@ember/service';
import moment from 'moment';

let day = 24;
let week = day * 7;

export default Ember.Component.extend({
  classNames: ['cities'],
  tagName: 'section',
  cities: service('cities'),
  hours: [],
  startX: null,
  endX: null,
  isDragging: false,
  selectedTime: null,
  displayTime: null,
  selectedPosition: null,
  selected: Ember.computed('cities', function() {
    let selectedCities = JSON.parse(localStorage.getItem('citiesIds')) || this.get('cities').defaultIds;
    return this.get('cities').items.filter(function(item) {
      return selectedCities.some(elem => elem === item.id)
    });
  }),
  didInsertElement() {
    this.addObserver('selectedTime', this, 'timeChange');
    this.set('selectedTime', moment().utc().unix());
    this.send('addNextHours', week);
    this.send('addPrevHours', day);
  },
  timeChange() {
    let citiesElement = this.get('element');
    let offset = (moment.unix(this.get('selectedTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'minutes') - 18 * 60) / (this.get('hours').length * 60) * citiesElement.scrollWidth;
    citiesElement.scrollLeft = offset;
    this.set('displayTime', this.get('selectedTime'));
  },
  timeDiff() {
    let citiesElement = this.get('element');
    let duration = Math.round((citiesElement.scrollLeft - this.get('selectedPosition')) / citiesElement.scrollWidth * this.get('hours').length * 60);
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
    this.set('selectedPosition', citiesElement.scrollLeft);
    if ((citiesElement.scrollLeft + citiesElement.clientWidth) === citiesElement.scrollWidth) {
      this.send('addNextHours', week);
    }
    if (citiesElement.scrollLeft === 0) {
      this.send('addPrevHours', week);
    }
  },
  timelineMove(x) {
    if (this.get('isDragging')) {
      this.set('endX', x);
      this.send('scrollTimeline');
      this.set('displayTime', this.timeDiff());
    }
  },
  timelineEnd() {
    this.set('isDragging', false);
    this.set('selectedTime', this.timeDiff());
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
    this.timelineEnd();
  },
  actions: {
    scrollTimeline() {
      let citiesElement = this.get('element');
      citiesElement.scrollLeft = this.get('selectedPosition') + this.get('startX') - this.get('endX');
    },
    addNextHours(duration) {
      let lastTime;
      if (this.get('hours').length) {
        lastTime = moment.unix(this.get('hours.lastObject.time'));
      } else {
        lastTime = moment().subtract(19, 'hours').minute(0).second(0).millisecond(0);
      }
      for (let i = 1; i <= duration; i++) {
        this.get('hours').addObject({ time: lastTime.add(1, 'hours').unix() });
      }
    },
    addPrevHours(duration) {
      let firstTime = moment.unix(this.get('hours.firstObject.time'));
      for (let i = 1; i <= duration; i++) {
        this.get('hours').unshiftObject({ time: firstTime.subtract(1, 'hours').unix() });
      }
    },
    toNow() {
      this.set('selectedTime', moment().unix());
    },
    hourClick(time) {
      console.log('hour event: ' + time);
    }
  }
});
