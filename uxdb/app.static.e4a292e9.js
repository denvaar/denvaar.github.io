(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = __webpack_require__(3);

var _App = __webpack_require__(4);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export your top level component as JSX (for static rendering)
exports.default = _App2.default;

// Render your app


// Your top level component

if (typeof document !== 'undefined') {
  var renderMethod =  false ? _reactDom2.default.render : _reactDom2.default.hydrate;
  var render = function render(Comp) {
    renderMethod(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(Comp, null)
    ), document.getElementById('root'));
  };

  // Render!
  render(_App2.default);

  // Hot Module Replacement
  if (false) {
    module.hot.accept('./App', function () {
      render(require('./App').default);
    });
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(5);

var _axios2 = _interopRequireDefault(_axios);

var _FilterContainer = __webpack_require__(6);

var _FilterContainer2 = _interopRequireDefault(_FilterContainer);

var _RecordsContainer = __webpack_require__(7);

var _RecordsContainer2 = _interopRequireDefault(_RecordsContainer);

var _CategoryContainer = __webpack_require__(9);

var _CategoryContainer2 = _interopRequireDefault(_CategoryContainer);

var _categories = __webpack_require__(11);

var _categories2 = _interopRequireDefault(_categories);

var _helpers = __webpack_require__(12);

__webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      records: [],
      selectedFilters: [],
      selectedCategory: "Reference",
      selectedSubcategory: "Pattern"
    };

    _this.availableFilters = _this.availableFilters.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.makeRequest();
    }
  }, {
    key: 'availableFilters',
    value: function availableFilters() {
      var _this2 = this;

      return _categories2.default.find(function (category) {
        return category.title === _this2.state.selectedCategory;
      }).subcategories.find(function (subcategory) {
        return subcategory.title === _this2.state.selectedSubcategory;
      }).filters;
    }
  }, {
    key: 'toggleFilter',
    value: function toggleFilter(value, filterCategory) {
      var _this3 = this;

      var index = this.state.selectedFilters.findIndex(function (filter) {
        return filter.value === value;
      });
      var newState = {
        selectedFilters: [].concat(_toConsumableArray(this.state.selectedFilters), [{ key: filterCategory, value: value }])
      };

      if (index != -1) {
        newState = {
          selectedFilters: [].concat(_toConsumableArray(this.state.selectedFilters.slice(0, index)), _toConsumableArray(this.state.selectedFilters.slice(index + 1)))
        };
      }

      this.setState(newState, function () {
        return _this3.makeRequest();
      });
    }
  }, {
    key: 'changeView',
    value: function changeView(key, newValue) {
      var _setState,
          _this4 = this;

      this.setState((_setState = {}, _defineProperty(_setState, key, newValue), _defineProperty(_setState, 'selectedFilters', []), _setState), function () {
        return _this4.makeRequest();
      });
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest() {
      var _this5 = this;

      var appendResults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var mapRecords = function mapRecords(records) {
        return records.map(function (record) {
          return {
            id: record.id,
            mediaUrl: record.fields["Media URL"],
            thumbUrl: record.fields["Thumb URL"],
            title: record.fields["Name"]
          };
        });
      };

      var airtableBase = "https://api.airtable.com/v0/appWzDTk29fbpI9kC";
      var url = airtableBase + '/' + this.state.selectedCategory;

      if (this.state.selectedFilters.length > 0) {
        url += (0, _helpers.buildFilterByFormula)(this.state.selectedFilters);
      }

      /* token should not be here! */
      _axios2.default.get(url, { headers: { Authorization: "Bearer keyHXT2ee1ZGTfuyq" } }).then(function (response) {
        if (appendResults) {
          _this5.setState({
            records: [].concat(_toConsumableArray(_this5.state.records), [mapRecords(response.data.records)])
          });
        } else {
          _this5.setState({
            records: mapRecords(response.data.records)
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'center-text' },
          'UXdb'
        ),
        _react2.default.createElement(_CategoryContainer2.default, {
          categories: _categories2.default,
          selectedCategory: this.state.selectedCategory,
          selectedSubcategory: this.state.selectedSubcategory,
          handleCategoryClick: function handleCategoryClick(category) {
            return _this6.changeView('selectedCategory', category);
          },
          handleSubcategoryClick: function handleSubcategoryClick(subcategory) {
            return _this6.changeView('selectedSubcategory', subcategory);
          }
        }),
        _react2.default.createElement(_FilterContainer2.default, {
          filters: this.availableFilters(),
          handleFilterSelect: function handleFilterSelect(filterCategory, filter) {
            return _this6.toggleFilter(filter, filterCategory);
          }
        }),
        _react2.default.createElement(_RecordsContainer2.default, { records: this.state.records })
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterGroup = function FilterGroup(_ref) {
  var category = _ref.category,
      options = _ref.options,
      handleFilterSelect = _ref.handleFilterSelect;
  return _react2.default.createElement(
    "div",
    { className: "filter-group" },
    _react2.default.createElement(
      "div",
      null,
      category
    ),
    options.map(function (option) {
      return _react2.default.createElement(
        "div",
        { key: option },
        _react2.default.createElement(
          "label",
          null,
          _react2.default.createElement("input", { type: "checkbox", onClick: function onClick() {
              return handleFilterSelect(category, option);
            } }),
          option
        )
      );
    })
  );
};

var FilterContainer = function FilterContainer(_ref2) {
  var filters = _ref2.filters,
      handleFilterSelect = _ref2.handleFilterSelect;
  return _react2.default.createElement(
    "div",
    { className: "filter-container" },
    _react2.default.createElement(
      "h4",
      null,
      "FILTERS"
    ),
    filters.map(function (filter) {
      return _react2.default.createElement(FilterGroup, {
        key: filter.filterCategory,
        handleFilterSelect: handleFilterSelect,
        category: filter.filterCategory,
        options: filter.filterOptions
      });
    })
  );
};

exports.default = FilterContainer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _logo = __webpack_require__(8);

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordsContainer = function RecordsContainer(_ref) {
  var records = _ref.records;
  return _react2.default.createElement(
    'div',
    { className: 'images' },
    records.map(function (record) {
      return _react2.default.createElement(
        'div',
        { key: record.id },
        _react2.default.createElement('img', { src: record.thumbUrl || _logo2.default, onError: function onError(e) {
            e.target.src = _logo2.default;
          } }),
        _react2.default.createElement(
          'div',
          null,
          record.title
        )
      );
    })
  );
};

exports.default = RecordsContainer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/logo.f6191681.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Category = __webpack_require__(10);

var _Category2 = _interopRequireDefault(_Category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategoryContainer = function CategoryContainer(_ref) {
  var categories = _ref.categories,
      handleCategoryClick = _ref.handleCategoryClick,
      handleSubcategoryClick = _ref.handleSubcategoryClick,
      selectedCategory = _ref.selectedCategory,
      selectedSubcategory = _ref.selectedSubcategory;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'categories' },
      _react2.default.createElement(
        'ul',
        { className: 'nav' },
        categories.map(function (category) {
          return _react2.default.createElement(_Category2.default, {
            key: category.title,
            cssClass: 'nav-item',
            title: category.title,
            handleClick: function handleClick() {
              handleCategoryClick(category.title);handleSubcategoryClick(category.subcategories[0].title);
            },
            isActive: category.title === selectedCategory
          });
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'subcategories' },
      _react2.default.createElement(
        'ul',
        { className: 'nav' },
        categories.find(function (category) {
          return category.title === selectedCategory;
        }).subcategories.map(function (subcategory) {
          return _react2.default.createElement(_Category2.default, {
            key: subcategory.title,
            cssClass: 'subcategory',
            title: subcategory.title,
            handleClick: handleSubcategoryClick,
            isActive: subcategory.title === selectedSubcategory
          });
        })
      )
    )
  );
};

exports.default = CategoryContainer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = function Category(_ref) {
  var title = _ref.title,
      isActive = _ref.isActive,
      handleClick = _ref.handleClick,
      cssClass = _ref.cssClass;
  return _react2.default.createElement(
    "li",
    { className: isActive ? cssClass + " active" : cssClass, onClick: function onClick() {
        return handleClick(title);
      } },
    _react2.default.createElement(
      "a",
      { href: "#" },
      title
    )
  );
};

exports.default = Category;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  title: "Reference",
  subcategories: [{
    title: "Pattern",
    filters: [{
      filterCategory: "Pattern",
      filterOptions: ["Animation", "Empty state", "On boarding", "Date Picker", "Forms", "Error validation"]
    }, {
      filterCategory: "System",
      filterOptions: ["iOS", "Android", "Cross platform", "Browser"]
    }, {
      filterCategory: "Device",
      filterOptions: ["iPhone", "iPad", "Android Tablet", "Android Phone"]
    }]
  }, {
    title: "Benchmarks",
    filters: [{
      filterCategory: "Benchmarks",
      filterOptions: ["Netflix", "Hulu", "Amazon", "Xfinity", "Vudu"]
    }, {
      filterCategory: "System",
      filterOptions: ["iOS", "Android", "Cross platform", "Browser"]
    }, {
      filterCategory: "Device",
      filterOptions: ["iPhone", "iPad", "Android Tablet", "Android Phone"]
    }]
  }]
}, {
  title: "Understand",
  subcategories: [{
    title: "Empathize",
    filters: [{
      filterCategory: "Task",
      filterOptions: ["Interview", "JTBD"]
    }]
  }, {
    title: "Define",
    filters: [{
      filterCategory: "Task",
      filterOptions: ["Diagram", "Flowchart", "Report"]
    }]
  }]
}, {
  title: "Explore",
  subcategories: [{ title: "Ideate", filters: [] }, { title: "Prototype", filters: [] }]
}, {
  title: "Materialize",
  subcategories: [{ title: "Validate", filters: [] }, { title: "Implement", filters: [] }]
}];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var buildFilterByFormula = exports.buildFilterByFormula = function buildFilterByFormula(filters) {
  var filterQuery = filters.reduce(function (acc, filter) {
    return [].concat(_toConsumableArray(acc), ['Find(%27' + filter.value + '%27, ' + filter.key + ')']);
  }, []);

  return '?filterByFormula=AND(' + filterQuery.join(', ') + ')';
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=app.static.e4a292e9.js.map