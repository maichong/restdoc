'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BaseInfo = require('./components/BaseInfo');

var _BaseInfo2 = _interopRequireDefault(_BaseInfo);

var _FieldDisplay = require('./components/FieldDisplay');

var _FieldDisplay2 = _interopRequireDefault(_FieldDisplay);

var _ResponseCase = require('./components/ResponseCase');

var _ResponseCase2 = _interopRequireDefault(_ResponseCase);

var _RequestCase = require('./components/RequestCase');

var _RequestCase2 = _interopRequireDefault(_RequestCase);

var _RouteMethodDisplay = require('./components/RouteMethodDisplay');

var _RouteMethodDisplay2 = _interopRequireDefault(_RouteMethodDisplay);

var _fieldManage = require('./utils/field-manage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

class ApiRoute extends _react2.default.Component {

  getMarkEle() {
    let { value } = this.props;
    let stability = '';
    if (value.stability) {
      switch (value.stability) {
        case 'Stable':
          {
            stability = '稳定版';
            break;
          }
        case 'Deprecated':
          {
            stability = '过时版';
            break;
          }
        case 'Experimental':
          {
            stability = '实验版';
            break;
          }
        case 'Bata':
          {
            stability = 'Bata版';
            break;
          }
        case 'Alpha':
          {
            stability = 'Alpha版';
            break;
          }
        default:
          stability = '';
      }
    }
    return _react2.default.createElement(
      'span',
      null,
      stability ? _react2.default.createElement(
        'span',
        { className: 'stability' },
        ' ',
        stability,
        ' '
      ) : null,
      value.since ? _react2.default.createElement(
        'span',
        { className: 'since' },
        'Since\xA0\xA0',
        value.since,
        ' '
      ) : null,
      value.state ? _react2.default.createElement(
        'span',
        { className: 'state' },
        value.state,
        ' '
      ) : null
    );
  }

  render() {
    let { value, relation } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let markEle = this.getMarkEle();
    let fields = (0, _fieldManage.getFieldsOfModel)(value, relation);
    let fieldsRoutePath = (0, _fieldManage.filterRouteFieldsByType)('route:path', fields);
    let fieldsRouteQuery = (0, _fieldManage.filterRouteFieldsByType)('route:query', fields);
    let fieldsRouteBody = (0, _fieldManage.getFieldsOfBody)(value, relation);
    let responseArr = (0, _fieldManage.getFieldsOfResponse)(value, relation);
    responseArr = _lodash2.default.orderBy(responseArr, ['code'], ['asc']);
    // console.log('======ApiRoute');
    return _react2.default.createElement(
      'div',
      { className: className, id: 'route-' + value.id },
      _react2.default.createElement(
        'div',
        { className: 'panel-left' },
        _react2.default.createElement(_BaseInfo2.default, { markEle: markEle, isSub: !0, title: value.title, desc: value.desc }),
        _react2.default.createElement(
          'div',
          { className: 'padding-top' },
          _react2.default.createElement(
            'div',
            { className: 'title-left-border' },
            '\u63A5\u53E3\u5730\u5740'
          ),
          _react2.default.createElement(
            'div',
            { className: 'method-path' },
            _react2.default.createElement(
              'span',
              { className: 'padding-sm-right' },
              value.method
            ),
            _react2.default.createElement(
              'span',
              { className: 'padding-sm' },
              value.path
            )
          )
        ),
        fieldsRoutePath && fieldsRoutePath.length ? _react2.default.createElement(
          'div',
          { className: 'padding-top' },
          _react2.default.createElement(
            'div',
            { className: 'title-left-border' },
            '\u8DEF\u5F84\u53C2\u6570'
          ),
          _react2.default.createElement(_FieldDisplay2.default, { baseUrl: this.props.baseUrl, value: fieldsRoutePath })
        ) : null,
        fieldsRouteQuery && fieldsRouteQuery.length ? _react2.default.createElement(
          'div',
          { className: 'padding-top' },
          _react2.default.createElement(
            'div',
            { className: 'title-left-border' },
            '\u67E5\u8BE2\u53C2\u6570'
          ),
          _react2.default.createElement(_FieldDisplay2.default, { baseUrl: this.props.baseUrl, value: fieldsRouteQuery })
        ) : null,
        fieldsRouteBody && fieldsRouteBody.fields && fieldsRouteBody.fields.length ? _react2.default.createElement(
          'div',
          { className: 'padding-top' },
          _react2.default.createElement(
            'div',
            { className: 'title-left-border' },
            'Body\u53C2\u6570'
          ),
          fieldsRouteBody.desc ? _react2.default.createElement(
            'div',
            { className: 'desc padding-v-sm' },
            fieldsRouteBody.desc
          ) : null,
          _react2.default.createElement(_FieldDisplay2.default, {
            type: value.bodyType,
            baseUrl: this.props.baseUrl,
            className: 'flex',
            value: fieldsRouteBody.fields
          })
        ) : null,
        responseArr && responseArr.length ? _react2.default.createElement(
          'div',
          { className: 'padding-top' },
          _react2.default.createElement(
            'div',
            { className: 'title-left-border' },
            '\u8FD4\u56DE\u7ED3\u679C'
          ),
          _lodash2.default.map(responseArr, r => _react2.default.createElement(
            'div',
            { className: 'padding-top', key: r.id },
            _react2.default.createElement(
              'div',
              {
                className: _lodash2.default.isNumber(r.code) && r.code < 400 && r.code >= 200 ? 'code-desc text-success' : 'code-desc text-danger'
              },
              _react2.default.createElement(
                'span',
                { className: 'padding-right-sm' },
                r.code
              ),
              _react2.default.createElement(
                'span',
                null,
                r.desc
              )
            ),
            _react2.default.createElement(_FieldDisplay2.default, { type: r.type, baseUrl: this.props.baseUrl, className: 'flex', value: r.fields })
          ))
        ) : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'panel-right text-center' },
        _react2.default.createElement(_RouteMethodDisplay2.default, { method: value.method, url: value.path }),
        _react2.default.createElement(_RequestCase2.default, { title: '\u8BF7\u6C42\u793A\u4F8B', value: fieldsRouteBody || { fieldType: '', modelType: '', fields: [] } }),
        _react2.default.createElement(_ResponseCase2.default, { title: '\u54CD\u5E94\u793A\u4F8B', value: responseArr })
      )
    );
  }
}
exports.default = ApiRoute;
ApiRoute.defaultProps = {
  className: '',
  baseUrl: ''
};