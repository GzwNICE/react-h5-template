import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { NavBar, Grid, Carousel, Flex } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import Card from '@/components/card'
import banner01 from '@/assets/images/banner01.png';
import banner02 from '@/assets/images/banner02.png';
import banner03 from '@/assets/images/banner03.png';
import styles from './index.less';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX')
    };
  }

  render() {
    const { IPhoneX } = this.state;
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
      },
    ];
    const bannerData = [{img: banner01 , id: 1}, {img: banner02 , id: 2}, {img: banner03 , id: 3}]
    return (
      <div className={styles.homePage}>
        <NavBar className={styles.navbar}>首页</NavBar>
        <Carousel
          autoplay
          autoplayInterval={2000}
          infinite
          className={styles.bannerBox}
        >
          {bannerData.map(val => {
            return <div key={val.id} className={styles.item}><img src={val.img} alt="banner" /></div>;
          })}
        </Carousel>
        <div className={styles.classBox}>
          <Grid data={gridData} columnNum={5} hasLine={false} />
        </div>
        <div className={styles.content} style={{ marginBottom: IPhoneX === 'true' ? '64px' : '50px'}}>
          <div className={styles.titleBox}>
            <div className={styles.ll}>
              <span className={styles.ss}></span>
              <span className={styles.text}>推荐</span>
            </div>
            <div className={styles.rr}>查看更多</div>
          </div>
          <Flex wrap="wrap" justify="between" className={styles.recommend}>
            <Card type='home' />
          </Flex>
          <div className={styles.titleBox}>
            <div className={styles.ll}>
              <span className={styles.ss}></span>
              <span className={styles.text}>人气</span>
            </div>
            <div className={styles.rr}>查看更多</div>
          </div>
          <Flex wrap="wrap" justify="between" className={styles.recommend}>
            <Card type='home' />
          </Flex>
          <div className={styles.look}>查看全部</div>
        </div>
        <TabBarBox selectedTab="homePage" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
