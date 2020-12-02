import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Badge } from 'antd-mobile';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import homeSelPng from '@/assets/images/home_selected.png';
import homePng from '@/assets/images/home.png';
import allSelected from '@/assets/images/park_selected.png';
import all from '@/assets/images/park.png';
import personal from '@/assets/images/personal.png';
import personalSel from '@/assets/images/personal_selected.png';
import message from '@/assets/images/order.png';
import messageSel from '@/assets/images/order_selected.png';
import styles from './index.less';

class TabBarBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  render() {
    const { selectedTab, homeSys } = this.props;
    console.log(`我是子组件接收到的值：${selectedTab}`);
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
              <span style={{ color: selectedTab === 'homePage' ? '#3EE2CA' : '#AEAEAE' }}>
                首页
              </span>
            </Link>
          </Flex.Item>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/garden',
              }}
            >
              {selectedTab === 'garden' ? (
                <img src={allSelected} alt="" />
              ) : (
                <img src={all} alt="" />
              )}
              <span style={{ color: selectedTab === 'garden' ? '#3EE2CA' : '#AEAEAE' }}>
                茶园
              </span>
            </Link>
          </Flex.Item>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/order',
              }}
            >
              {selectedTab === 'order' ? (
                <img src={messageSel} alt="" />
              ) : (
                <img src={message} alt="" />
              )}
              <span style={{ color: selectedTab === 'order' ? '#3EE2CA' : '#AEAEAE' }}>
                订单
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
              {selectedTab === 'user' ? (
                <img src={personalSel} alt="" />
              ) : (
                <img src={personal} alt="" />
              )}
              <span style={{ color: selectedTab === 'user' ? '#3EE2CA' : '#AEAEAE' }}>
                我的
              </span>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(TabBarBox);
