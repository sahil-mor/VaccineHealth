"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _Pricing = require("./Pricing");

var _Pricing2 = _interopRequireDefault(_Pricing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Number = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Number options.
   */
  function Number(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Number);

    this.creds = credentials;
    this.options = options;

    this._pricing = new _Pricing2.default(credentials, options);

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: remove with next major release
   */


  _createClass(Number, [{
    key: "getPricing",
    value: function getPricing() {
      this._pricing.get.apply(this, arguments);
    }

    /**
     * TODO: remove with next major release
     */

  }, {
    key: "getPhonePricing",
    value: function getPhonePricing() {
      this._pricing.getPhone.apply(this, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "get",
    value: function get() {
      this._nexmo.getNumbers.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "search",
    value: function search() {
      this._nexmo.searchNumbers.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "buy",
    value: function buy() {
      this._nexmo.buyNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "cancel",
    value: function cancel() {
      this._nexmo.cancelNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "update",
    value: function update() {
      this._nexmo.updateNumber.apply(this._nexmo, arguments);
    }
  }]);

  return Number;
}();

exports.default = Number;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdW1iZXIuanMiXSwibmFtZXMiOlsiTnVtYmVyIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfcHJpY2luZyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0IiwiZ2V0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJnZXRQaG9uZSIsImdldE51bWJlcnMiLCJzZWFyY2hOdW1iZXJzIiwiYnV5TnVtYmVyIiwiY2FuY2VsTnVtYmVyIiwidXBkYXRlTnVtYmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7OztJQUVNQSxNO0FBQ0o7Ozs7OztBQU1BLGtCQUFZQyxXQUFaLEVBQXVDO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUNyQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUEsU0FBS0UsUUFBTCxHQUFnQixzQkFBWUgsV0FBWixFQUF5QkMsT0FBekIsQ0FBaEI7O0FBRUE7QUFDQSxTQUFLRyxNQUFMLEdBQWMsS0FBS0gsT0FBTCxDQUFhSSxhQUFiLG1CQUFkOztBQUVBLFNBQUtELE1BQUwsQ0FBWUUsVUFBWixDQUNFLEtBQUtKLEtBQUwsQ0FBV0ssTUFEYixFQUVFLEtBQUtMLEtBQUwsQ0FBV00sU0FGYixFQUdFLEtBQUtQLE9BSFA7QUFLRDs7QUFFRDs7Ozs7OztpQ0FHYTtBQUNYLFdBQUtFLFFBQUwsQ0FBY00sR0FBZCxDQUFrQkMsS0FBbEIsQ0FBd0IsSUFBeEIsRUFBOEJDLFNBQTlCO0FBQ0Q7O0FBRUQ7Ozs7OztzQ0FHa0I7QUFDaEIsV0FBS1IsUUFBTCxDQUFjUyxRQUFkLENBQXVCRixLQUF2QixDQUE2QixJQUE3QixFQUFtQ0MsU0FBbkM7QUFDRDs7QUFFRDs7Ozs7OzBCQUdNO0FBQ0osV0FBS1AsTUFBTCxDQUFZUyxVQUFaLENBQXVCSCxLQUF2QixDQUE2QixLQUFLTixNQUFsQyxFQUEwQ08sU0FBMUM7QUFDRDs7QUFFRDs7Ozs7OzZCQUdTO0FBQ1AsV0FBS1AsTUFBTCxDQUFZVSxhQUFaLENBQTBCSixLQUExQixDQUFnQyxLQUFLTixNQUFyQyxFQUE2Q08sU0FBN0M7QUFDRDs7QUFFRDs7Ozs7OzBCQUdNO0FBQ0osV0FBS1AsTUFBTCxDQUFZVyxTQUFaLENBQXNCTCxLQUF0QixDQUE0QixLQUFLTixNQUFqQyxFQUF5Q08sU0FBekM7QUFDRDs7QUFFRDs7Ozs7OzZCQUdTO0FBQ1AsV0FBS1AsTUFBTCxDQUFZWSxZQUFaLENBQXlCTixLQUF6QixDQUErQixLQUFLTixNQUFwQyxFQUE0Q08sU0FBNUM7QUFDRDs7QUFFRDs7Ozs7OzZCQUdTO0FBQ1AsV0FBS1AsTUFBTCxDQUFZYSxZQUFaLENBQXlCUCxLQUF6QixDQUErQixLQUFLTixNQUFwQyxFQUE0Q08sU0FBNUM7QUFDRDs7Ozs7O2tCQUdZWixNIiwiZmlsZSI6Ik51bWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcblxuaW1wb3J0IFByaWNpbmcgZnJvbSBcIi4vUHJpY2luZ1wiO1xuXG5jbGFzcyBOdW1iZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gTnVtYmVyIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLl9wcmljaW5nID0gbmV3IFByaWNpbmcoY3JlZGVudGlhbHMsIG9wdGlvbnMpO1xuXG4gICAgLy8gVXNlZCB0byBmYWNpbGl0YXRlIHRlc3Rpbmcgb2YgdGhlIGNhbGwgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0XG4gICAgdGhpcy5fbmV4bW8gPSB0aGlzLm9wdGlvbnMubmV4bW9PdmVycmlkZSB8fCBuZXhtbztcblxuICAgIHRoaXMuX25leG1vLmluaXRpYWxpemUoXG4gICAgICB0aGlzLmNyZWRzLmFwaUtleSxcbiAgICAgIHRoaXMuY3JlZHMuYXBpU2VjcmV0LFxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiByZW1vdmUgd2l0aCBuZXh0IG1ham9yIHJlbGVhc2VcbiAgICovXG4gIGdldFByaWNpbmcoKSB7XG4gICAgdGhpcy5fcHJpY2luZy5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiByZW1vdmUgd2l0aCBuZXh0IG1ham9yIHJlbGVhc2VcbiAgICovXG4gIGdldFBob25lUHJpY2luZygpIHtcbiAgICB0aGlzLl9wcmljaW5nLmdldFBob25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGdldCgpIHtcbiAgICB0aGlzLl9uZXhtby5nZXROdW1iZXJzLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzZWFyY2goKSB7XG4gICAgdGhpcy5fbmV4bW8uc2VhcmNoTnVtYmVycy5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgYnV5KCkge1xuICAgIHRoaXMuX25leG1vLmJ1eU51bWJlci5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuX25leG1vLmNhbmNlbE51bWJlci5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuX25leG1vLnVwZGF0ZU51bWJlci5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXI7XG4iXX0=