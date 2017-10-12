import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  cities: service('cities'),
  filtered: Ember.computed('cities', function() {
    let defaults = this.get('cities').defaultIDs;
    return this.get('cities').items.filter(function(item) {
      return defaults.some(elem => elem === item.id)
    });
  })
});
