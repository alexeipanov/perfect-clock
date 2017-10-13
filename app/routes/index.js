import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render({ outlet: 'main' });
    this.render('searchLink', { outlet: 'search-form' });
  },
});
