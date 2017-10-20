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
    let citiesElement = this.get('element');
    citiesElement.focus();
    this.set('displayTime', Ember.computed('selectedTime', function() {
      this.timer();
      return this.get('selectedTime'); })
    );
    let style = document.documentElement.style;
    style.setProperty('--tx', citiesElement.scrollLeft  + 'px');
  },
  animate(options) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let interval = (time - start) / options.duration;
      if (interval > 1) interval = 1;
      let progress = options.timing(interval)
      options.draw(progress, options.start, options.offset);
      if (interval < 1) {
        requestAnimationFrame(animate);
      }
    });
  },
  easeInOut(interval) {
    return interval < .5 ? 4 * interval * interval * interval : (interval - 1) * (2 * interval - 2) * (2 * interval - 2) + 1;
  },
  drawTimeline(progress, start, offset) {
    let citiesElement = this.get('element');
    citiesElement.scrollLeft = start + offset * progress;
  },
  timer() {
    return Ember.run.later(this, () => {
      this.set('selectedTime', moment().utc().unix());
    }, 1000);
  },
  timeChange() {
    let citiesElement = this.get('element');
    var offset = (moment.unix(this.get('selectedTime')).diff(moment.unix(this.get('hours.firstObject.time')), 'minutes')) / (this.get('hours').length * 60) * citiesElement.scrollWidth - 1 / 2 * citiesElement.offsetWidth;
    if (this.get('selectedTime') > this.get('hours.lastObject.time')) {
      this.send('addNextHours', week);
    }
    if (this.get('selectedTime') < this.get('hours.firstObject.time')) {
      this.send('addPrevHours', week);
    }
    if (this.get('isCurrent') || this.get('isDragging')) {
       citiesElement.scrollLeft = offset;
    } else {
      let style = document.documentElement.style;
      style.setProperty('--tx', offset + 'px');
    //   this.animate({
    //     duration: 1000,
    //     start: citiesElement.scrollLeft,
    //     offset: offset,
    //     timing: this.easeInOut,
    //     draw: this.drawTimeline.bind(this)
    //   });
    }
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
    this.set('isCurrent', false);
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
    this.set('selectedTime', this.timeDiff());
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
    this.timelineEnd();
  },
  keyUp(event) {
    event.preventDefault();
    let action = this.get('shortcuts').resolveAction({ key: event.keyCode, shift: event.shiftKey });
    if (action) {
      this.send(action);
    }
  },
  actions: {
    scrollTimeline() {
      let citiesElement = this.get('element');
      citiesElement.scrollLeft = this.get('selectedPosition') + this.get('startX') - this.get('endX');
    },
    search() {},
    addEvent() {},
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
