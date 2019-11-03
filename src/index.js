const Randomizer = require('@sharadbrat/randomizer');

const { VariatorArgumentError } = require('./errors');


/**
 * @class Variator
 */
module.exports = class Variator {

  /**
   * @constructor
   */
  constructor() {
    this.session = {};
  }


  /**
   * @param {Object} session
   * @returns {undefined}
   * @public
   */
  set(session) {
    if (typeof session !== 'object') {
      throw new VariatorArgumentError('argument must be an object');
    }

    this.session = {
      ...this.session,
      ...session,
    };
  }


  /**
   * @returns {undefined}
   * @public
   */
  clear() {
    this.session = {};
  }


  /**
   * @param {string} featureName
   * @param {function} test
   * @returns {*}
   * @public
   */
  runTest(featureName, test) {
    if (typeof featureName !== 'string') {
      throw new VariatorArgumentError('first argument must be string')
    }

    if (typeof test !== 'function') {
      throw new VariatorArgumentError('second argument must be function');
    }

    if (this.session[featureName]) {
      return test();
    }
  }


  /**
   * @param {string} featureName
   * @param {Array} settings
   * @param {function} test
   * @returns {*}
   * @public
   */
  runWeightedTest(featureName, settings, test) {
    const r = new Randomizer(settings);
    const subfeatureName = r.choose();

    if (this.session[featureName]) {
      return test(subfeatureName);
    }
  }

};
