import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, Grid } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import banner01 from "@/assets/images/banner01.png";
import styles from './index.less'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const gridData = [
      {
        icon: require('@/assets/images/yuYue.png'),
        text: '预约教程',
      },
      {
        icon: require('@/assets/images/zhaoMu.png'),
        text: '技师招募',
      },
      {
        icon: require('@/assets/images/jiSu.png'),
        text: '极速预约',
      },
      {
        icon: require('@/assets/images/yaoQing.png'),
        text: '邀请有奖',
      },
      {
        icon: require('@/assets/images/opinions.png'),
        text: '意见收集',
      }
    ]
    return (
      <div className={styles.homePage}>
        <NavBar
          className={styles.navbar}
        >
          首页
        </NavBar>
        <div className={styles.banner}>
          <img src={banner01} alt="banner"/>
        </div>
        <div className={styles.classBox}>
          <Grid data={gridData} columnNum={5} />
        </div>
        <TabBarBox selectedTab="homePage" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
