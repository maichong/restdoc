// @flow

import React from 'react';
import BaseInfo from './components/BaseInfo';
import FieldDisplay from './components/FieldDisplay';
import ModelCase from './components/ModelCase';
import { getFieldsOfModel } from './utils/field-manage';

type Props = {
  baseUrl?: string,
  className?: string,
  value: Object,
  relation: {
    objects: Array<Object>,
    tuples: Array<Object>,
    fields: Array<Object>,
    scopes: Array<Object>
  }
};

export default class ApiTuple extends React.Component<Props> {
  static defaultProps = {
    className: '',
    baseUrl: ''
  };

  render() {
    let { value, relation } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let fields = getFieldsOfModel(value, relation);
    return (
      <div
        className={className}
        id={'tuple-' + value.id}
      >
        <div className="panel-left">
          <BaseInfo
            title={'[' + value.title + ']'}
            isSub={!0}
            share={value.share}
            desc={value.desc}
          />
          {
            fields && fields.length ?
              <div className="tuple">
                <div className="padding-sm-v">属性</div>
                <FieldDisplay baseUrl={this.props.baseUrl} value={fields} />
              </div> : null
          }
        </div>
        <div className="panel-right text-center">
          <ModelCase type="tuple" title="示例展示" value={fields} />
        </div>
      </div>
    );
  }
}
