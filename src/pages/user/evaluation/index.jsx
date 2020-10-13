/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import Empty from '@/components/empty';
import { NavBar, Icon, Tabs, Button } from 'antd-mobile';
import styles from './index.less';

class Reward extends PureComponent {
  constructor(props) {
    super(props);

  }
  handlerPush = url => {
    this.props.history.push('/home');
  };
  render() {
    const tabs2 = [
      { title: '未评价', sub: '1' },
      { title: '已评价', sub: '2' }
    ];
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          我的评价
        </NavBar>
        <Tabs
          tabs={tabs2}
          initialPage={0}
          tabBarUnderlineStyle="#0091FF"
          tabBarActiveTextColor="#0091FF"
          tabBarUnderlineStyle={{
            border: '2px solid #0091FF',
            width: '12%',
            marginLeft: '19%',
            borderRadius: '2px',
          }}
          tabBarInactiveTextColor="#333333"
        >
          <div>
            <Empty text="空空如也" />
            <Button type="primary" className={styles.goHome} onClick={this.handlerPush}>去首页</Button>
          </div>
        </Tabs>
      </div>
    );
  }
}


export default Reward;
