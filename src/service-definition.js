import Request from './request';

function classDecorator(name, fn) {
  return function(target, key, descriptor) {
    if (!(typeof(target) === 'function' && key === undefined && descriptor === undefined)) {
      throw new Error(`@${name} can only be applied to classes`);
    }
    return fn(target, key, descriptor);
  }
};

function methodDecorator(name, fn) {
  return function(target, key, descriptor) {
    if (!(typeof(target) === 'object' && typeof(key) === 'string' && typeof(descriptor) === 'object')) {
      throw new Error(`@${name} can only be applied to class methods`);
    }
    return fn(target, key, descriptor);
  }
}

function createService(target) {
  if (!target.__service) {
    const value = {
      name: '',
      operations: {}
    };

    Object.defineProperty(target, '__service', {
      enumerable: false,
      configurable: false,
      writable: false,
      value
    });

    if (target.constructor) {
      Object.defineProperty(target.constructor, '__service', {
        enumerable: false,
        configurable: false,
        writable: false,
        value
      });
    }
  }
}

function operation(name, request, response) {
  return methodDecorator('operation', (target, key, descriptor) => {
    createService(target);

    if (target.__service.operations[name]) {
      throw new Error(`Operation ${name} already exists`);
    }

    target.__service.operations[name] = {
      name,
      request: new Request(request),
      response,
      handler(instance) {
        return instance[key].bind(instance);
      }
    };
  });
}

function service(name) {
  return classDecorator('service', (target) => {
    createService(target);

    target.__service.name = name;
  });
}

const type = classDecorator('type', (target) => {
  const type = new target();
  console.log('type', type);
  console.log(Object.keys(type));
  // register type
});

export {
  operation,
  service,
  type
};
