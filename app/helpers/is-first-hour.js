import Ember from 'ember';

export function isFirstHour(params, { index }) {
  return index % 24 === 0;
}

export default Ember.Helper.helper(isFirstHour);
