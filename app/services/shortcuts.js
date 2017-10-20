import Ember from 'ember';

export default Ember.Service.extend({
  actions: [
    { name: 'nextDay', key: 39, shiftKey: false },
    { name: 'prevDay', key: 37, shiftKey: false },
    { name: 'nextWeek', key: 39, shiftKey: true },
    { name: 'prevWeek', key: 37, shiftKey: true },
    { name: 'search', key: 83, shiftKey: false },
    { name: 'addEvent', key: 78, shiftKey: false },
  ],
  resolveAction(shortcut) {
    let action = this.get('actions').find(function(item) {
      return item.key === shortcut.key && item.shiftKey === shortcut.shift
    }, shortcut);
    if (action) {
      return action.name;
    }
  }
});
