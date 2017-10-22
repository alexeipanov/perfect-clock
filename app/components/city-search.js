import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['search'],
  tagName: 'section',
  selectedCities: Ember.computed('cities.defaultIds', function() {
    return JSON.parse(localStorage.getItem('citiesIds')) || this.get('cities').defaultIds;
  }),
  filteredCities: Ember.computed('cities', function() {
    return this.get('cities').items.filter(item => this.get('selectedCities').some(elem => elem === item.id));
  }),
  didInsertElement() {
    this.get('element').querySelector('form.search input').focus();
  },
  keyUp(event) {
    event.preventDefault();
    let action = this.get('shortcuts').resolveAction({ context: 'search', key: event.keyCode, shift: event.shiftKey });
    if (action) {
      this.send(action);
    }
  },
  actions: {
    clock() {
      this.get('controller').transitionToRoute('index');
    },
    toggleCity(id) {
      let index = this.get('selectedCities').indexOf(id);
      if (index > -1) {
        if (this.get('selectedCities').length > 1) {
          this.get('selectedCities').removeAt(index);
        } else {
          this.set('error', 'Can\'t delete all cities!');
          return;
        }
      } else {
        if (this.get('selectedCities').length < 5) {
          this.get('selectedCities').pushObject(id);
        } else {
          this.set('error', 'You\'ve reached the maximum of 5 cities!');
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
