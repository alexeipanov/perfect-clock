import Ember from 'ember';
import moment from 'moment';

export function isPreviousDay(params, { day, current, tz }) {
  return moment.unix(day).tz(tz).utc().day() === moment.unix(current).tz(tz).day() - 1;
}

export default Ember.Helper.helper(isPreviousDay);
