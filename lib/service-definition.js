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
        return instance[key];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLWRlZmluaXRpb24uanMiXSwibmFtZXMiOlsiY2xhc3NEZWNvcmF0b3IiLCJuYW1lIiwiZm4iLCJ0YXJnZXQiLCJrZXkiLCJkZXNjcmlwdG9yIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJtZXRob2REZWNvcmF0b3IiLCJjcmVhdGVTZXJ2aWNlIiwiX19zZXJ2aWNlIiwidmFsdWUiLCJvcGVyYXRpb25zIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJjb25zdHJ1Y3RvciIsIm9wZXJhdGlvbiIsInJlcXVlc3QiLCJyZXNwb25zZSIsImhhbmRsZXIiLCJpbnN0YW5jZSIsInNlcnZpY2UiLCJ0eXBlIiwiY29uc29sZSIsImxvZyIsImtleXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxjQUFULENBQXdCQyxJQUF4QixFQUE4QkMsRUFBOUIsRUFBa0M7QUFDaEMsU0FBTyxVQUFTQyxNQUFULEVBQWlCQyxHQUFqQixFQUFzQkMsVUFBdEIsRUFBa0M7QUFDdkMsUUFBSSxFQUFFLE9BQU9GLE1BQVAsS0FBbUIsVUFBbkIsSUFBaUNDLFFBQVFFLFNBQXpDLElBQXNERCxlQUFlQyxTQUF2RSxDQUFKLEVBQXVGO0FBQ3JGLFlBQU0sSUFBSUMsS0FBSixPQUFjTixJQUFkLHFDQUFOO0FBQ0Q7QUFDRCxXQUFPQyxHQUFHQyxNQUFILEVBQVdDLEdBQVgsRUFBZ0JDLFVBQWhCLENBQVA7QUFDRCxHQUxEO0FBTUQ7O0FBRUQsU0FBU0csZUFBVCxDQUF5QlAsSUFBekIsRUFBK0JDLEVBQS9CLEVBQW1DO0FBQ2pDLFNBQU8sVUFBU0MsTUFBVCxFQUFpQkMsR0FBakIsRUFBc0JDLFVBQXRCLEVBQWtDO0FBQ3ZDLFFBQUksRUFBRSxRQUFPRixNQUFQLHlDQUFPQSxNQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLEdBQVAsS0FBZ0IsUUFBL0MsSUFBMkQsUUFBT0MsVUFBUCx5Q0FBT0EsVUFBUCxPQUF1QixRQUFwRixDQUFKLEVBQW1HO0FBQ2pHLFlBQU0sSUFBSUUsS0FBSixPQUFjTixJQUFkLDJDQUFOO0FBQ0Q7QUFDRCxXQUFPQyxHQUFHQyxNQUFILEVBQVdDLEdBQVgsRUFBZ0JDLFVBQWhCLENBQVA7QUFDRCxHQUxEO0FBTUQ7O0FBRUQsU0FBU0ksYUFBVCxDQUF1Qk4sTUFBdkIsRUFBK0I7QUFDN0IsTUFBSSxDQUFDQSxPQUFPTyxTQUFaLEVBQXVCO0FBQ3JCLFFBQU1DLFFBQVE7QUFDWlYsWUFBTSxFQURNO0FBRVpXLGtCQUFZO0FBRkEsS0FBZDs7QUFLQUMsV0FBT0MsY0FBUCxDQUFzQlgsTUFBdEIsRUFBOEIsV0FBOUIsRUFBMkM7QUFDekNZLGtCQUFZLEtBRDZCO0FBRXpDQyxvQkFBYyxLQUYyQjtBQUd6Q0MsZ0JBQVUsS0FIK0I7QUFJekNOO0FBSnlDLEtBQTNDOztBQU9BLFFBQUlSLE9BQU9lLFdBQVgsRUFBd0I7QUFDdEJMLGFBQU9DLGNBQVAsQ0FBc0JYLE9BQU9lLFdBQTdCLEVBQTBDLFdBQTFDLEVBQXVEO0FBQ3JESCxvQkFBWSxLQUR5QztBQUVyREMsc0JBQWMsS0FGdUM7QUFHckRDLGtCQUFVLEtBSDJDO0FBSXJETjtBQUpxRCxPQUF2RDtBQU1EO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTUSxTQUFULENBQW1CbEIsSUFBbkIsRUFBeUJtQixPQUF6QixFQUFrQ0MsUUFBbEMsRUFBNEM7QUFDMUMsU0FBT2IsZ0JBQWdCLFdBQWhCLEVBQTZCLFVBQUNMLE1BQUQsRUFBU0MsR0FBVCxFQUFjQyxVQUFkLEVBQTZCO0FBQy9ESSxrQkFBY04sTUFBZDs7QUFFQSxRQUFJQSxPQUFPTyxTQUFQLENBQWlCRSxVQUFqQixDQUE0QlgsSUFBNUIsQ0FBSixFQUF1QztBQUNyQyxZQUFNLElBQUlNLEtBQUosZ0JBQXVCTixJQUF2QixxQkFBTjtBQUNEOztBQUVERSxXQUFPTyxTQUFQLENBQWlCRSxVQUFqQixDQUE0QlgsSUFBNUIsSUFBb0M7QUFDbENBLGdCQURrQztBQUVsQ21CLGVBQVMsc0JBQVlBLE9BQVosQ0FGeUI7QUFHbENDLHdCQUhrQztBQUlsQ0MsYUFKa0MsbUJBSTFCQyxRQUowQixFQUloQjtBQUNoQixlQUFPQSxTQUFTbkIsR0FBVCxDQUFQO0FBQ0Q7QUFOaUMsS0FBcEM7QUFRRCxHQWZNLENBQVA7QUFnQkQ7O0FBRUQsU0FBU29CLE9BQVQsQ0FBaUJ2QixJQUFqQixFQUF1QjtBQUNyQixTQUFPRCxlQUFlLFNBQWYsRUFBMEIsVUFBQ0csTUFBRCxFQUFZO0FBQzNDTSxrQkFBY04sTUFBZDs7QUFFQUEsV0FBT08sU0FBUCxDQUFpQlQsSUFBakIsR0FBd0JBLElBQXhCO0FBQ0QsR0FKTSxDQUFQO0FBS0Q7O0FBRUQsSUFBTXdCLE9BQU96QixlQUFlLE1BQWYsRUFBdUIsVUFBQ0csTUFBRCxFQUFZO0FBQzlDLE1BQU1zQixPQUFPLElBQUl0QixNQUFKLEVBQWI7QUFDQXVCLFVBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CRixJQUFwQjtBQUNBQyxVQUFRQyxHQUFSLENBQVlkLE9BQU9lLElBQVAsQ0FBWUgsSUFBWixDQUFaO0FBQ0E7QUFDRCxDQUxZLENBQWI7O1FBUUVOLFMsR0FBQUEsUztRQUNBSyxPLEdBQUFBLE87UUFDQUMsSSxHQUFBQSxJIiwiZmlsZSI6InNlcnZpY2UtZGVmaW5pdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmZ1bmN0aW9uIGNsYXNzRGVjb3JhdG9yKG5hbWUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgIGlmICghKHR5cGVvZih0YXJnZXQpID09PSAnZnVuY3Rpb24nICYmIGtleSA9PT0gdW5kZWZpbmVkICYmIGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQCR7bmFtZX0gY2FuIG9ubHkgYmUgYXBwbGllZCB0byBjbGFzc2VzYCk7XG4gICAgfVxuICAgIHJldHVybiBmbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG1ldGhvZERlY29yYXRvcihuYW1lLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICBpZiAoISh0eXBlb2YodGFyZ2V0KSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mKGtleSkgPT09ICdzdHJpbmcnICYmIHR5cGVvZihkZXNjcmlwdG9yKSA9PT0gJ29iamVjdCcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEAke25hbWV9IGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gY2xhc3MgbWV0aG9kc2ApO1xuICAgIH1cbiAgICByZXR1cm4gZm4odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZpY2UodGFyZ2V0KSB7XG4gIGlmICghdGFyZ2V0Ll9fc2VydmljZSkge1xuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgICBvcGVyYXRpb25zOiB7fVxuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCAnX19zZXJ2aWNlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWVcbiAgICB9KTtcblxuICAgIGlmICh0YXJnZXQuY29uc3RydWN0b3IpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQuY29uc3RydWN0b3IsICdfX3NlcnZpY2UnLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gb3BlcmF0aW9uKG5hbWUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHJldHVybiBtZXRob2REZWNvcmF0b3IoJ29wZXJhdGlvbicsICh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikgPT4ge1xuICAgIGNyZWF0ZVNlcnZpY2UodGFyZ2V0KTtcblxuICAgIGlmICh0YXJnZXQuX19zZXJ2aWNlLm9wZXJhdGlvbnNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3BlcmF0aW9uICR7bmFtZX0gYWxyZWFkeSBleGlzdHNgKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuX19zZXJ2aWNlLm9wZXJhdGlvbnNbbmFtZV0gPSB7XG4gICAgICBuYW1lLFxuICAgICAgcmVxdWVzdDogbmV3IFJlcXVlc3QocmVxdWVzdCksXG4gICAgICByZXNwb25zZSxcbiAgICAgIGhhbmRsZXIoaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlW2tleV07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlcnZpY2UobmFtZSkge1xuICByZXR1cm4gY2xhc3NEZWNvcmF0b3IoJ3NlcnZpY2UnLCAodGFyZ2V0KSA9PiB7XG4gICAgY3JlYXRlU2VydmljZSh0YXJnZXQpO1xuXG4gICAgdGFyZ2V0Ll9fc2VydmljZS5uYW1lID0gbmFtZTtcbiAgfSk7XG59XG5cbmNvbnN0IHR5cGUgPSBjbGFzc0RlY29yYXRvcigndHlwZScsICh0YXJnZXQpID0+IHtcbiAgY29uc3QgdHlwZSA9IG5ldyB0YXJnZXQoKTtcbiAgY29uc29sZS5sb2coJ3R5cGUnLCB0eXBlKTtcbiAgY29uc29sZS5sb2coT2JqZWN0LmtleXModHlwZSkpO1xuICAvLyByZWdpc3RlciB0eXBlXG59KTtcblxuZXhwb3J0IHtcbiAgb3BlcmF0aW9uLFxuICBzZXJ2aWNlLFxuICB0eXBlXG59O1xuIl19