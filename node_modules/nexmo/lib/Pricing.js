"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pricing = function () {
  _createClass(Pricing, null, [{
    key: "PATH",
    get: function get() {
      return "/account/{endpoint}/outbound/{type}";
    }
  }]);

  function Pricing(credentials, options) {
    _classCallCheck(this, Pricing);

    this.creds = credentials;
    this.options = options;
  }

  _createClass(Pricing, [{
    key: "get",
    value: function get(type, country, callback) {
      return this.options.rest.get(Pricing.PATH.replace("{endpoint}", "get-pricing").replace("{type}", type), { country: country }, callback);
    }
  }, {
    key: "getFull",
    value: function getFull(type, callback) {
      return this.options.rest.get(Pricing.PATH.replace("{endpoint}", "get-full-pricing").replace("{type}", type), callback);
    }
  }, {
    key: "getPrefix",
    value: function getPrefix(type, prefix, callback) {
      return this.options.rest.get(Pricing.PATH.replace("{endpoint}", "get-prefix-pricing").replace("{type}", type), { prefix: prefix }, callback);
    }
  }, {
    key: "getPhone",
    value: function getPhone(type, phone, callback) {
      return this.options.rest.get(Pricing.PATH.replace("{endpoint}", "get-phone-pricing").replace("{type}", type), { phone: phone }, callback);
    }
  }]);

  return Pricing;
}();

exports.default = Pricing;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QcmljaW5nLmpzIl0sIm5hbWVzIjpbIlByaWNpbmciLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsInR5cGUiLCJjb3VudHJ5IiwiY2FsbGJhY2siLCJyZXN0IiwiZ2V0IiwiUEFUSCIsInJlcGxhY2UiLCJwcmVmaXgiLCJwaG9uZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU1BLE87Ozt3QkFDYztBQUNoQixhQUFPLHFDQUFQO0FBQ0Q7OztBQUVELG1CQUFZQyxXQUFaLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUNoQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7Ozt3QkFFR0UsSSxFQUFNQyxPLEVBQVNDLFEsRUFBVTtBQUMzQixhQUFPLEtBQUtKLE9BQUwsQ0FBYUssSUFBYixDQUFrQkMsR0FBbEIsQ0FDTFIsUUFBUVMsSUFBUixDQUFhQyxPQUFiLENBQXFCLFlBQXJCLEVBQW1DLGFBQW5DLEVBQWtEQSxPQUFsRCxDQUEwRCxRQUExRCxFQUFvRU4sSUFBcEUsQ0FESyxFQUVMLEVBQUVDLGdCQUFGLEVBRkssRUFHTEMsUUFISyxDQUFQO0FBS0Q7Ozs0QkFFT0YsSSxFQUFNRSxRLEVBQVU7QUFDdEIsYUFBTyxLQUFLSixPQUFMLENBQWFLLElBQWIsQ0FBa0JDLEdBQWxCLENBQ0xSLFFBQVFTLElBQVIsQ0FBYUMsT0FBYixDQUFxQixZQUFyQixFQUFtQyxrQkFBbkMsRUFBdURBLE9BQXZELENBQ0UsUUFERixFQUVFTixJQUZGLENBREssRUFLTEUsUUFMSyxDQUFQO0FBT0Q7Ozs4QkFFU0YsSSxFQUFNTyxNLEVBQVFMLFEsRUFBVTtBQUNoQyxhQUFPLEtBQUtKLE9BQUwsQ0FBYUssSUFBYixDQUFrQkMsR0FBbEIsQ0FDTFIsUUFBUVMsSUFBUixDQUFhQyxPQUFiLENBQXFCLFlBQXJCLEVBQW1DLG9CQUFuQyxFQUF5REEsT0FBekQsQ0FDRSxRQURGLEVBRUVOLElBRkYsQ0FESyxFQUtMLEVBQUVPLGNBQUYsRUFMSyxFQU1MTCxRQU5LLENBQVA7QUFRRDs7OzZCQUVRRixJLEVBQU1RLEssRUFBT04sUSxFQUFVO0FBQzlCLGFBQU8sS0FBS0osT0FBTCxDQUFhSyxJQUFiLENBQWtCQyxHQUFsQixDQUNMUixRQUFRUyxJQUFSLENBQWFDLE9BQWIsQ0FBcUIsWUFBckIsRUFBbUMsbUJBQW5DLEVBQXdEQSxPQUF4RCxDQUNFLFFBREYsRUFFRU4sSUFGRixDQURLLEVBS0wsRUFBRVEsWUFBRixFQUxLLEVBTUxOLFFBTkssQ0FBUDtBQVFEOzs7Ozs7a0JBR1lOLE8iLCJmaWxlIjoiUHJpY2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcblxuY2xhc3MgUHJpY2luZyB7XG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gXCIvYWNjb3VudC97ZW5kcG9pbnR9L291dGJvdW5kL3t0eXBlfVwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY3JlZGVudGlhbHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZGVudGlhbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIGdldCh0eXBlLCBjb3VudHJ5LCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVzdC5nZXQoXG4gICAgICBQcmljaW5nLlBBVEgucmVwbGFjZShcIntlbmRwb2ludH1cIiwgXCJnZXQtcHJpY2luZ1wiKS5yZXBsYWNlKFwie3R5cGV9XCIsIHR5cGUpLFxuICAgICAgeyBjb3VudHJ5IH0sXG4gICAgICBjYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBnZXRGdWxsKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXN0LmdldChcbiAgICAgIFByaWNpbmcuUEFUSC5yZXBsYWNlKFwie2VuZHBvaW50fVwiLCBcImdldC1mdWxsLXByaWNpbmdcIikucmVwbGFjZShcbiAgICAgICAgXCJ7dHlwZX1cIixcbiAgICAgICAgdHlwZVxuICAgICAgKSxcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIGdldFByZWZpeCh0eXBlLCBwcmVmaXgsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXN0LmdldChcbiAgICAgIFByaWNpbmcuUEFUSC5yZXBsYWNlKFwie2VuZHBvaW50fVwiLCBcImdldC1wcmVmaXgtcHJpY2luZ1wiKS5yZXBsYWNlKFxuICAgICAgICBcInt0eXBlfVwiLFxuICAgICAgICB0eXBlXG4gICAgICApLFxuICAgICAgeyBwcmVmaXggfSxcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIGdldFBob25lKHR5cGUsIHBob25lLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVzdC5nZXQoXG4gICAgICBQcmljaW5nLlBBVEgucmVwbGFjZShcIntlbmRwb2ludH1cIiwgXCJnZXQtcGhvbmUtcHJpY2luZ1wiKS5yZXBsYWNlKFxuICAgICAgICBcInt0eXBlfVwiLFxuICAgICAgICB0eXBlXG4gICAgICApLFxuICAgICAgeyBwaG9uZSB9LFxuICAgICAgY2FsbGJhY2tcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByaWNpbmc7XG4iXX0=