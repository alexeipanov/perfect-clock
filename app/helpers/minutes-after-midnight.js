import Ember from 'ember';
import moment from 'moment';

export function minutesAfterMidnight(params, { timestamp, tz, city_id }) {
  let duration = '0s';
  let timing = 'linear';
  let diff = moment.unix(timestamp).utc().tz(tz).diff(moment.unix(timestamp).utc().tz(tz).startOf('day'), 'minutes');
  if (diff > 1290) {
    diff = 0;
    duration = '.5s';
    timing = 'ease-in-out';
  }
  let style = document.documentElement.style;
  style.setProperty('--dx' + city_id, diff + 'px');
  style.setProperty('--dd' + city_id, duration);
  style.setProperty('--dt' + city_id, timing);
  return diff;
}

export default Ember.Helper.helper(minutesAfterMidnight);
