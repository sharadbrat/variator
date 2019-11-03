const { it, describe } = require('mocha');
const { assert } = require('chai');

const Variator = require('../src/index');
const { VariatorArgumentError } = require('../src/errors');


describe('Variator', () => {

  describe('#constructor', () => {

    it('Create session as empty object', () => {
      const v = new Variator();

      assert.deepEqual(v._session, {});
    });

  });


  describe('#set', () => {

    it('Throws error if argument is not an object', () => {
      const v = new Variator();

      assert.throws(() => v.set('not an object'), VariatorArgumentError);
    });


    it('Sets session as it is in the first call', () => {
      const v = new Variator();
      const session = { featureA: true };

      v.set(session);

      assert.deepEqual(v._session, session);
    });


    it('Merges sessions', () => {
      const v = new Variator();
      const session1 = { featureA: true };
      const session2 = { featureB: true };
      const result = { featureA: true, featureB: true };

      v.set(session1);
      v.set(session2);

      assert.deepEqual(v._session, result);
    });


    it('Overrides values in session when keys intersect', () => {
      const v = new Variator();
      const session1 = { featureA: false, featureB: true };
      const session2 = { featureA: true };
      const result = { featureA: true, featureB: true };

      v.set(session1);
      v.set(session2);

      assert.deepEqual(v._session, result);
    });

  });


  describe('#clear', () => {

    it('Sets session as an empty object', () => {
      const v = new Variator();
      const session = { featureA: true, featureB: true };

      v.set(session);
      v.clear();

      assert.deepEqual(v._session, {});
    });

  });


  describe('#runTest', () => {

    it('Throws error if first argument is not a string', () => {
      const v = new Variator();

      assert.throws(() => v.runTest(true), VariatorArgumentError);
    });


    it('Throws error if second argument is not a function', () => {
      const v = new Variator();

      assert.throws(() => v.runTest('featureA', true), VariatorArgumentError);
    });


    it('Runs test if feature with provided feature name is turned on in session', () => {
      const v = new Variator();
      v.set({ 'featureA': true });
      const message = 'works';

      const act = v.runTest('featureA', () => message);

      assert.equal(act, message);
    });


    it('Does not run test if feature with provided feature name is turned off in session', () => {
      const v = new Variator();
      v.set({ 'featureA': false });
      const message = 'works';

      const act = v.runTest('featureA', () => message);

      assert.notEqual(act, message);
    });

  });


  describe('#runWeightedTest', () => {

    it('Throws error if first argument is not a string', () => {
      const v = new Variator();

      assert.throws(() => v.runWeightedTest(true), VariatorArgumentError);
    });


    it('Throws error if second argument is not an array', () => {
      const v = new Variator();

      assert.throws(() => v.runWeightedTest('featureA', true), VariatorArgumentError);
    });


    it('Throws error if third argument is not a function', () => {
      const v = new Variator();

      assert.throws(() => v.runWeightedTest('featureA', [], 'not a function'), VariatorArgumentError);
    });


    it('Runs test with weighted random if feature with provided feature name is turned on in session', () => {
      const v = new Variator();
      v.set({ 'featureA': true });

      const act = v.runWeightedTest('featureA', [
        [1, 'A'],
        [1, 'B'],
      ], message => message);

      assert.include(['A', 'B'], act);
    });


    it('Does not run test if feature with provided feature name is turned off in session', () => {
      const v = new Variator();
      v.set({ 'featureA': false });
      const message = 'works';

      const act = v.runWeightedTest('featureA', [
        [1, 'A'],
        [1, 'B'],
      ], () => message);

      assert.notEqual(act, message);
    });

  });

});