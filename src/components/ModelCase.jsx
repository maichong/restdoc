/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/18.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import CaseDataDisplay from './CaseDataDisplay';

type Props = {
  className?: string,
  type?: string, //展示的数据类型如User$Base为scope类型
  title: string,
  value: Array<Object>
  // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
  // model为Object、Tuple、Scope的字段
};

export default class ModelCase extends React.Component<Props> {
  static defaultProps = {
    className: '',
    type: 'object'
  };

  render() {
    let {
      className, value, title, type
    } = this.props;
    if (!value || !value.length) return <div />;
    // console.log('======ModelCase');
    return (
      <div className={className ? className + ' model-case' : 'model-case'}>
        <div className="model-case-title">{title}</div>
        <div className="case-data-panel">
          <CaseDataDisplay type={type || ''} value={value} />
        </div>
      </div>
    );
  }
}
