import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Grid } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import avatar from '@/assets/images/avatar.png';
import crown from '@/assets/images/crown.png';
import styles from './index.less'


export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX')
    };
  }

  render() {
    const gridData = [
      {
        icon: require('@/assets/images/wallet.png'),
        text: '钱包',
      },
      {
        icon: require('@/assets/images/VIP.png'),
        text: '会员',
      },
      {
        icon: require('@/assets/images/bill.png'),
        text: '账单',
      }
    ];
    return (
      <div className={styles.userPage}>
        <div className={styles.header}>
          <img src={avatar} alt="" className={styles.avatar} />
          <span className={styles.username}>098****4111</span>
          <span className={styles.code}>推广码：1HE6H</span>
        </div>
        <div className={styles.gridBox}>
          <Grid data={gridData} columnNum={3} hasLine={false} itemStyle={{ height: 80 }} activeStyle={false} />
          <div className={styles.vipBox}>
            <div className={styles.ll}>
              <img src={crown} alt=""/>
              <span className={styles.kt}>开通会员</span>
              <span className={styles.dg}>免出行费(定金) 50元</span>
            </div>
            <span className={styles.bt}>立即开通</span>
          </div>
        </div>
        <TabBarBox selectedTab="user" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
