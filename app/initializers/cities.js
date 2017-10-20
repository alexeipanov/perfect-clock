export function initialize(application) {
  application.inject('component', 'cities', 'service:cities');
}

export default {
  name: 'cities',
  initialize
};
