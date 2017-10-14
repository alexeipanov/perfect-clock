import Ember from 'ember';

export default Ember.Service.extend({
  items: null,
  defaultIds: null,

  init() {
    this._super(...arguments);
    this.set('items', [
      {
        id: 1,
        name: 'Melbourne',
        utc: 10,
      },
      {
        id: 2,
        name: 'Singapore',
        utc: 8,
      },
      {
        id: 3,
        name: 'Warsaw',
        utc: 1,
      },
      {
        id: 4,
        name: 'Moscow',
        utc: 3,
      },
      {
        id: 5,
        name: 'London',
        utc: 0,
      },
      {
        id: 6,
        name: 'New York',
        utc: -5,
      },
      {
        id: 7,
        name: 'San Francisco',
        utc: -8,
      },
      {
        id: 8,
        name: 'Kiev',
        utc: 2,
      },
    ]);
    this.set('defaultIds', [1, 3, 7]);
  }
});
