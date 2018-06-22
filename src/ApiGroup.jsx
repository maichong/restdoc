/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import type { Group } from 'restdoc';
import BaseInfo from './components/BaseInfo';

type Props = {
  className?: string,
  value: Group
};

export default class ApiGroup extends React.Component<Props> {
  static defaultProps = {
    className: ''
  };

  render() {
    let { value } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    // console.log('======ApiGroup');
    return (
      <div className={className} id={'group-' + value.id}>
        <BaseInfo className="panel-left" title={value.title} desc={value.desc} />
        <div className="panel-right text-center" />
      </div>
    );
  }
}
