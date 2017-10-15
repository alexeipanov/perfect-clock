import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['info'],
  classNameBindings: ['isUpdated'],
  isUpdated: false,
  didInsertElement() {
    this.get('element').addEventListener('animationend', this.removeClass.bind(this), false);
  },
  didUpdateAttrs() {
    this.set('isUpdated', true);
  },
  removeClass() {
    this.set('isUpdated', false);
  }
});
