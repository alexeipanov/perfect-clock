import Ember from 'ember';
import moment from 'moment';

export function isWorking(params, { source, offset }) {
  return moment.unix(source).utc().utcOffset(offset).hour() >= 9 && moment.unix(source).utc().utcOffset(offset).hour() <= 17;
}

export default Ember.Helper.helper(isWorking);
