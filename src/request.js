import joi from 'joi';

import types from './types';

const TYPE_RX = /^(!)?([^\.]+)(\.(.+))?$/;

function parseType(spec) {
  const match = TYPE_RX.exec(spec);
  if (!match) {
    throw new Error(`Invalid type spec: ${spec}`);
  }

  const isRequired = match[1] === '!';
  const typeName = match[2];
  const typeOptions = match[4].split('.').map(a => a.trim());

  if (!types[typeName]) {
    throw new Error(`Unknown type name: ${typeName}`);
  }

  return {
    type: typeName,
    options: typeOptions,
    isRequired,
    validator: types[typeName](typeOptions, { isRequired })
  };
}

class Request {
  constructor(spec = {}) {
    // could be an array of objects or object or undefined

    this.fields = Object.entries(spec).map(([k, v]) => {
      return {
        key: k,
        type: parseType(v)
      };
    });

    this.validator = joi.object().keys(
      this.fields.reduce((o, field) => {
        o[field.key] = field.type.validator;
        return o;
      }, {})
    );
  }

  parse(data) {
    return new Promise((resolve, reject) => {
      const result = this.fields.reduce((o, field) => {
        o[field.key] = data[field.key];
        return o;
      }, {});

      joi.validate(result, this.validator, (err, validatedResult) => {
        if (err) { reject(err); }
        else { resolve(validatedResult); }
      });
    });
  }
}

export default Request;
