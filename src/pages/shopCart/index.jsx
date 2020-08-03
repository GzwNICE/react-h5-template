/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { NavBar, Toast, Flex, Button } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
// import shopCartBg from '@/assets/images/shopCartBg.png';
import MissCard from '@/components/shopCartMiss';
import ActivityCard from '@/components/activityCard';
import ShopCardItem from '@/components/shopCartItem';
import styles from './index.less';

class ShopCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  componentDidMount() {
    this.initList();
  }

  delete = id => {
    const { deleteShop } = this.props;
    deleteShop([id]).then(res => {
      if (res.code === 200) {
        Toast.success('删除成功!', 2);
        this.initList();
      }
    });
  };

  initList() {
    const { getOpenList, shopCartList } = this.props;
    shopCartList({ isReload: 0 }).then(res => {
      if (res.code === 200 && res.data.length === 0) {
        const params = {
          page: 1,
          size: 100,
        };
        getOpenList(params);
      }
    });
  }

  render() {
    const { IPhoneX } = this.state;
    const { endList, homeSys, shopList } = this.props;
    const token = localStorage.getItem('token');
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.shopCart}>
        <NavBar mode="dark" className={styles.navBar}>
          {shopList.length && token
            ? `${intl.get('shoppingCart.cart')}(${homeSys.shopCarCount})`
            : `${intl.get('shoppingCart.cart')}`}
        </NavBar>
        {token ? (
          <div>
            {shopList.length ? (
              <div
                className={`${styles.content} ${
                  IPhoneX === 'true' ? `${styles.contentIPhone}` : null
                }`}
              >
                <div className={styles.header}></div>
                <div className={styles.list}>
                  {shopList.map(i => {
                    return <ShopCardItem key={i.id} data={i} delete={this.delete} />;
                  })}
                </div>
                <div
                  className={`${styles.buyGroup} ${
                    IPhoneX === 'true' ? `${styles.buyGroupIPhone}` : null
                  }`}
                >
                  <div className={styles.left}>
                    共6件商品，需支付: <span>{`6 ${config.moneyVirtualCn}`}</span>
                  </div>
                  <Button type="primary" className={styles.settle}>
                    去结算
                  </Button>
                </div>
              </div>
            ) : (
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
            )}
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
  homeSys: state.home.data.homeSys,
  shopList: state.shopCart.data.shopList,
});

const mapDispatch = dispatch => ({
  shopCartList: params => dispatch.shopCart.shopCartList(params),
  getOpenList: params => dispatch.home.fetchGetEndList(params),
  deleteShop: params => dispatch.shopCart.delete(params),
});

export default connect(mapState, mapDispatch)(ShopCart);
