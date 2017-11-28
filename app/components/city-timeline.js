import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['timeline-wrapper'],
  hoursTimeline: null,
  daysTimeline: null,
  hourEvent() {
    console.log('hour click');
  },
  didInsertElement() {
    this.set('timeOffset', `o${moment.tz(this.get('city.tz')).utcOffset()}`);
  },
  didRender() {
    this.get('element').querySelectorAll('.hours-wrapper .hour').forEach((hour) => {
      hour.removeEventListener('click', this.hourEvent, { passive: true });
      hour.removeEventListener('touchstart', this.hourEvent, { passive: true });
      hour.addEventListener('click', this.hourEvent, { passive: true });
      hour.addEventListener('touchstart', this.hourEvent, { passive: true });
    });
  },
  didReceiveAttrs() {
    let hoursTimeline = '';
    let daysTimeline = '';
    let city = this.get('city');
    let utcTime, hourClass, dayClass;
    let currentTime = this.get('currentTime');
    let isLongDay, isShortDay;
    this.get('hours').forEach((hour) => {
      isLongDay = moment.unix(hour.time).utc().tz(city.tz).hours() === moment.unix(hour.time).subtract(1, 'hours').utc().tz(city.tz).hours();
      if (!isLongDay) {
        utcTime = moment.unix(hour.time).utc();
        dayClass = this.setDayClass(currentTime, hour.time, city.tz);
        if (utcTime.hour() % 24 === 0) {
          daysTimeline += `<div class="day ${dayClass}"><div class="day-label">${utcTime.format('ddd, D MMM YYYY')}</div></div>`;
        }
        hourClass = (utcTime.tz(city.tz).hour() >= 9 && utcTime.tz(city.tz).hour() <= 17) ? 'working' : '';
        hoursTimeline += `<div class="hour ${hourClass}">${utcTime.tz(city.tz).format('h')}</div>`;
      }
    });
    this.set('hoursTimeline', Ember.String.htmlSafe(hoursTimeline));
    this.set('daysTimeline', Ember.String.htmlSafe(daysTimeline));
  },
  setDayClass(now, time, tz) {
    let dayClass;
    switch (moment.unix(now).tz(tz).dayOfYear() - moment.unix(time).tz(tz).utc().dayOfYear()) {
      case 0:
      dayClass = 'current';
      break;
      case 1:
      dayClass = 'previous';
      break;
      default:
      dayClass = '';
      break;
    }
    return dayClass;
  }
});
