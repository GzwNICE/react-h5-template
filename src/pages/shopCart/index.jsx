/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { NavBar, Toast, Flex, Button, Modal, Stepper } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
// import shopCartBg from '@/assets/images/shopCartBg.png';
import MissCard from '@/components/shopCartMiss';
import ActivityCard from '@/components/activityCard';
import ShopCardItem from '@/components/shopCartItem';
import CartPay from '@/components/cartPay';
import styles from './index.less';

class ShopCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      buyShow: false, //购买弹窗
      payGo: 0, //支付金额
      payData: {}, //支付组件数据
      countModal: false,
      countData: {
        id: 0,
        buyCount: 1,
        max: 10,
      },
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    this.initList();
  }

  delete = id => {
    const { deleteShop } = this.props;
    deleteShop([id]).then(res => {
      if (res.code === 200) {
        Toast.success('删除成功!', 2);
        this.initList();
        this.getConfig();
      }
    });
  };

  getConfig = () => {
    const { getConf } = this.props;
    getConf();
  };

  initList() {
    const { getOpenList, shopCartList } = this.props;
    shopCartList({ isReload: 0 }).then(res => {
      if (res.code === 200) {
        let payGo = 0;
        res.data.map(i => {
          payGo += i.buyCount * i.price;
        });
        this.setState({
          payGo,
        });
        if (res.data.length === 0) {
          Toast.loading('Loading...', 0);
          const params = {
            page: 1,
            size: 100,
          };
          getOpenList(params).then(() => {
            Toast.hide();
          });
        }
      }
    });
  }

  settlement = () => {
    const { cartPay, shopList } = this.props;
    let arr = [];
    let num = 0;
    shopList.map(i => {
      arr.push({ id: i.id, buyCount: i.buyCount, activityTurnId: i.turnActivityId });
      num += i.buyCount;
    });
    cartPay(arr).then(res => {
      if (res.code === 200) {
        this.setState({
          payData: {
            idList: res.data.idList,
            go: this.state.payGo,
            num,
            status: res.code,
          },
        });
        this.visibleBuy();
      } else if (res.code === 50007) {
        this.setState({
          payData: {
            idList: [],
            go: this.state.payGo,
            num,
            status: res.code,
          },
        });
        this.visibleBuy();
      } else {
        this.initList();
        this.getConfig();
      }
    });
  };

  visibleBuy = type => {
    this.setState({
      buyShow: !this.state.buyShow,
    });
    if (type) {
      setTimeout(() => {
        this.initList();
        this.getConfig();
      }, 2000);
    }
  };

  goPay = () => {
    this.props.history.push(`/payment`);
  };

  changeCount = data => {
    this.setState(
      {
        countData: data,
      },
      () => {
        this.closeModal();
      }
    );
  };

  closeModal = () => {
    this.setState({
      countModal: !this.state.countModal,
    });
  };

  stepChange = val => {
    this.setState({
      countData: {
        buyCount: val,
        id: this.state.countData.id,
        max: this.state.countData.max,
      },
    });
  };

  determineCount = () => {
    const { changeCount } = this.props;
    const params = this.state.countData;
    delete params.max;
    changeCount(params).then(res => {
      if (res.code === 200) {
        this.closeModal();
        this.setState({
          countData: {},
        });
        this.initList();
      }
    });
  };

  componentWillUnmount() {
    const { clearList } = this.props;
    clearList();
  }

  render() {
    const { IPhoneX, buyShow, payGo, payData, countModal, countData } = this.state;
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
                    return (
                      <ShopCardItem
                        key={i.id}
                        data={i}
                        delete={this.delete}
                        changeCount={this.changeCount}
                      />
                    );
                  })}
                </div>
                <div
                  className={`${styles.buyGroup} ${
                    IPhoneX === 'true' ? `${styles.buyGroupIPhone}` : null
                  }`}
                >
                  <div className={styles.left}>
                    {`${intl.get('shoppingCart.total', { length: shopList.length })}: `}
                    <span>{`${payGo} ${config.moneyVirtualCn}`}</span>
                  </div>
                  <Button type="primary" className={styles.settle} onClick={this.settlement}>
                    {intl.get('shoppingCart.settle')}
                  </Button>
                </div>
                <CartPay
                  open={buyShow}
                  onOpenChange={this.visibleBuy}
                  data={payData}
                  goPay={this.goPay}
                />
                <Modal
                  visible={countModal}
                  transparent
                  maskClosable={false}
                  title={intl.get('shoppingCart.quantity')}
                  style={{ width: '298px' }}
                  className={styles.countModal}
                >
                  <div className={styles.countContent}>
                    <Stepper
                      className={styles.step}
                      showNumber
                      max={countData.max}
                      min={1}
                      value={countData.buyCount}
                      onChange={this.stepChange}
                    />
                    <div className={styles.butGroup}>
                      <Button className={styles.cancel} onClick={this.closeModal}>
                        {intl.get('address.cancel')}
                      </Button>
                      <Button className={styles.determine} onClick={this.determineCount}>
                        {intl.get('user.confirm')}
                      </Button>
                    </div>
                  </div>
                </Modal>
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
  clearList: params => dispatch.home.clearList(params),
  deleteShop: params => dispatch.shopCart.delete(params),
  getConf: params => dispatch.home.fetchConf(params),
  cartPay: params => dispatch.shopCart.cartPay(params),
  changeCount: params => dispatch.shopCart.changeCount(params),
});

export default connect(mapState, mapDispatch)(ShopCart);
