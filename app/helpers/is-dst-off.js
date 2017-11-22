import Ember from 'ember';
import moment from 'moment';

export function isDstOff(params, { source, tz }) {
  return moment.unix(source).utc().tz(tz).hours() === moment.unix(source).subtract(1, 'hours').utc().tz(tz).hours();
}

export default Ember.Helper.helper(isDstOff);
