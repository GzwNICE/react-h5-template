/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import intl from 'react-intl-universal';
import PointsDetail from './points';
import Exchange from './exchange';

import styles from './index.less';

class IntegralTurnover extends PureComponent {
  render() {
    const tabs = [
      { title: intl.get('integral.pointsDetails') },
      { title: intl.get('integral.exchangeRecord') },
    ];
    return (
      <div className={styles.turnover}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          className={styles.navBar}
        >
          {intl.get('integral.turnover')}
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

export default IntegralTurnover;
