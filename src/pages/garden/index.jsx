import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { NavBar, Tabs } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import styles from './index.less';

export class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX')
    };
  }

  render() {
    const { IPhoneX } = this.state;
    const tabs = [
      { title: '推荐', key: '1' },
      { title: '新人', key: '2' },
      { title: '人气', key: '3' },
      { title: '价位', key: '4' },
    ];
    return (
      <div className={styles.gardenPage}>
        <NavBar className={styles.navbar}>茶园</NavBar>
        <div className={`${styles.tabBox} ${IPhoneX === 'true' ? `${styles.tabBoxIPhone}` : null}`} >
          <Tabs tabs={tabs} tabBarActiveTextColor="#333333" tabBarInactiveTextColor="#333333" tabBarUnderlineStyle={{ height: 4, width: 24, marginLeft: '38px', backgroundImage: 'linear-gradient(135deg, #4DAAF5 0%, #3CEDC2 100%)', border: 'none', borderRadius: '2px' }}>
            <div key="1">1</div>
            <div key="2">2</div>
            <div key="3">3</div>
            <div key="4">4</div>
          </Tabs>
        </div>
        <TabBarBox selectedTab="garden" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Garden);
