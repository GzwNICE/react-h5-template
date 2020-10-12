/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import WaitOpen from '@/components/waitOpen';
import Win from '@/components/win';
import NoWin from '@/components/nowin';
import Empty from '@/components/empty';
import queryString from 'query-string';
import { NavBar, Icon, Tabs, Button } from 'antd-mobile';
import styles from './index.less';

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type
    };
  }

  componentDidMount() {
    const isLogin = localStorage.getItem('mobile');
    if (!isLogin) {
      this.props.history.push(`/login`);
      return;
    }
  }

  handlerPush = url => {
    this.props.history.push('/home');
  };

  render() {
    const tabs2 = [
      { title: '全部', sub: '1' },
      { title: '待付款', sub: '2' },
      { title: '待发货', sub: '3' },
      { title: '待收货', sub: '4' },
      { title: '已完成', sub: '5' },
    ];
    const { type } = this.state;
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          我的订单
        </NavBar>
        <Tabs
          tabs={tabs2}
          initialPage={Number(type)}
          tabBarUnderlineStyle="#0091FF"
          tabBarActiveTextColor="#0091FF"
          tabBarUnderlineStyle={{
            border: '2px solid #0091FF',
            width: '10%',
            marginLeft: '5%',
            borderRadius: '2px',
          }}
          tabBarInactiveTextColor="#333333"
        >
          <div>
            <Empty text="暂时还没有订单" />
            <Button type="primary" className={styles.goHome} onClick={this.handlerPush}>去首页</Button>
          </div>
        </Tabs>
      </div>
    );
  }
}
export default OrderList;
