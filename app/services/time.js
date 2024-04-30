import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({
  time: null,
  init() {
    this._super(...arguments);
    this.set('timestamp', moment().utc().unix());
  },
});
