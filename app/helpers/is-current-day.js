import Ember from 'ember';
import moment from 'moment';

export function isCurrentDay(params, { day, current, tz }) {
  return moment.unix(day).tz(tz).utc().day() === moment.unix(current).tz(tz).day();
}

export default Ember.Helper.helper(isCurrentDay);
