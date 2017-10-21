export function initialize(application) {
  application.inject('component', 'geolocation', 'service:geolocation');
}

export default {
  name: 'geolocation',
  initialize
};
