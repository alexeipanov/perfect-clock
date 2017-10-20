export function initialize(application) {
  application.inject('component', 'shortcuts', 'service:shortcuts');
}

export default {
  name: 'shortcuts',
  initialize
};
