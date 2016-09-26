import joi from 'joi';

function createJoiType(typeName) {
  return function(options = [], { isRequired = false }) {
    let validator = joi[typeName]();

    for (let opt of options) {
      if (Array.isArray(opt) && opt.length === 2) {
        validator = validator[opt[0]].call(validator, opt[1]);
      } else if (typeof(opt) === 'string') {
        validator = validator[opt]();
      } else {
        throw new Error(`Invalid option: ${opt}`);
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
