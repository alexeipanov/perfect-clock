export function initialize(application) {
  application.inject('component', 'time', 'service:time');
}

export default {
  name: 'time',
  initialize
};
