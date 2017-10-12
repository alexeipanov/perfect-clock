import Ember from 'ember';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Ember.Component.extend({
  cities: service('cities'),
  hours: [],
  selected: Ember.computed('cities', function() {
    let defaults = this.get('cities').defaultIDs;
    return this.get('cities').items.filter(function(item) {
      return defaults.some(elem => elem === item.id)
    });
  }),
  didInsertElement(...params) {
    this._super(...params);
    let startTime = moment().subtract(18, 'hours');
    let time, isWorking;
    for (let i = 0; i < 36; i++) {
      time = startTime.add(1, 'hours');
      isWorking = time.hour() >= 8 && time.hour() <= 19
      this.get('hours').addObject({time: time.unix(), working: isWorking});
    }
  }
});
