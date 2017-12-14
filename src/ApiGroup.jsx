// @flow

import React from 'react';
import BaseInfo from './components/BaseInfo';

type Props = {
  className?: string,
  value: Object
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
    return (
      <div className={className} id={'group-' + value.id}>
        <BaseInfo className="panel-left" title={value.title} desc={value.desc} />
        <div className="panel-right text-center" />
      </div>
    );
  }
}
