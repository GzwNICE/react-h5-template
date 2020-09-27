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
      { title: '售后申请', sub: '1' },
      { title: '处理中', sub: '2' },
      { title: '售后评价', sub: '3' },
      { title: '申请记录', sub: '4' }
    ];
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF1C1C' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          退换/售后
        </NavBar>
        <Tabs
          tabs={tabs2}
          initialPage={0}
          tabBarUnderlineStyle="#FF1C1C"
          tabBarActiveTextColor="#FF1C1C"
          tabBarUnderlineStyle={{
            border: '2px solid #FF1C1C',
            width: '10%',
            marginLeft: '7%',
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


export default Reward;
