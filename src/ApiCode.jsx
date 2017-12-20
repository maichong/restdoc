/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import type {
  Code
} from 'restdoc';

type Props = {
  className?: string;
  value: Array<Code>;
};

export default class ApiCode extends React.Component<Props> {
  static defaultProps = {
    className: ''
  };
  render() {
    let { value } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    // console.log('======ApiCode');
    return (
      <div className={className} id="code">
        <div className="panel-left">
          <div className="title">状态码</div>
          <table className="table table-bordered">
            <tbody className="desc">
              <tr>
                <td className="text-center" width="100">状态码</td>
                <td className="text-center" width="200">描述</td>
              </tr>
              {
                _.map(value, (v) => (
                  <tr key={v.id}>
                    <td className="text-center">
                      <span className="code-title">{v.code}</span>
                    </td>
                    <td>
                      {v.desc}
                    </td>
                  </tr>))
              }
            </tbody>
          </table>
        </div>
        <div className="panel-right text-center" />
      </div>
    );
  }
}
