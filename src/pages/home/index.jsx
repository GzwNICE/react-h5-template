/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 首页
import React, { PureComponent } from 'react';
import { Carousel, Grid, Toast, Modal, Icon } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Cookies from 'js-cookie';
import HotList from '@/pages/hotList';
import TabBarBox from '@/components/tabBar';
import quanBu from '@/assets/images/quanbu@3x.png';
import dingdan from '@/assets/images/dingdan@3x.png';
import yaoqing from '@/assets/images/yaoqing@3x.png';
import bangzhu from '@/assets/images/bangzhu@3x.png';
import yijian from '@/assets/images/yijian@3x.png';
import banner01 from '@/assets/images/banner01.png';
import banner02 from '@/assets/images/banner2.jpg';
import banner03 from '@/assets/images/banner3.jpg';
import banner04 from '@/assets/images/banner1.jpg';
import titlePng from '@/assets/images/title@3x.png';
import pic_banner from '@/assets/images/pic_banner@2x.png';
import styles from './index.less';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      openH: 0,
      openM: 0,
      openS: 0,
    };
  }

  componentDidMount() {
    this.countFun()
  }

  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + '/' + m + '/' + d;
  }

  countFun = () => {
    let endTime = this.getDateStr(1);
    let end_time = new Date(`${endTime} 00:00:00`).getTime();
    let now_time = new Date().getTime();
    var remaining = end_time - now_time;
    let timer = setInterval(() => {
      //防止出现负数
      if (remaining > 1000) {
        remaining -= 1000;
        let hour = Math.floor((remaining / 1000 / 3600) % 24);
        let minute = Math.floor((remaining / 1000 / 60) % 60);
        let second = Math.floor((remaining / 1000) % 60);
        this.setState({
          openH: hour < 10 ? '0' + hour : hour,
          openM: minute < 10 ? '0' + minute : minute,
          openS: second < 10 ? '0' + second : second,
        });
      }
    }, 1000);
  };

  handlerGrid = url => {
    if (url === '/commodity') {
      this.props.history.push('/commodity');
    } else {
      const token = localStorage.getItem('mobile');
      if (token) {
        this.props.history.push(url);
      } else {
        this.props.history.push(`/login`);
      }
    }
  };

  render() {
    const { IPhoneX, openH, openM, openS } = this.state;
    const bannerList = [
      {
        id: 2,
        imgURL: banner02,
      },
      {
        id: 3,
        imgURL: banner03,
      },
      {
        id: 4,
        imgURL: banner04,
      },
    ];
    const classData = [
      {
        title: '全部商品',
        imgURL: quanBu,
        jumpUrl: '/commodity',
      },
      {
        title: '我的订单',
        imgURL: dingdan,
        jumpUrl: '/order/0',
      },
      {
        title: '邀请好友',
        imgURL: yaoqing,
        jumpUrl: '/invitation',
      },
      {
        title: '帮助中心',
        imgURL: bangzhu,
        jumpUrl: '/help',
      },
      {
        title: '收集意见',
        imgURL: yijian,
        jumpUrl: '/feedback',
      },
    ];
    return (
      <div className={styles.home}>
        <div className={styles.bgColor}></div>
        <Carousel
          autoplay
          infinite
          className={styles.banner}
          autoplayInterval={15000}
          dotActiveStyle={{ background: '#FF5209' }}
        >
          {bannerList.map(val => (
            <a
              key={val.id}
              href={val.jumpUrl}
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <img
                src={val.imgURL}
                alt=""
                style={{
                  width: '100%',
                  height: '130px',
                  borderRadius: '6px',
                  verticalAlign: 'center',
                }}
              />
            </a>
          ))}
        </Carousel>
        {classData.length > 0 ? ( // 分类导航
          <div className={styles.classification}>
            <Grid
              data={classData}
              columnNum={5}
              hasLine={false}
              activeStyle={false}
              renderItem={item => (
                <div onClick={() => this.handlerGrid(item.jumpUrl)}>
                  <img src={item.imgURL} className={styles.classImg} alt="" />
                  <div className={styles.tips}>{item.title}</div>
                </div>
              )}
            />
          </div>
        ) : null}
        <div className={styles.promotion}>
          <img src={banner01} alt="" />
        </div>
        <div className={styles.msBox}>
          <img src={titlePng} alt="" />
          <div className={styles.openTips}>
            <span>倒计时</span>
            <span className={styles.time}>{openH}</span>:<span className={styles.time}>{openM}</span>:
            <span className={styles.time}>{openS}</span>
          </div>
        </div>
        <div className={styles.tabs} ref={el => (this.hlv = el)}>
          <HotList showOff="home" />
        </div>
        <div
          className={`${styles.tBar} ${IPhoneX === 'true' ? `${styles.tBarIPhone}` : null}`}
          ref={this.myRef}
        >
          <TabBarBox selectedTab="homePage" />
        </div>
      </div>
    );
  }
}

export default Home;
