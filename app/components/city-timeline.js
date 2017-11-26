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
      hour.removeEventListener('click', this.hourEvent);
      hour.addEventListener('click', this.hourEvent);
    });
  },
  didReceiveAttrs() {
    let hoursTimeline = '';
    let daysTimeline = '';
    let city = this.get('city');
    let utcTime, hourClass, dayClass;
    let currentTime = this.get('currentTime');
    this.get('hours').forEach((hour) => {
      utcTime = moment.unix(hour.time).utc();
      switch (moment.unix(currentTime).tz(city.tz).dayOfYear() - moment.unix(hour.time).tz(city.tz).utc().dayOfYear()) {
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
      if (utcTime.hour() % 24 === 0) {
        daysTimeline += `<div class="day ${dayClass}"><div class="day-label">${utcTime.format('ddd, D MMM YYYY')}</div></div>`;
      }
      hourClass = (utcTime.tz(city.tz).hour() >= 9 && utcTime.tz(city.tz).hour() <= 17) ? 'working' : '';
      hoursTimeline += `<div class="hour ${hourClass}">${utcTime.tz(city.tz).format('h')}</div>`;
    });
    this.set('hoursTimeline', Ember.String.htmlSafe(hoursTimeline));
    this.set('daysTimeline', Ember.String.htmlSafe(daysTimeline));
  },
});
