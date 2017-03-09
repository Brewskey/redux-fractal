'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _reactRedux = require('react-redux');

var _actions = require('./actions.js');

var UIActions = _interopRequireWildcard(_actions);

var _localReducer = require('./localReducer.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Config) {
  return function (Component) {
    var defaultMapStateToProps = function defaultMapStateToProps(state) {
      return state;
    };
    var ConnectComp = (0, _reactRedux.connect)(Config.mapStateToProps || defaultMapStateToProps, Config.mapDispatchToProps, Config.mergeProps)(function (props) {
      var newProps = (0, _assign2.default)({}, props);
      delete newProps.store;
      // eslint-disable-next-line
      return _react2.default.createElement(Component, newProps);
    });

    var UI = function (_React$Component) {
      (0, _inherits3.default)(UI, _React$Component);

      function UI(props, context) {
        (0, _classCallCheck3.default)(this, UI);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UI.__proto__ || (0, _getPrototypeOf2.default)(UI)).call(this, props, context));

        var compKey = typeof Config.key === 'function' ? Config.key(props, context) : Config.key;
        _this.store = null;
        (0, _invariant2.default)(Config.key, '[redux-fractal] - You must supply a  key to the component either as a function or string');
        _this.compKey = compKey;
        _this.unsubscribe = null;
        return _this;
      }

      (0, _createClass3.default)(UI, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var state = this.context.store.getState();
          var existingState = (typeof state.get === 'function' ? state.get('local') : state.local)[this.compKey];
          var storeResult = (0, _localReducer.createStore)(Config.createStore, this.props, this.compKey, existingState, this.context);
          this.store = storeResult.store;
          this.storeCleanup = storeResult.cleanup;
          this.context.store.dispatch({
            type: UIActions.CREATE_COMPONENT_STATE,
            payload: { config: Config, props: this.props, store: this.store, hasStore: !!Config.createStore },
            meta: { reduxFractalTriggerComponent: this.compKey }
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _this2 = this;

          var persist = typeof Config.persist === 'function' ? Config.persist(this.props, this.context) : Config.persist;
          setTimeout(function () {
            _this2.context.store.dispatch({
              type: UIActions.DESTROY_COMPONENT_STATE,
              payload: { persist: persist, hasStore: !!Config.createStore },
              meta: { reduxFractalTriggerComponent: _this2.compKey }
            });
            if (_this2.storeCleanup) {
              _this2.storeCleanup();
            }
            _this2.store = null;
          }, 0);
        }
      }, {
        key: 'render',
        value: function render() {
          if (this.props.store) {
            // eslint-disable-next-line
            console.warn('Props named \'store\' cannot be passed to redux-fractal \'local\'\n                HOC with key ' + this.compKey + ' since it\'s a reserved prop');
          }
          return this.store && _react2.default.createElement(ConnectComp, (0, _extends3.default)({}, this.props, {
            store: this.store
          }));
        }
      }]);
      return UI;
    }(_react2.default.Component);

    UI.contextTypes = (0, _assign2.default)({}, Component.contextTypes, {
      store: _react2.default.PropTypes.shape({
        subscribe: _react2.default.PropTypes.func.isRequired,
        dispatch: _react2.default.PropTypes.func.isRequired,
        getState: _react2.default.PropTypes.func.isRequired
      })
    });
    UI.propTypes = (0, _assign2.default)({}, {
      store: _react2.default.PropTypes.shape({
        subscribe: _react2.default.PropTypes.func.isRequired,
        dispatch: _react2.default.PropTypes.func.isRequired,
        getState: _react2.default.PropTypes.func.isRequired
      })
    });
    var displayName = Component.displayName || Component.name || 'Component';
    UI.displayName = 'local(' + displayName + ')';
    return (0, _hoistNonReactStatics2.default)(UI, Component);
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhbC5qcyJdLCJuYW1lcyI6WyJVSUFjdGlvbnMiLCJDb25maWciLCJDb21wb25lbnQiLCJkZWZhdWx0TWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJDb25uZWN0Q29tcCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm1lcmdlUHJvcHMiLCJwcm9wcyIsIm5ld1Byb3BzIiwic3RvcmUiLCJVSSIsImNvbnRleHQiLCJjb21wS2V5Iiwia2V5IiwidW5zdWJzY3JpYmUiLCJnZXRTdGF0ZSIsImV4aXN0aW5nU3RhdGUiLCJnZXQiLCJsb2NhbCIsInN0b3JlUmVzdWx0IiwiY3JlYXRlU3RvcmUiLCJzdG9yZUNsZWFudXAiLCJjbGVhbnVwIiwiZGlzcGF0Y2giLCJ0eXBlIiwiQ1JFQVRFX0NPTVBPTkVOVF9TVEFURSIsInBheWxvYWQiLCJjb25maWciLCJoYXNTdG9yZSIsIm1ldGEiLCJyZWR1eEZyYWN0YWxUcmlnZ2VyQ29tcG9uZW50IiwicGVyc2lzdCIsInNldFRpbWVvdXQiLCJERVNUUk9ZX0NPTVBPTkVOVF9TVEFURSIsImNvbnNvbGUiLCJ3YXJuIiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwic2hhcGUiLCJzdWJzY3JpYmUiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInByb3BUeXBlcyIsImRpc3BsYXlOYW1lIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztJQUFZQSxTOztBQUNaOzs7Ozs7a0JBRWUsVUFBQ0MsTUFBRDtBQUFBLFNBQVksVUFBQ0MsU0FBRCxFQUFlO0FBQ3hDLFFBQU1DLHlCQUF5QixTQUF6QkEsc0JBQXlCLENBQUNDLEtBQUQ7QUFBQSxhQUFXQSxLQUFYO0FBQUEsS0FBL0I7QUFDQSxRQUFNQyxjQUFjLHlCQUNkSixPQUFPSyxlQUFQLElBQTBCSCxzQkFEWixFQUVkRixPQUFP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QU8sS0FBS0U7QUFGQSxhQUR4QjtBQU1EO0FBL0RxQztBQUFBO0FBQUEsTUFXdkIsZ0JBQU1ULFNBWGlCOztBQWtFeENVLE9BQUcwQixZQUFILEdBQWtCLHNCQUFjLEVBQWQsRUFBa0JwQyxVQUFVb0MsWUFBNUIsRUFBMEM7QUFDMUQzQixhQUFPLGdCQUFNNEIsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0I7QUFDM0JDLG1CQUFXLGdCQUFNRixTQUFOLENBQWdCRyxJQUFoQixDQUFxQkMsVUFETDtBQUUzQmxCLGtCQUFVLGdCQUFNYyxTQUFOLENBQWdCRyxJQUFoQixDQUFxQkMsVUFGSjtBQUczQjFCLGtCQUFVLGdCQUFNc0IsU0FBTixDQUFnQkcsSUFBaEIsQ0FBcUJDO0FBSEosT0FBdEI7QUFEbUQsS0FBMUMsQ0FBbEI7QUFPQS9CLE9BQUdnQyxTQUFILEdBQWUsc0JBQWMsRUFBZCxFQUFrQjtBQUMvQmpDLGFBQU8sZ0JBQU00QixTQUFOLENBQWdCQyxLQUFoQixDQUFzQjtBQUMzQkMsbUJBQVcsZ0JBQU1GLFNBQU4sQ0FBZ0JHLElBQWhCLENBQXFCQyxVQURMO0FBRTNCbEIsa0JBQVUsZ0JBQU1jLFNBQU4sQ0FBZ0JHLElBQWhCLENBQXFCQyxVQUZKO0FBRzNCMUIsa0JBQVUsZ0JBQU1zQixTQUFOLENBQWdCRyxJQUFoQixDQUFxQkM7QUFISixPQUF0QjtBQUR3QixLQUFsQixDQUFmO0FBT0EsUUFBTUUsY0FBYzNDLFVBQVUyQyxXQUFWLElBQXlCM0MsVUFBVTRDLElBQW5DLElBQTJDLFdBQS9EO0FBQ0FsQyxPQUFHaUMsV0FBSCxjQUEwQkEsV0FBMUI7QUFDQSxXQUFPLG9DQUFxQmpDLEVBQXJCLEVBQXlCVixTQUF6QixDQUFQO0FBQ0QsR0FuRmM7QUFBQSxDIiwiZmlsZSI6ImxvY2FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBob2lzdE5vblJlYWN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0ICogYXMgVUlBY3Rpb25zIGZyb20gJy4vYWN0aW9ucy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vbG9jYWxSZWR1Y2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKENvbmZpZykgPT4gKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBkZWZhdWx0TWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiBzdGF0ZTtcbiAgY29uc3QgQ29ubmVjdENvbXAgPSBjb25uZWN0KFxuICAgICAgICBDb25maWcubWFwU3RhdGVUb1Byb3BzIHx8IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICAgIENvbmZpZy5tYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICAgIENvbmZpZy5tZXJnZVByb3BzKSgocHJvcHMpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzKTtcbiAgICAgICAgICBkZWxldGUgbmV3UHJvcHMuc3RvcmU7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgcmV0dXJuICg8Q29tcG9uZW50IHsuLi5uZXdQcm9wc30gLz4pO1xuICAgICAgICB9KTtcbiAgY2xhc3MgVUkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgICBjb25zdCBjb21wS2V5ID0gdHlwZW9mIENvbmZpZy5rZXkgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICAgIENvbmZpZy5rZXkocHJvcHMsIGNvbnRleHQpIDogQ29uZmlnLmtleTtcbiAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xuICAgICAgaW52YXJpYW50KENvbmZpZy5rZXksXG4gICAgICdbcmVkdXgtZnJhY3RhbF0gLSBZb3UgbXVzdCBzdXBwbHkgYSAga2V5IHRvIHRoZSBjb21wb25lbnQgZWl0aGVyIGFzIGEgZnVuY3Rpb24gb3Igc3RyaW5nJyk7XG4gICAgICB0aGlzLmNvbXBLZXkgPSBjb21wS2V5O1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IG51bGw7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jb250ZXh0LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBleGlzdGluZ1N0YXRlID0gKHR5cGVvZiBzdGF0ZS5nZXQgPT09ICdmdW5jdGlvbicgPyBzdGF0ZS5nZXQoJ2xvY2FsJykgOiBzdGF0ZS5sb2NhbClbdGhpcy5jb21wS2V5XTtcbiAgICAgIGNvbnN0IHN0b3JlUmVzdWx0ID0gY3JlYXRlU3RvcmUoXG4gICAgICAgICAgICAgICAgQ29uZmlnLmNyZWF0ZVN0b3JlLCB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcEtleSwgZXhpc3RpbmdTdGF0ZSwgdGhpcy5jb250ZXh0KTtcbiAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZVJlc3VsdC5zdG9yZTtcbiAgICAgIHRoaXMuc3RvcmVDbGVhbnVwID0gc3RvcmVSZXN1bHQuY2xlYW51cDtcbiAgICAgIHRoaXMuY29udGV4dC5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFVJQWN0aW9ucy5DUkVBVEVfQ09NUE9ORU5UX1NUQVRFLFxuICAgICAgICBwYXlsb2FkOiB7IGNvbmZpZzogQ29uZmlnLCBwcm9wczogdGhpcy5wcm9wcywgc3RvcmU6IHRoaXMuc3RvcmUsIGhhc1N0b3JlOiAhIUNvbmZpZy5jcmVhdGVTdG9yZSB9LFxuICAgICAgICBtZXRhOiB7IHJlZHV4RnJhY3RhbFRyaWdnZXJDb21wb25lbnQ6IHRoaXMuY29tcEtleSB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgY29uc3QgcGVyc2lzdCA9IHR5cGVvZiBDb25maWcucGVyc2lzdCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy5wZXJzaXN0KHRoaXMucHJvcHMsIHRoaXMuY29udGV4dCkgOiBDb25maWcucGVyc2lzdDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRleHQuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFVJQWN0aW9ucy5ERVNUUk9ZX0NPTVBPTkVOVF9TVEFURSxcbiAgICAgICAgICBwYXlsb2FkOiB7IHBlcnNpc3QsIGhhc1N0b3JlOiAhIUNvbmZpZy5jcmVhdGVTdG9yZSB9LFxuICAgICAgICAgIG1ldGE6IHsgcmVkdXhGcmFjdGFsVHJpZ2dlckNvbXBvbmVudDogdGhpcy5jb21wS2V5IH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnN0b3JlQ2xlYW51cCkge1xuICAgICAgICAgIHRoaXMuc3RvcmVDbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZSA9IG51bGw7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc3RvcmUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGNvbnNvbGUud2FybihgUHJvcHMgbmFtZWQgJ3N0b3JlJyBjYW5ub3QgYmUgcGFzc2VkIHRvIHJlZHV4LWZyYWN0YWwgJ2xvY2FsJ1xuICAgICAgICAgICAgICAgIEhPQyB3aXRoIGtleSAke3RoaXMuY29tcEtleX0gc2luY2UgaXQncyBhIHJlc2VydmVkIHByb3BgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZSAmJiA8Q29ubmVjdENvbXBcbiAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgc3RvcmU9e3RoaXMuc3RvcmV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgfVxuICAgIH1cblxuICBVSS5jb250ZXh0VHlwZXMgPSBPYmplY3QuYXNzaWduKHt9LCBDb21wb25lbnQuY29udGV4dFR5cGVzLCB7XG4gICAgc3RvcmU6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBzdWJzY3JpYmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBkaXNwYXRjaDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGdldFN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIH0pLFxuICB9KTtcbiAgVUkucHJvcFR5cGVzID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgIHN0b3JlOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgc3Vic2NyaWJlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZGlzcGF0Y2g6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBnZXRTdGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IGRpc3BsYXlOYW1lID0gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuICBVSS5kaXNwbGF5TmFtZSA9IGBsb2NhbCgke2Rpc3BsYXlOYW1lfSlgO1xuICByZXR1cm4gaG9pc3ROb25SZWFjdFN0YXRpY3MoVUksIENvbXBvbmVudCk7XG59O1xuIl19