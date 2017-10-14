import Ember from 'ember';

export function inArray(params, {array, element}) {
  if (!array) {
    array = [];
  }
  return array.indexOf(parseInt(element)) > -1;
}

export default Ember.Helper.helper(inArray);
