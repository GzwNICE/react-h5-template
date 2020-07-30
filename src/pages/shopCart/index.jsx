/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Icon, NavBar, Toast, Flex } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
// import shopCartBg from '@/assets/images/shopCartBg.png';
import MissCard from '@/components/shopCartMiss';
import ActivityCard from '@/components/activityCard';
import styles from './index.less';

class ShopCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  componentDidMount() {
    const { getOpenList } = this.props;
    const params = {
      page: 1,
      size: 100,
    };
    getOpenList(params).then(() => {
      Toast.hide();
    });
  }

  render() {
    const { IPhoneX } = this.state;
    const { endList } = this.props;
    const token = localStorage.getItem('token');
    return (
      <div className={styles.shopCart}>
        <NavBar mode="dark" className={styles.navBar}>
          {intl.get('shoppingCart.cart')}
        </NavBar>
        {token ? (
          <div
            className={`${styles.missProd} ${
              IPhoneX === 'true' ? `${styles.missProdIPhone}` : null
            }`}
          >
            <div className={styles.missBox}>
              <MissCard />
            </div>
            <div className={styles.recommendBox}>
              <span className={styles.title}>{intl.get('exchange.system')}</span>
              <Flex wrap="wrap" justify="between">
                {endList.data.map(i => {
                  return (
                    <div key={i.activityTurnId} className={styles.hotItem}>
                      <ActivityCard data={i} recommend />
                    </div>
                  );
                })}
              </Flex>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.noLogin} ${IPhoneX === 'true' ? `${styles.noLoginIPhone}` : null}`}
          >
            <MissCard type="link" />
          </div>
        )}
        <div
          className={`${styles.tBar} ${IPhoneX === 'true' ? `${styles.tBarIPhone}` : null}`}
          ref={this.myRef}
        >
          <TabBarBox selectedTab="shoppingCart" />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  endList: state.home.data.endList,
});

const mapDispatch = dispatch => ({
  // getCategory: params => dispatch.commodity.getCategory(params),
  getOpenList: params => dispatch.home.fetchGetEndList(params),
});

export default connect(mapState, mapDispatch)(ShopCart);
