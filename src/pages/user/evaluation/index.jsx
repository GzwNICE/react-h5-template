/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import NoShow from '@/pages/user/evaluation/noShow';
import Showing from '@/pages/user/evaluation/showing';

import intl from 'react-intl-universal';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import styles from './index.less';

let tabs = [];
class Reward extends PureComponent {
  constructor(props) {
    super(props);
    tabs = [
      { title: intl.get('user.str_me_unbask_single') },
      { title: intl.get('user.str_me_hasbask_single') },
    ];
  }

  handlerPush = url => {
    this.props.history.push(url);
  };
  render() {
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.str_me_bask_single')}
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
          <NoShow type="wait" push={this.handlerPush} />
          <Showing type="owner" push={this.handlerPush} />
        </Tabs>
      </div>
    );
  }
}


export default Reward;
