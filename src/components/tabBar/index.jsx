import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Badge } from 'antd-mobile';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import { push } from 'connected-react-router';
// import UserPage from '@/pages/user';
// import HomePage from '@/pages/home';
import homeSelPng from '@/assets/images/home_selected.png';
import homePng from '@/assets/images/home.png';
import allSelected from '@/assets/images/allSelected.png';
import all from '@/assets/images/all.png';
import personal from '@/assets/images/personal.png';
import personalSel from '@/assets/images/personal_selected.png';
import message from '@/assets/images/message.png';
import messageSel from '@/assets/images/messageSel.png';
import styles from './index.less';

class TabBarBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  componentDidMount() {
    // const { getConf } = this.props;
    // getConf();
  }

  render() {
    const { selectedTab, homeSys } = this.props;
    const { IPhoneX } = this.state;
    return (
      <div className={`${styles.tabBox} ${IPhoneX === 'true' ? `${styles.tabBoxIPhone}` : null}`}>
        <Flex>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/home',
              }}
            >
              {selectedTab === 'homePage' ? (
                <img src={homeSelPng} alt="" />
              ) : (
                <img src={homePng} alt="" />
              )}
              <span style={{ color: selectedTab === 'homePage' ? '#FE5108' : '#AEAEAE' }}>
                {intl.get('home.home')}
              </span>
            </Link>
          </Flex.Item>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/commodity',
              }}
            >
              {selectedTab === 'commodityPage' ? (
                <img src={allSelected} alt="" />
              ) : (
                <img src={all} alt="" />
              )}
              <span style={{ color: selectedTab === 'commodityPage' ? '#FE5108' : '#AEAEAE' }}>
                全部商品
              </span>
            </Link>
          </Flex.Item>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/shopCart',
              }}
            >
              {selectedTab === 'shoppingCart' ? (
                <img src={messageSel} alt="" />
              ) : (
                <img src={message} alt="" />
              )}
              <span style={{ color: selectedTab === 'shoppingCart' ? '#FE5108' : '#AEAEAE' }}>
                消息
              </span>
              {homeSys && homeSys.shopCarCount > 0 ? (
                <Badge
                  text={homeSys.shopCarCount}
                  overflowCount={99}
                  hot
                  className={styles.badge}
                />
              ) : null}
            </Link>
          </Flex.Item>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/user',
              }}
            >
              {selectedTab === 'userPage' ? (
                <img src={personalSel} alt="" />
              ) : (
                <img src={personal} alt="" />
              )}
              <span style={{ color: selectedTab === 'userPage' ? '#FE5108' : '#AEAEAE' }}>
                {intl.get('home.user')}
              </span>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
const mapState = state => ({
  homeSys: state.home.data.homeSys,
});

const mapDispatch = dispatch => ({
  getConf: params => dispatch.home.fetchConf(params),
});

export default connect(mapState, mapDispatch)(TabBarBox);
