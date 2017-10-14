import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  cities: service('cities'),
  selectedCities: Ember.computed('cities.defaultIds', function() {
    return JSON.parse(localStorage.getItem('citiesIds')) || this.get('cities').defaultIDs;
  }),
  filteredCities: Ember.computed('cities', function() {
    return this.get('cities').items.filter(item => this.get('selectedCities').some(elem => elem === item.id));
  }),
  actions: {
    toggleCity(id) {
      let index = this.get('selectedCities').indexOf(id);
      if (index > -1) {
        if (this.get('selectedCities').length > 1) {
          this.get('selectedCities').removeAt(index);
        } else {
          this.set('error', 'can\'t delete all cities!');
          return;
        }
      } else {
        if (this.get('selectedCities').length < 5) {
          this.get('selectedCities').pushObject(id);
        } else {
          this.set('error', 'can\'t add more then 5 cities!');
          return;
        }
      }
      localStorage.setItem('citiesIds', JSON.stringify(this.get('selectedCities')));
      this.set('cities.defaultIds', this.get('selectedCities'));
    },
    filter() {
      let re = new RegExp('^' + this.get('value'), 'i');
      let filtered = this.get('cities').items.filter(item => re.test(item.name));
      this.set('filteredCities', filtered);
    },
    resetSearch() {
      this.set('value', null);
      this.set('filteredCities', this.get('cities').items.filter(item => this.get('selectedCities').some(elem => elem === item.id)));
    }
  }
});
