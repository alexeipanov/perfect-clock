import Ember from 'ember';
import moment from 'moment';

export function localOffset(params, { tz }) {
  return moment.tz(tz).utcOffset();
}

export default Ember.Helper.helper(localOffset);
