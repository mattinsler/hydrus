import joi from 'joi';

const OPTION_RX = /^([^\(]+)(\(([^\)]+)\))?$/;

function createJoiType(typeName) {
  return function(options = [], { isRequired = false }) {
    let validator = joi[typeName]();

    for (let opt of options) {
      let [, name, , arg] = OPTION_RX.exec(opt);
      if (arg) {
        if (/^\/.*\/$/.test(arg)) {
          arg = new RegExp(arg.slice(1, -1));
        } else {
          arg = JSON.parse(arg);
        }
        validator = validator[name].call(validator, arg);
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

/*
  Hash of type -> method that creates a validator
*/
const types = {
  string: createJoiType('string'),
  number: createJoiType('number')
}

export default types;
