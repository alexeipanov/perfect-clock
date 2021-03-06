import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({
  coordinate: null,
  getPosiotion() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.set('coordinate', position.coords);
        this.set('timeoffset', moment().utcOffset());
        console.log(position.coords, moment().utcOffset());
      }, (error) => console.log(error));
    } else {
      return null;
    }
  },
  init() {
      this._super(...arguments);
      this.getPosiotion();
    },
});
