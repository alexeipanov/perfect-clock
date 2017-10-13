import Ember from 'ember';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Ember.Component.extend({
  cities: service('cities'),
  hours: [],
  startX: null,
  endX: null,
  isDragging: false,
  selectedTime: null,
  selectedPosition: null,
  selected: Ember.computed('cities', function() {
    let defaults = this.get('cities').defaultIDs;
    return this.get('cities').items.filter(function(item) {
      return defaults.some(elem => elem === item.id)
    });
  }),
  didInsertElement() {
    this.addObserver('selectedTime', this, 'timeChange');
    this.set('selectedTime', moment().unix());
    if (!this.get('hours').length) {
      let startTime = moment().subtract(19, 'hours').minute(0).second(0).millisecond(0);
      let time, isWorking;
      for (let i = 0; i < 36; i++) {
        time = startTime.add(1, 'hours');
        isWorking = time.hour() >= 8 && time.hour() <= 19
        this.get('hours').addObject({time: time.unix(), working: isWorking});
      }
    }
  },
  timeChange() {
    let timelines = document.getElementsByClassName('timeline');
    if (timelines.length) {
      let offset = (moment.unix(this.get('selectedTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'hours') - 18)/ this.get('hours').length * timelines[0].scrollWidth;
      Array.from(timelines).forEach(function(timeline) {
        timeline.scrollLeft = offset;
      });
    }
  },
  touchStart(event) {
    event.preventDefault();
    let hoursWrapper = event.target.parentElement.parentElement;
    this.set('startX', event.changedTouches[0].clientX);
    this.set('isDragging', true);
    this.set('selectedPosition', hoursWrapper.scrollLeft);
    if ((hoursWrapper.scrollLeft + hoursWrapper.clientWidth) === hoursWrapper.scrollWidth) {
      let lastTime = this.get('hours.lastObject.time');
      this.send('addHours', lastTime);
    }
  },
  touchMove(event) {
    event.preventDefault();
    if (this.get('isDragging')) {
      let hoursWrapper = event.target.parentElement.parentElement;
      this.set('endX', event.changedTouches[event.changedTouches.length - 1].clientX);
      this.send('scrollTimeline', hoursWrapper);
    }
  },
  touchEnd(event) {
    event.preventDefault();
    let hoursWrapper = event.target.parentElement.parentElement;
    this.set('isDragging', false);
    if (Math.abs(this.get('startX') - this.get('endX')) > 10) {
      let duration = Math.round((hoursWrapper.scrollLeft - this.get('selectedPosition')) / hoursWrapper.scrollWidth * this.get('hours').length);
      if (duration >= 0) {
        this.set('selectedTime', moment.unix(this.get('selectedTime')).add(duration, 'hours').minute(0).second(0).millisecond(0).unix());
      } else {
        this.set('selectedTime', moment.unix(this.get('selectedTime')).subtract(duration * -1, 'hours').minute(0).second(0).millisecond(0).unix());
      }
    }
  },
  mouseDown(event) {
    event.preventDefault();
    let hoursWrapper = event.target.parentElement.parentElement;
    this.set('startX', event.originalEvent.clientX);
    this.set('isDragging', true);
    this.set('selectedPosition', hoursWrapper.scrollLeft);
    if ((hoursWrapper.scrollLeft + hoursWrapper.clientWidth) === hoursWrapper.scrollWidth) {
      let lastTime = this.get('hours.lastObject.time');
      this.send('addHours', lastTime);
    }
  },
  mouseMove(event) {
    event.preventDefault();
    if (this.get('isDragging')) {
      let hoursWrapper = event.target.parentElement.parentElement;
      this.set('endX', event.originalEvent.clientX);
      this.send('scrollTimeline', hoursWrapper);
    }
  },
  mouseUp(event) {
    event.preventDefault();
    let hoursWrapper = event.target.parentElement.parentElement;
    this.set('isDragging', false);
    if (Math.abs(this.get('startX') - this.get('endX')) > 10) {
      let duration = Math.round((hoursWrapper.scrollLeft - this.get('selectedPosition')) / hoursWrapper.scrollWidth * this.get('hours').length);
      if (duration >= 0) {
        this.set('selectedTime', moment.unix(this.get('selectedTime')).add(duration, 'hours').minute(0).second(0).millisecond(0).unix());
      } else {
        this.set('selectedTime', moment.unix(this.get('selectedTime')).subtract(duration * -1, 'hours').minute(0).second(0).millisecond(0).unix());
      }
    }
  },
  actions: {
    scrollTimeline(timeline) {
      if (Math.abs(this.get('startX') - this.get('endX')) > 10) {
        timeline.scrollLeft = this.get('selectedPosition') + this.get('startX') - this.get('endX');
      }
    },
    addHours(time) {
      let newTime, isWorking;
      newTime = moment.unix(time).add(1, 'hours');
      isWorking = newTime.hour() >= 8 && newTime.hour() <= 19;
      this.get('hours').addObject({time: newTime.unix(), working: isWorking});
    },
    toNow() {
      this.set('selectedTime', moment().unix());
    }
  }
});
