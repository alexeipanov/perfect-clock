import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['info'],
  actions: {
    onTimeClick(duration) {
      this.get('onTimeClick')(duration);
    }
  }
});
