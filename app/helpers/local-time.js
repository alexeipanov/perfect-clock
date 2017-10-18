import Ember from 'ember';
import moment from 'moment';

export function localTime(params, { source, tz }) {
  return moment.unix(source).utc().tz(tz);
}

export default Ember.Helper.helper(localTime);
