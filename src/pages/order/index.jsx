import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { NavBar, Tabs } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import Blank from '@/components/blank';
import styles from './index.less'

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX')
    };
  }

  render() {
    const { IPhoneX } = this.state;
    const tabs = [
      { title: '全部', key: '1' },
      { title: '进行中', key: '2' },
      { title: '待评价', key: '3' },
      { title: '售后', key: '4' },
      { title: '已完成', key: '5' }
    ];
    return (
      <div className={styles.orderPage}>
        <NavBar className={styles.navbar}>订单</NavBar>
        <div className={`${styles.tabBox} ${IPhoneX === 'true' ? `${styles.tabBoxIPhone}` : null}`} >
          <Tabs tabs={tabs} tabBarActiveTextColor="#333333" tabBarInactiveTextColor="#333333" tabBarUnderlineStyle={{ height: 4, width: 24, marginLeft: '6.5%', backgroundImage: 'linear-gradient(135deg, #4DAAF5 0%, #3CEDC2 100%)', border: 'none', borderRadius: '2px' }}>
            <Blank data='1111123123' />
          </Tabs>
        </div>
        <TabBarBox selectedTab="order" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
