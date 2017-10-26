import Ember from 'ember';
import moment from 'moment';

export function utcTime(params, { source }) {
  return moment.unix(source).utc();
}

export default Ember.Helper.helper(utcTime);
