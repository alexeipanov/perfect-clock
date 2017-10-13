import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  cities: service('cities'),
});
