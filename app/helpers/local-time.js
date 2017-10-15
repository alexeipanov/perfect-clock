import Ember from 'ember';
import moment from 'moment';

export function localTime(params, { source, offset }) {
  return moment.unix(source).utc().utcOffset(offset);
}

export default Ember.Helper.helper(localTime);
