import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['info'],
  hourClass: '',
  didReceiveAttrs() {
    let utcTime = moment.unix(this.get('time')).utc();
    let tz = this.get('city.tz');
    let localTime = utcTime.tz(tz);
    this.set('hourClass', (utcTime.tz(tz).hour() >= 9 && utcTime.tz(tz).hour() <= 17) ? 'working' : '');
  },
  actions: {
    onTimeClick(duration) {
      this.get('onTimeClick')(duration);
    }
  }
});
