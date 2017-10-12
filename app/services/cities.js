import Ember from 'ember';

export default Ember.Service.extend({
  items: null,
  defaultIDs: null,

  init() {
    this._super(...arguments);
    this.set('items', [
      {
        id: 1,
        name: 'Melbourne',
      },
      {
        id: 2,
        name: 'Singapore',
      },
      {
        id: 3,
        name: 'Warsaw',
      },
      {
        id: 4,
        name: 'Moscow',
      },
      {
        id: 5,
        name: 'London',
      },
      {
        id: 6,
        name: 'New York',
      },
      {
        id: 7,
        name: 'San Francisco',
      },
      {
        id: 8,
        name: 'Kiev',
      },
    ]);
    this.set('defaultIDs', [1, 3, 7]);
  }
});








