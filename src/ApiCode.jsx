// @flow

import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

type Props = {
  className?: string;
  value: Array<Object>;
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
    return (
      <div className={className} id="code">
        <div className="panel-left">
          <div className="title">状态码</div>
          <Table className="table table-bordered" responsive>
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
          </Table>
        </div>
        <div className="panel-right text-center" />
      </div>
    );
  }
}
