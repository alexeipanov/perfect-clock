import { isWorking } from 'rdeaclock/helpers/is-working';
import { module, test } from 'qunit';

module('Unit | Helper | is working');

test('check is 10 PM is working hour', function(assert) {
  assert.equal(isWorking({}, {source: 1511172000, tz: 'Europe/Moscow'}), true);
});

test('check is 13 PM is working hour', function(assert) {
  assert.equal(isWorking({}, {source: 1511182800, tz: 'Europe/Moscow'}), true);
});

test('check is 19 PM is not working hour', function(assert) {
  assert.equal(isWorking({}, {source: 1511204400, tz: 'Europe/Moscow'}), false);
});

// import { moduleForComponent, test } from 'ember-qunit';
// import hbs from 'htmlbars-inline-precompile';

// moduleForComponent('is-working', 'helper:is-working', {
//   integration: true
// });

// test('it renders', function(assert) {
//   this.set('inputValue', '1234');

//   this.render(hbs`{{is-working inputValue}}`);

//   assert.equal(this.$().text().trim(), '1234');
// });
