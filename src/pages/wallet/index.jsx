import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Flex, List, Toast, Button } from 'antd-mobile';
import aliPay from '@/assets/images/ic_alipay@2x.png';
import weChat from '@/assets/images/ic_WeChatpay@2x.png';
import unIonPay from '@/assets/images/ic_unionpay@2x.png';
import vipCard from '@/assets/images/card_vip@2x.png';
import styles from './index.less';

const Item = List.Item;
export class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardSelect: 80,
      page: 'wallet',
    };
  }

  cardClick(price) {
    this.setState({
      cardSelect: price,
    });
  }

  withdrawal = () => {
    Toast.offline('暂无余额提现', 2);
  };

  render() {
    const { cardSelect, page } = this.state;
    const cardList = [
      {
        price: 1,
        data: 7,
        title: '体验会员',
      },
      {
        price: 80,
        data: 30,
        title: '月会员',
      },
      {
        price: 188,
        data: 90,
        title: '季度会员',
      },
      {
        price: 358,
        data: 180,
        title: '半年会员',
      },
      {
        price: 598,
        data: 365,
        title: '年度会员',
      },
      {
        price: 8888,
        data: '永久',
        title: '终身会员',
      },
    ];
    return (
      <div className={styles.wallet}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navbar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
          rightContent={<span onClick={this.withdrawal}>提现</span>}
        >
          我的钱包
        </NavBar>
        {page === 'wallet' ? (
          <div className={styles.balance}>
            <span className={styles.text}>账户余额（元）</span>
            <span className={styles.money}>0.00</span>
          </div>
        ) : (
          <div className={styles.vipBox}>
            <img src={vipCard} alt="" />
          </div>
        )}
        <div className={styles.selectTitle}>选择会员套餐</div>
        <Flex className={styles.goodInfo} justify="between" wrap="wrap">
          {cardList.map(i => {
            return (
              <div
                className={`${styles.cardItem} ${
                  cardSelect === i.price ? `${styles.cardSel}` : null
                }`}
                key={i.price}
                onClick={() => this.cardClick(i.price)}
              >
                <span className={styles.tLName}>{i.title}</span>
                {i.price === 1 ? <span className={styles.tLIcon}>新用户专享</span> : null}
                <div className={styles.bl}>
                  <span className={styles.ttL}>{`¥ ${i.price}`}</span>
                  {i.data === '永久' ? null : <span className={styles.ttR}>{`/${i.data}天`}</span>}
                </div>
              </div>
            );
          })}
        </Flex>
        <List className={styles.payBox}>
          <Item thumb={aliPay} extra={<Icon type="check-circle" color="#40D622" size="xs" />}>
            支付宝支付
          </Item>
          <Item thumb={weChat} extra={'敬请期待'}>
            微信支付
          </Item>
          <Item thumb={unIonPay} extra={'敬请期待'}>
            银行卡支付
          </Item>
        </List>
        <div className={styles.tips}>
          <span className={styles.tt}>温馨提示：</span>
          {page === 'wallet' ? (
            <span>
              <br />
              余额可随时提现，100元以下提现需收取5%手续费，提现请联系客服或后台反馈申请;
            </span>
          ) : (
            <span>会员套餐充值不支持退款哦</span>
          )}
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.ll}>
            <span className={styles.zf}>支付：¥</span>
            <span className={styles.q}> 68</span>
          </div>
          <Button type="primary" className={styles.nextBut}>
            登录
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
