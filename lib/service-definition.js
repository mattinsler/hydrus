'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.service = exports.operation = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classDecorator(name, fn) {
  return function (target, key, descriptor) {
    if (!(typeof target === 'function' && key === undefined && descriptor === undefined)) {
      throw new Error('@' + name + ' can only be applied to classes');
    }
    return fn(target, key, descriptor);
  };
};

function methodDecorator(name, fn) {
  return function (target, key, descriptor) {
    if (!((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && typeof key === 'string' && (typeof descriptor === 'undefined' ? 'undefined' : _typeof(descriptor)) === 'object')) {
      throw new Error('@' + name + ' can only be applied to class methods');
    }
    return fn(target, key, descriptor);
  };
}

function createService(target) {
  if (!target.__service) {
    var value = {
      name: '',
      operations: {}
    };

    Object.defineProperty(target, '__service', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    if (target.constructor) {
      Object.defineProperty(target.constructor, '__service', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: value
      });
    }
  }
}

function operation(name, request, response) {
  return methodDecorator('operation', function (target, key, descriptor) {
    createService(target);

    if (target.__service.operations[name]) {
      throw new Error('Operation ' + name + ' already exists');
    }

    target.__service.operations[name] = {
      name: name,
      request: new _request2.default(request),
      response: response,
      handler: function handler(instance) {
        return instance[key].bind(instance);
      }
    };
  });
}

function service(name) {
  return classDecorator('service', function (target) {
    createService(target);

    target.__service.name = name;
  });
}

var type = classDecorator('type', function (target) {
  var type = new target();
  console.log('type', type);
  console.log(Object.keys(type));
  // register type
});

exports.operation = operation;
exports.service = service;
exports.type = type;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLWRlZmluaXRpb24uanMiXSwibmFtZXMiOlsiY2xhc3NEZWNvcmF0b3IiLCJuYW1lIiwiZm4iLCJ0YXJnZXQiLCJrZXkiLCJkZXNjcmlwdG9yIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJtZXRob2REZWNvcmF0b3IiLCJjcmVhdGVTZXJ2aWNlIiwiX19zZXJ2aWNlIiwidmFsdWUiLCJvcGVyYXRpb25zIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJjb25zdHJ1Y3RvciIsIm9wZXJhdGlvbiIsInJlcXVlc3QiLCJyZXNwb25zZSIsImhhbmRsZXIiLCJpbnN0YW5jZSIsImJpbmQiLCJzZXJ2aWNlIiwidHlwZSIsImNvbnNvbGUiLCJsb2ciLCJrZXlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsU0FBU0EsY0FBVCxDQUF3QkMsSUFBeEIsRUFBOEJDLEVBQTlCLEVBQWtDO0FBQ2hDLFNBQU8sVUFBU0MsTUFBVCxFQUFpQkMsR0FBakIsRUFBc0JDLFVBQXRCLEVBQWtDO0FBQ3ZDLFFBQUksRUFBRSxPQUFPRixNQUFQLEtBQW1CLFVBQW5CLElBQWlDQyxRQUFRRSxTQUF6QyxJQUFzREQsZUFBZUMsU0FBdkUsQ0FBSixFQUF1RjtBQUNyRixZQUFNLElBQUlDLEtBQUosT0FBY04sSUFBZCxxQ0FBTjtBQUNEO0FBQ0QsV0FBT0MsR0FBR0MsTUFBSCxFQUFXQyxHQUFYLEVBQWdCQyxVQUFoQixDQUFQO0FBQ0QsR0FMRDtBQU1EOztBQUVELFNBQVNHLGVBQVQsQ0FBeUJQLElBQXpCLEVBQStCQyxFQUEvQixFQUFtQztBQUNqQyxTQUFPLFVBQVNDLE1BQVQsRUFBaUJDLEdBQWpCLEVBQXNCQyxVQUF0QixFQUFrQztBQUN2QyxRQUFJLEVBQUUsUUFBT0YsTUFBUCx5Q0FBT0EsTUFBUCxPQUFtQixRQUFuQixJQUErQixPQUFPQyxHQUFQLEtBQWdCLFFBQS9DLElBQTJELFFBQU9DLFVBQVAseUNBQU9BLFVBQVAsT0FBdUIsUUFBcEYsQ0FBSixFQUFtRztBQUNqRyxZQUFNLElBQUlFLEtBQUosT0FBY04sSUFBZCwyQ0FBTjtBQUNEO0FBQ0QsV0FBT0MsR0FBR0MsTUFBSCxFQUFXQyxHQUFYLEVBQWdCQyxVQUFoQixDQUFQO0FBQ0QsR0FMRDtBQU1EOztBQUVELFNBQVNJLGFBQVQsQ0FBdUJOLE1BQXZCLEVBQStCO0FBQzdCLE1BQUksQ0FBQ0EsT0FBT08sU0FBWixFQUF1QjtBQUNyQixRQUFNQyxRQUFRO0FBQ1pWLFlBQU0sRUFETTtBQUVaVyxrQkFBWTtBQUZBLEtBQWQ7O0FBS0FDLFdBQU9DLGNBQVAsQ0FBc0JYLE1BQXRCLEVBQThCLFdBQTlCLEVBQTJDO0FBQ3pDWSxrQkFBWSxLQUQ2QjtBQUV6Q0Msb0JBQWMsS0FGMkI7QUFHekNDLGdCQUFVLEtBSCtCO0FBSXpDTjtBQUp5QyxLQUEzQzs7QUFPQSxRQUFJUixPQUFPZSxXQUFYLEVBQXdCO0FBQ3RCTCxhQUFPQyxjQUFQLENBQXNCWCxPQUFPZSxXQUE3QixFQUEwQyxXQUExQyxFQUF1RDtBQUNyREgsb0JBQVksS0FEeUM7QUFFckRDLHNCQUFjLEtBRnVDO0FBR3JEQyxrQkFBVSxLQUgyQztBQUlyRE47QUFKcUQsT0FBdkQ7QUFNRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBU1EsU0FBVCxDQUFtQmxCLElBQW5CLEVBQXlCbUIsT0FBekIsRUFBa0NDLFFBQWxDLEVBQTRDO0FBQzFDLFNBQU9iLGdCQUFnQixXQUFoQixFQUE2QixVQUFDTCxNQUFELEVBQVNDLEdBQVQsRUFBY0MsVUFBZCxFQUE2QjtBQUMvREksa0JBQWNOLE1BQWQ7O0FBRUEsUUFBSUEsT0FBT08sU0FBUCxDQUFpQkUsVUFBakIsQ0FBNEJYLElBQTVCLENBQUosRUFBdUM7QUFDckMsWUFBTSxJQUFJTSxLQUFKLGdCQUF1Qk4sSUFBdkIscUJBQU47QUFDRDs7QUFFREUsV0FBT08sU0FBUCxDQUFpQkUsVUFBakIsQ0FBNEJYLElBQTVCLElBQW9DO0FBQ2xDQSxnQkFEa0M7QUFFbENtQixlQUFTLHNCQUFZQSxPQUFaLENBRnlCO0FBR2xDQyx3QkFIa0M7QUFJbENDLGFBSmtDLG1CQUkxQkMsUUFKMEIsRUFJaEI7QUFDaEIsZUFBT0EsU0FBU25CLEdBQVQsRUFBY29CLElBQWQsQ0FBbUJELFFBQW5CLENBQVA7QUFDRDtBQU5pQyxLQUFwQztBQVFELEdBZk0sQ0FBUDtBQWdCRDs7QUFFRCxTQUFTRSxPQUFULENBQWlCeEIsSUFBakIsRUFBdUI7QUFDckIsU0FBT0QsZUFBZSxTQUFmLEVBQTBCLFVBQUNHLE1BQUQsRUFBWTtBQUMzQ00sa0JBQWNOLE1BQWQ7O0FBRUFBLFdBQU9PLFNBQVAsQ0FBaUJULElBQWpCLEdBQXdCQSxJQUF4QjtBQUNELEdBSk0sQ0FBUDtBQUtEOztBQUVELElBQU15QixPQUFPMUIsZUFBZSxNQUFmLEVBQXVCLFVBQUNHLE1BQUQsRUFBWTtBQUM5QyxNQUFNdUIsT0FBTyxJQUFJdkIsTUFBSixFQUFiO0FBQ0F3QixVQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQkYsSUFBcEI7QUFDQUMsVUFBUUMsR0FBUixDQUFZZixPQUFPZ0IsSUFBUCxDQUFZSCxJQUFaLENBQVo7QUFDQTtBQUNELENBTFksQ0FBYjs7UUFRRVAsUyxHQUFBQSxTO1FBQ0FNLE8sR0FBQUEsTztRQUNBQyxJLEdBQUFBLEkiLCJmaWxlIjoic2VydmljZS1kZWZpbml0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZnVuY3Rpb24gY2xhc3NEZWNvcmF0b3IobmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgaWYgKCEodHlwZW9mKHRhcmdldCkgPT09ICdmdW5jdGlvbicgJiYga2V5ID09PSB1bmRlZmluZWQgJiYgZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBAJHtuYW1lfSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGNsYXNzZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZuKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gbWV0aG9kRGVjb3JhdG9yKG5hbWUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgIGlmICghKHR5cGVvZih0YXJnZXQpID09PSAnb2JqZWN0JyAmJiB0eXBlb2Yoa2V5KSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mKGRlc2NyaXB0b3IpID09PSAnb2JqZWN0JykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQCR7bmFtZX0gY2FuIG9ubHkgYmUgYXBwbGllZCB0byBjbGFzcyBtZXRob2RzYCk7XG4gICAgfVxuICAgIHJldHVybiBmbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VydmljZSh0YXJnZXQpIHtcbiAgaWYgKCF0YXJnZXQuX19zZXJ2aWNlKSB7XG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIG9wZXJhdGlvbnM6IHt9XG4gICAgfTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsICdfX3NlcnZpY2UnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZVxuICAgIH0pO1xuXG4gICAgaWYgKHRhcmdldC5jb25zdHJ1Y3Rvcikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5jb25zdHJ1Y3RvciwgJ19fc2VydmljZScsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVyYXRpb24obmFtZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgcmV0dXJuIG1ldGhvZERlY29yYXRvcignb3BlcmF0aW9uJywgKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgY3JlYXRlU2VydmljZSh0YXJnZXQpO1xuXG4gICAgaWYgKHRhcmdldC5fX3NlcnZpY2Uub3BlcmF0aW9uc1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPcGVyYXRpb24gJHtuYW1lfSBhbHJlYWR5IGV4aXN0c2ApO1xuICAgIH1cblxuICAgIHRhcmdldC5fX3NlcnZpY2Uub3BlcmF0aW9uc1tuYW1lXSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICByZXF1ZXN0OiBuZXcgUmVxdWVzdChyZXF1ZXN0KSxcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgaGFuZGxlcihpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2Vba2V5XS5iaW5kKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VydmljZShuYW1lKSB7XG4gIHJldHVybiBjbGFzc0RlY29yYXRvcignc2VydmljZScsICh0YXJnZXQpID0+IHtcbiAgICBjcmVhdGVTZXJ2aWNlKHRhcmdldCk7XG5cbiAgICB0YXJnZXQuX19zZXJ2aWNlLm5hbWUgPSBuYW1lO1xuICB9KTtcbn1cblxuY29uc3QgdHlwZSA9IGNsYXNzRGVjb3JhdG9yKCd0eXBlJywgKHRhcmdldCkgPT4ge1xuICBjb25zdCB0eXBlID0gbmV3IHRhcmdldCgpO1xuICBjb25zb2xlLmxvZygndHlwZScsIHR5cGUpO1xuICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyh0eXBlKSk7XG4gIC8vIHJlZ2lzdGVyIHR5cGVcbn0pO1xuXG5leHBvcnQge1xuICBvcGVyYXRpb24sXG4gIHNlcnZpY2UsXG4gIHR5cGVcbn07XG4iXX0=