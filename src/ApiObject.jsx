// @flow

import _ from 'lodash';
import React from 'react';
import BaseInfo from './components/BaseInfo';
import FieldDisplay from './components/FieldDisplay';
import ModelCase from './components/ModelCase';
import ScopeDisplay from './components/ScopeDisplay';
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

export default class ApiObject extends React.Component<Props> {
  static defaultProps = {
    className: '',
    baseUrl: ''
  };

  getScopes() {
    let { value, relation } = this.props;
    return _.filter(relation.scopes, (s) => s.object === value.id);
  }

  render() {
    let { value, relation } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let fields = getFieldsOfModel(value, relation);
    let scopes = this.getScopes();
    return (
      <div className={className} id={'object-' + value.id}>
        <div className="panel-left">
          <BaseInfo isSub={!0} title={value.title} share={value.share} desc={value.desc} />
          {
            fields && fields.length ?
              <div className="object">
                <div className="padding-sm-v">属性</div>
                <FieldDisplay baseUrl={this.props.baseUrl} value={fields} />
              </div> : null
          }
          {
            scopes && scopes.length ?
              <ScopeDisplay
                value={Object.assign({}, value, { scopes, fields })}
              /> : null
          }
        </div>
        <div className="panel-right text-center">
          <ModelCase title="示例展示" type="object" value={fields} />
        </div>
      </div>
    );
  }
}
