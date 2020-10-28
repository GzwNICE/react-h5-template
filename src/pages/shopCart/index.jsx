/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { NavBar, Toast, NoticeBar, Button, Modal, Stepper } from 'antd-mobile';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import MissCard from '@/components/shopCartMiss';
import ActivityCard from '@/components/activityCard';
import ShopCardItem from '@/components/shopCartItem';
import CartPay from '@/components/cartPay';
import nocontent from '@/assets/images/nocontent.png';
import prompt from '@/assets/images/ic_prompt@3x.png';
import { numFormat } from '@/utils/util';
import styles from './index.less';

class ShopCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      isLogin: localStorage.getItem('mobile') != null,
    };
  }

  render() {
    const { IPhoneX, isLogin } = this.state;
    return (
      <div className={styles.shopCart}>
        <NavBar mode="dark" className={styles.navBar}>
          消息中心
        </NavBar>
        {!isLogin ? (
          <div className={styles.noLogin}>
          <img src={prompt} alt="" className={styles.errorImg}/>
          <p className={styles.tips}>您还未登录哦，赶紧登录查看吧~</p>
          <Button type="primary" className={styles.goLogin} onClick={() => this.props.history.push(`/login?redirect=${this.props.history.location.pathname}`)}>
            登录/注册
          </Button>
        </div>
        ): (
          <div className={styles.noLogin}>
            <NoticeBar icon={null} className={styles.noTicBar}>
              温馨提示：请收到安装链接后请按照引导安装授权；
            </NoticeBar>
            <img src={nocontent} alt="" className={styles.noContent}/>
            <p className={styles.tips}>暂无消息</p>
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
  clearList: params => dispatch.home.clearList(params),
  deleteShop: params => dispatch.shopCart.delete(params),
  getConf: params => dispatch.home.fetchConf(params),
  cartPay: params => dispatch.shopCart.cartPay(params),
  changeCount: params => dispatch.shopCart.changeCount(params),
});

export default connect(mapState, mapDispatch)(ShopCart);
