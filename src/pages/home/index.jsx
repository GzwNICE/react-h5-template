/* eslint-disable react/destructuring-assignment */
// 首页
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import { Carousel, Grid, Tabs, Toast } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Cookies from 'js-cookie';
import HotList from '@/pages/hotList';
import LatestList from '@/pages/latestList';
import OpenList from '@/pages/willEndList';
import ValueList from '@/pages/sortValueList';
import TabBarBox from '@/components/tabBar';
// import sorting from '@/assets/images/sorting.png';
import styles from './index.less';

function renderTabBar(props) {
  return (
    <Sticky topOffset={1}>
      {({ style }) => (
        <div style={{ ...style, zIndex: 2 }}>
          <Tabs.DefaultTabBar {...props} />
        </div>
      )}
    </Sticky>
  );
}
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  componentDidMount() {
    Toast.loading('Loading...', 0);
    const { getWin, getBanner, getClass, homeSys } = this.props;
    getBanner().then(() => {
      getWin();
      getClass();
      homeSys();
      setTimeout(() => {
        Toast.hide();
      }, 800);
    });
  }

  componentWillUnmount() {
    const { clearData } = this.props;
    clearData();
  }

  handlerGrid = url => {
    window.location.href = url;
  };

  render() {
    const { home } = this.props;
    const { IPhoneX } = this.state;
    const winnerList = home.winnerList;
    const bannerList = home.bannerList;
    const classData = home.classData;
    const tabs = [
      { title: `${intl.get('home.popularity')}` },
      { title: `${intl.get('home.upToDate')}` },
      { title: `${intl.get('home.willEnd')}` },
      { title: `${intl.get('home.worth')}` },
    ];
    return (
      <div className={styles.home}>
        {winnerList.length > 0 ? ( //中奖信息
          <div className={styles.winning}>
            <Carousel
              className={styles.my_carousel}
              vertical
              dots={false}
              dragging={false}
              swiping={false}
              autoplay
              infinite
            >
              {winnerList.map(i => {
                return (
                  <div className={styles.v_item} key={i.activityTurnId}>
                    <img src={i.photoUrl} alt="" className={styles.icImg} />
                    {i.carouselContent}
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : null}
        {bannerList.length > 0 ? ( //banner
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
                  style={{ width: '100%', height: '130px', verticalAlign: 'center' }}
                />
              </a>
            ))}
          </Carousel>
        ) : null}
        {classData.length > 0 ? ( // 分类导航
          <div className={styles.classification}>
            <Grid
              data={classData}
              columnNum={5}
              hasLine={false}
              renderItem={item => (
                <div onClick={() => this.handlerGrid(item.jumpUrl)}>
                  <img src={item.imgURL} className={styles.classImg} alt="" />
                  <div className={styles.tips}>{item.title}</div>
                </div>
              )}
            />
          </div>
        ) : null}
        <div className={styles.tabs} ref={el => (this.hlv = el)}>
          <StickyContainer>
            <Tabs //活动列表
              tabs={tabs}
              initialPage={0}
              swipeable={false}
              renderTabBar={renderTabBar}
              tabBarBackgroundColor="#f7f7f7"
              tabBarUnderlineStyle={{
                border: '2px solid #FF5209',
                width: '11%',
                marginLeft: '7%',
                borderRadius: '2px',
              }}
              tabBarActiveTextColor="#FF5209"
              tabBarInactiveTextColor="#333333"
            >
              <HotList />
              <LatestList />
              <OpenList />
              <ValueList />
            </Tabs>
          </StickyContainer>
        </div>
        <div
          className={`${styles.tBar} ${IPhoneX === 'true' ? `${styles.tBarIPhone}` : null}`}
          ref={this.myRef}
        >
          <TabBarBox selectedTab="homePage" search={this.props.history.location.search} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  home: state.home.data,
});

const mapDispatch = dispatch => ({
  getWin: params => dispatch.home.fetchGetWin(params),
  getBanner: params => dispatch.home.fetchGetBanner(params),
  getClass: params => dispatch.home.fetchGetClass(params),
  homeSys: params => dispatch.home.fetchConf(params),
  clearData: params => dispatch.home.clearList(params),
});

export default connect(mapState, mapDispatch)(Home);
