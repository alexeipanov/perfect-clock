import Ember from 'ember';
import moment from 'moment';

export function isWorking(params, { source, tz }) {
  return moment.unix(source).utc().tz(tz).hour() >= 9 && moment.unix(source).utc().tz(tz).hour() <= 17;
}

export default Ember.Helper.helper(isWorking);
