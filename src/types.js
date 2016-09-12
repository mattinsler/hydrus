import joi from 'joi';

const OPTION_RX = /^([^\(]+)(\(([^\)]+)\))?$/;

/*
  Hash of type -> method that creates a validator
*/
const types = {
  string(options = [], { isRequired = false }) {
    let validator = joi.string();

    for (let opt of options) {
      const [, name, , arg] = OPTION_RX.exec(opt);
      if (arg) {
        validator = validator[name].call(validator, JSON.parse(arg));
      } else {
        validator = validator[name]();
      }
    }

    if (isRequired) {
      validator = validator.required();
    }

    return validator;
  }
}

export default types;
