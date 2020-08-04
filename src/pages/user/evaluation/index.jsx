/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import History from '@/pages/user/invitation/reward/history';
import intl from 'react-intl-universal';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import styles from './index.less';

let tabs = [];
class Reward extends PureComponent {
  constructor(props) {
    super(props);
    tabs = [
      { title: '未晒单' },
      { title: '已晒单' },
    ];
  }
  render() {
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          我的晒单
        </NavBar>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor="#FF5209"
          tabBarUnderlineStyle={{
            border: '2px solid #FF5209',
            width: '20%',
            marginLeft: '15%',
            borderRadius: '2px',
          }}
          tabBarInactiveTextColor="#333333"
        >
          <History type="wait" />
          <History type="owner" />
        </Tabs>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Reward);
