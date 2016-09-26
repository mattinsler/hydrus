import joi from 'joi';

import types from './types';

const TYPE_RX = /^(!)?([^\.]+)(\.(.+))?$/;
const OPTION_RX = /^([^\(]+)(\(([^\)]+)\))?$/;

function parseValue(value) {
  if (/^\/.*\/[a-z]?$/.test(value)) {
    // regexp
    const [, content, option] = /^\/(.*)\/([a-z])?$/.exec(value);
    return new RegExp(content, option);
  } else if (/^-?0\.[0-9]+(\.[0-9]+)*$/.test(value)) {
    // number starting with 0.
    return parseFloat(value);
  } else if (/^-?[1-9][0-9]*(\.[0-9]+)*$/.test(value)) {
    // number
    return parseFloat(value);
  } else {
    return JSON.parse(value);
  }
}

function parseOptions(value = '') {
  return value
    .split('.')
    .map(a => a.trim())
    .filter(a => a)
    .map((opt) => {
      let [, method, , arg] = OPTION_RX.exec(opt);
      if (!arg) { return method; }

      if (arg) {
        return [method, parseValue(arg)];
      } else {
        return method;
      }
    });
}

function parseType(spec) {
  const match = TYPE_RX.exec(spec);
  if (!match) {
    throw new Error(`Invalid type spec: ${spec}`);
  }

  const isRequired = match[1] === '!';
  const typeName = match[2];
  const typeOptions = parseOptions(match[4]);

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
