/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 首页
import React, { PureComponent } from 'react';
import { Carousel, Grid, Toast, Modal, Icon } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { request } from '@/utils/request';
import Cookies from 'js-cookie';
import HotList from '@/pages/hotList';
import TabBarBox from '@/components/tabBar';
import quanBu from '@/assets/images/quanbu@3x.png';
import dingdan from '@/assets/images/dingdan@3x.png';
import yaoqing from '@/assets/images/yaoqing@3x.png';
import bangzhu from '@/assets/images/bangzhu@3x.png';
import yijian from '@/assets/images/yijian@3x.png';
import banner02 from '@/assets/images/banner2.png';
import notice from '@/assets/images/ic_notice@2x.png';
import titlePng from '@/assets/images/title@3x.png';
import pic_banner from '@/assets/images/pic_banner@2x.png';
import queryString from 'query-string';
import styles from './index.less';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  componentDidMount() {
    const AppId = queryString.parse(window.location.search).channelCode;
    AppId ? localStorage.setItem('AppId', AppId) : null;

    const mobileDevice = queryString.parse(window.location.search).mobileDevice;
    mobileDevice ? localStorage.setItem('mobileDevice', mobileDevice) : null;

    request('/v1/active_log.php', {
      method: 'post',
      data: { mobile: localStorage.getItem('mobile') },
    });
  }

  handlerGrid = url => {
    if (url === '/commodity') {
      this.props.history.push('/commodity');
    } else {
      const token = localStorage.getItem('mobile');
      if (token) {
        this.props.history.push(url);
      } else {
        this.props.history.push(`/login?redirect=${this.props.history.location.pathname}`);
      }
    }
  };

  render() {
    const { IPhoneX } = this.state;
    const winnerList = [
      '恭喜134****1236  成为季卡会员；',
      '恭喜131****9970 成为月卡会员；',
      '恭喜139****3537  成为周卡会员；',
      '恭喜188****6643  成为日卡会员；',
      '恭喜186****5750  成为季卡会员；',
      '恭喜130****4491  成为月卡会员；',
      '恭喜136****9075  成为季卡会员；',
      '恭喜138****5758  成为月卡会员；',
      '恭喜135****6201  成为季卡会员；',
      '恭喜133****7939  成为月卡会员；',
      '恭喜134****1016  成为季卡会员；',
    ];
    const classData = [
      {
        title: '全部商品',
        imgURL: quanBu,
        jumpUrl: '/commodity',
      },
      {
        title: '安装教程',
        imgURL: dingdan,
        jumpUrl: '/order',
      },
      {
        title: '邀请好友',
        imgURL: yaoqing,
        jumpUrl: `/invitation?t=${new Date().getTime()}`,
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
        <div className={styles.bannerBox}>
          <img src={banner02} alt="" />
        </div>
        <Carousel
          className="my-carousel"
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          autoplayInterval={2000}
          infinite
        >
          {winnerList.map(i => {
            return (
              <div className={styles.winnerItem} key={i}>
                <img src={notice} alt="" className={styles.leftIcon}/>
                <span>{i}</span>
              </div>
            );
          })}
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
        <div className={styles.allTitle}>
          <span className={styles.left}>棋牌专区</span>
          <span className={styles.right} onClick={() => this.handlerGrid('/commodity')}>查看更多</span>
        </div>
        <div className={styles.tabs} ref={el => (this.hlv = el)}>
          <HotList showOff="homeTop" />
        </div>
        <div className={styles.allTitle}>
          <span className={styles.left}>其他专区</span>
          <span className={styles.right} onClick={() => this.handlerGrid('/commodity')}>查看更多</span>
        </div>
        <div className={styles.tabs} ref={el => (this.hlv = el)}>
          <HotList showOff="homeBot" />
        </div>
        <div className={styles.onBottom} onClick={() => this.handlerGrid('/commodity')}>查看全部</div>
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
