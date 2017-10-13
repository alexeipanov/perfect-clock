import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render({ outlet: 'main' });
    this.render('searchForm', { outlet: 'search-form' });
  },
});
