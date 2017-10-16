import Ember from 'ember';
import { inject as service } from '@ember/service';
import moment from 'moment';

let week = 24 * 7;

export default Ember.Component.extend({
  cities: service('cities'),
  hours: [],
  startX: null,
  endX: null,
  isDragging: false,
  selectedTime: null,
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
  },
  timeChange() {
    let citiesElement = document.getElementsByClassName('cities')[0];
    let offset = (moment.unix(this.get('selectedTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'hours') - 18) / this.get('hours').length * citiesElement.scrollWidth;
    citiesElement.scrollLeft = offset;
  },
  timelineStart(x) {
    let citiesElement = document.getElementsByClassName('cities')[0];
    let infoElements = document.getElementsByClassName('info');
    Array.from(infoElements).forEach((item) => item.classList.add('fadeout'));
    this.set('startX', x);
    this.set('isDragging', true);
    this.set('selectedPosition', citiesElement.scrollLeft);
    if ((citiesElement.scrollLeft + citiesElement.clientWidth) === citiesElement.scrollWidth) {
      this.send('addNextHours', week);
    }
  },
  timelineMove(x) {
    if (this.get('isDragging')) {
      let citiesElement = document.getElementsByClassName('cities')[0];
      this.set('endX', x);
      this.send('scrollTimeline', citiesElement);
    }
  },
  timelineEnd() {
    let citiesElement = document.getElementsByClassName('cities')[0];
    this.set('isDragging', false);
    if (Math.abs(this.get('startX') - this.get('endX')) > 10) {
      let duration = Math.round((citiesElement.scrollLeft - this.get('selectedPosition')) / citiesElement.scrollWidth * this.get('hours').length);
      if (duration >= 0) {
        this.set('selectedTime', moment.unix(this.get('selectedTime')).add(duration, 'hours').minute(0).second(0).millisecond(0).unix());
      } else {
        this.set('selectedTime', moment.unix(this.get('selectedTime')).subtract(duration * -1, 'hours').minute(0).second(0).millisecond(0).unix());
      }
    }
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
    scrollTimeline(citiesElement) {
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
    toNow() {
      this.set('selectedTime', moment().unix());
    },
    hourClick(time) {
      console.log('hour event ' + time);
    }
  }
});
