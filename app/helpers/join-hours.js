import Ember from 'ember';

export function joinHours(params, { hours }) {
  let result;
  hours.forEach((hour) => {
    result += Ember.String.htmlSafe('<div class="hour"></div>');
  });
  return Ember.String.htmlSafe(result);
}

export default Ember.Helper.helper(joinHours);
