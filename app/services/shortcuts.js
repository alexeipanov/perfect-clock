import Ember from 'ember';

export default Ember.Service.extend({
  actions: [
    { context: 'index', name: 'nextDay', key: 39, shiftKey: false },
    { context: 'index', name: 'prevDay', key: 37, shiftKey: false },
    { context: 'index', name: 'nextWeek', key: 39, shiftKey: true },
    { context: 'index', name: 'prevWeek', key: 37, shiftKey: true },
    { context: 'index', name: 'search', key: 83, shiftKey: false },
    { context: 'index', name: 'addEvent', key: 78, shiftKey: false },
    { context: 'search', name: 'clock', key: 27, shiftKey: false },
  ],
  resolveAction(shortcut) {
    let action = this.get('actions').find(function(item) {
      return item.context === shortcut.context && item.key === shortcut.key && item.shiftKey === shortcut.shift
    }, shortcut);
    if (action) {
      return action.name;
    }
  }
});
