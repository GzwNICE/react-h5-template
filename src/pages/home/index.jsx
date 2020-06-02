import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import intl from 'react-intl-universal';
import { Carousel, Grid, Tabs } from 'antd-mobile';
import ActivityCard from '@/components/activityCard';
import personal from '@/assets/images/personal.png';
import styles from './index.less';

class Home extends PureComponent {
  render() {
    const winnerList = [
      { id: '1', value: 'carousel 1 sdbc98dbcs抽中了iPhone X max256Gshoujiyitaihah萨达阿斯顿' },
      { id: '2', value: 'carousel 2' },
      { id: '3', value: 'carousel 3' },
    ];
    const bannerList = ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'];
    const classData = Array.from(new Array(10)).map(() => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
    }));
    const tabs = [{ title: '人气' }, { title: '最新' }, { title: '将止' }, { title: '价值' }];
    return (
      <div className={styles.home}>
        {winnerList.length > 0 ? ( //中奖信息
          <div className={styles.winning}>
            <img src={personal} alt="" className={styles.icImg} />
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
                  <div className={styles.v_item} key={i.id}>
                    {i.value}
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : null}
        {bannerList.length > 0 ? ( //banner
          <div className={styles.banner}>
            <Carousel
              autoplay
              infinite
              // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              // afterChange={index => console.log('slide to', index)}
            >
              {bannerList.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: '130px' }}
                >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      // eslint-disable-next-line react/no-unused-state
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </div>
        ) : null}
        {classData.length > 0 ? ( // 分类导航
          <div className={styles.classification}>
            <Grid
              data={classData}
              columnNum={5}
              hasLine={false}
              renderItem={item => (
                <div>
                  <img src={item.icon} className={styles.classImg} alt="" />
                  <div className={styles.tips}>抽中了没有啊抽中了抽中了</div>
                </div>
              )}
            />
          </div>
        ) : null}
        <div className={styles.tabs}>
          <Tabs //活动列表
            tabs={tabs}
            initialPage={0}
            swipeable={false}
            tabBarBackgroundColor="#f7f7f7"
            tabBarUnderlineStyle={{
              border: '2px solid #FF5209',
              width: '11%',
              marginLeft: '7%',
              borderRadius: '2px',
            }}
            tabBarActiveTextColor="#FF5209"
            tabBarInactiveTextColor="#333333"
            // onChange={(tab, index) => {
            //   console.log('onChange', index, tab);
            // }}
            // onTabClick={(tab, index) => {
            //   console.log('onTabClick', index, tab);
            // }}
          >
            <div>
              <ActivityCard />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '150px',
              }}
            >
              Content of second tab
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '150px',
              }}
            >
              Content of third tab
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '150px',
              }}
            >
              Content of four tab
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Home);
