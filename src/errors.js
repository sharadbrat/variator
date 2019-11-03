/**
 * @class VariatorArgumentError
 * @extends Error
 * @package
 */
module.exports.VariatorArgumentError = class VariatorArgumentError extends Error {
  constructor(message) {
    super(`[Variator] Illegal argument provided: ${message}`);
  }
};
