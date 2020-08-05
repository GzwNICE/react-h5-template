/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import FriendHistory from '@/pages/user/invitation/reward/friendhistory';
import RewardHistory from '@/pages/user/invitation/reward/rewardHistory';

import intl from 'react-intl-universal';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import styles from './index.less';

let tabs = [];
class Reward extends PureComponent {
  constructor(props) {
    super(props);
    tabs = [
      { title: intl.get('user.str_invited_record'), type: 'friend' },
      { title: intl.get('user.str_rewards_record'), type: 'reward' },
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
          {intl.get('user.str_my_reward')}
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
          <FriendHistory  />
          <RewardHistory  />
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
