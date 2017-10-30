import Ember from 'ember';
import moment from 'moment';

export function minutesAfterMidnight(params, { timestamp, tz, city_id }) {
  let diff = moment.unix(timestamp).utc().tz(tz).diff(moment.unix(timestamp).utc().tz(tz).startOf('day'), 'minutes');
  if (diff > 1290) {
    diff = 1290;
  }
  let style = document.documentElement.style;
  style.setProperty('--dx' + city_id, diff + 'px');
  return diff;
}

export default Ember.Helper.helper(minutesAfterMidnight);
