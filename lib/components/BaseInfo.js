'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

class BaseInfo extends _react2.default.Component {

  render() {
    let {
      title, desc, share, markEle
    } = this.props;
    let className = 'base-info';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (this.props.isSub) {
      className += ' sub-info';
    }
    // console.log('======BaseInfo');
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'title' },
        title,
        share ? _react2.default.createElement(
          'span',
          { className: 'text-danger' },
          '*'
        ) : null
      ),
      markEle ? _react2.default.createElement(
        'div',
        { className: 'mark' },
        markEle
      ) : null,
      desc ? _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: (0, _marked2.default)(desc) }, className: 'desc' }) : null
    );
  }
}
exports.default = BaseInfo;
BaseInfo.defaultProps = {
  className: '',
  isSub: false,
  share: false,
  markEle: null
};