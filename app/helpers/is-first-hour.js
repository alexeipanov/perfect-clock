import Ember from 'ember';
import moment from 'moment';

export function isFirstHour(params, { index }) {
  return index % 24 === 0;
}

export default Ember.Helper.helper(isFirstHour);
