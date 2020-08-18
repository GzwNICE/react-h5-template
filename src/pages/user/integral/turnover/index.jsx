/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import IntegralCard from '@/components/integralCard';
import Empty from '@/components/empty';
import PointsDetail from './points';
import Exchange from './exchange';
import intl from 'react-intl-universal';

import styles from './index.less';

class IntegralTurnover extends PureComponent {
  render() {
    // const { changeModal } = this.state;
    const tabs = [{ title: '积分明细' }, { title: '兑换记录' }];
    const a = true;
    return (
      <div className={styles.turnover}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          className={styles.navBar}
        >
          积分流水
        </NavBar>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor="#FF5209"
          tabBarInactiveTextColor="#333333"
          tabBarUnderlineStyle={{
            border: '2px solid #FF5209',
            width: '14%',
            marginLeft: '18%',
            borderRadius: '2px',
          }}
        >
          <div className={styles.tabsBox}>
            <PointsDetail />
          </div>
          <div className={styles.tabsBox}>
            <Exchange />
          </div>
        </Tabs>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(IntegralTurnover);
