/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/25.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import type {
  Group,
  Route,
  Description,
  ObjectModel,
  Tuple,
  Code,
  Field,
  Scope,
  Response
} from 'restdoc';
import ApiMenu from './ApiMenu';
import ApiInfoWrapper from './ApiInfoWrapper';
import { setFieldMaps } from './utils/field-manage';

type Props = {
  groups: Array<Group>,
  routes: Array<Route>,
  descriptions: Array<Description>,
  objects: Array<ObjectModel>,
  tuples: Array<Tuple>,
  codes: Array<Code>,
  fields: Array<Field>,
  scopes: Array<Scope>,
  responses: Array<Response>,
  menuBaseUrl: string,
  className?: string,
  isDownload?: boolean,
  callBackComponentUpdate?: Function|null, //报告父级组件已更新，等待父级判断是否还需要更新
  isShouldComponentUpdate?: boolean //是否需要更新组件 shouldComponentUpdate
};

type State = {
  mapGroup: Object,
  objects: Array<ObjectModel>,
  tuples: Array<Tuple>,
}

export default class Index extends React.Component<Props, State> {
  static defaultProps = {
    groups: [],
    routes: [],
    descriptions: [],
    objects: [],
    tuples: [],
    codes: [],
    fields: [],
    scopes: [],
    responses: [],
    className: '',
    menuBaseUrl: '',
    isDownload: false,
    callBackComponentUpdate: null,
    isShouldComponentUpdate: undefined //默认不定义，callBackComponentUpdate, isShouldComponentUpdate同时存在才有效
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      mapGroup: this.getMapGroup(props),
      objects: this.orderByTitle(this.props.objects),
      tuples: this.orderByTitle(this.props.tuples)
    };
    setFieldMaps(props.fields);
  }

  componentWillReceiveProps(nextProps: Props) {
    let { isShouldComponentUpdate, callBackComponentUpdate } = nextProps;
    //父级控制更新
    if (typeof callBackComponentUpdate === 'function' && !callBackComponentUpdate
      && typeof isShouldComponentUpdate !== 'undefined') {
      if (isShouldComponentUpdate) {
        if (!_.isEqual(this.props.fields, nextProps.fields)) {
          setFieldMaps(nextProps.fields);
        }
        if (!_.isEqual(this.props.groups, nextProps.groups) || !_.isEqual(this.props.routes, nextProps.routes)) {
          this.setState({ mapGroup: this.getMapGroup(nextProps) });
        }
        if (!_.isEqual(this.props.objects, nextProps.objects)) {
          this.setState({ objects: this.orderByTitle(nextProps.objects) });
        }
        if (!_.isEqual(this.props.tuples, nextProps.tuples)) {
          this.setState({ tuples: this.orderByTitle(nextProps.tuples) });
        }
      }
      return;
    }
    //父级没控制更新，自行判断更新
    if (!_.isEqual(this.props.fields, nextProps.fields)) {
      setFieldMaps(nextProps.fields);
    }
    if (!_.isEqual(this.props.groups, nextProps.groups) ||
      !_.isEqual(this.props.routes, nextProps.routes)) {
      this.setState({ mapGroup: this.getMapGroup(nextProps) });
    }
    if (!_.isEqual(this.props.objects, nextProps.objects)) {
      this.setState({ objects: this.orderByTitle(nextProps.objects) });
    }
    if (!_.isEqual(this.props.tuples, nextProps.tuples)) {
      this.setState({ tuples: this.orderByTitle(nextProps.tuples) });
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    let { isShouldComponentUpdate, callBackComponentUpdate } = this.props;
    //父级控制更新
    if (typeof callBackComponentUpdate === 'function' && !callBackComponentUpdate
      && typeof isShouldComponentUpdate !== 'undefined') {
      if (isShouldComponentUpdate !== nextProps.isShouldComponentUpdate) {
        //更新父级
        callBackComponentUpdate();
      }
      return isShouldComponentUpdate;
    }
    //父级没控制更新，自行判断更新
    if (!_.isEqual(this.props.groups, nextProps.groups) ||
      !_.isEqual(this.props.routes, nextProps.routes) ||
      !_.isEqual(this.props.descriptions, nextProps.descriptions) ||
      !_.isEqual(this.props.fields, nextProps.fields) ||
      !_.isEqual(this.props.objects, nextProps.objects) ||
      !_.isEqual(this.props.tuples, nextProps.tuples) ||
      !_.isEqual(this.props.codes, nextProps.codes) ||
      !_.isEqual(this.props.scopes, nextProps.scopes) ||
      !_.isEqual(this.props.responses, nextProps.responses)) {
      return true;
    }
    return false;
  }

  //初始化分组
  getMapGroup = (props:Props):Object => {
    let { groups, routes } = props;
    let mapGroup = {};
    if (groups) {
      _.map(groups, (group) => {
        mapGroup[group.id] = Object.assign({}, group, { routes: [] });
      });
      _.map(routes, (route) => {
        if (route.group && mapGroup[route.group]) {
          mapGroup[route.group].routes.push(route);
        }
      });
    }
    return mapGroup;
  };

  //按title排序
  orderByTitle = (models: Array<Object>): Array<Object> => _.orderBy(models, ['title']);

  render() {
    let className = 'api-view';
    if (this.props.className) {
      className += (' ' + this.props.className);
    }
    // console.log('======Index');
    return (
      <div className={className}>
        <ApiMenu
          className="scrollbar-v-xs"
          isDownload={this.props.isDownload}
          baseUrl={this.props.menuBaseUrl}
          mapGroup={this.state.mapGroup}
          descriptions={this.props.descriptions}
          codes={this.props.codes}
          tuples={this.state.tuples}
          objects={this.state.objects}
        />
        <ApiInfoWrapper
          baseUrl={this.props.menuBaseUrl}
          mapGroup={this.state.mapGroup}
          descriptions={this.props.descriptions}
          codes={this.props.codes}
          tuples={this.state.tuples}
          objects={this.state.objects}
          scopes={this.props.scopes}
          fields={this.props.fields}
          responses={this.props.responses}
        />
      </div>
    );
  }
}
