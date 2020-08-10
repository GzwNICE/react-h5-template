/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Icon, Button, Toast } from 'antd-mobile';
import { numFormat } from '@/utils/util';
import styles from './index.less';

class CartPay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      payCountdown: 30, //支付倒计时
    };
  }

  onOpenChange = type => {
    this.props.onOpenChange(type);
    this.setState({
      payCountdown: 30,
    });
  };

  countdown = () => {
    const { data, homeSys } = this.props;
    if (data.go > homeSys.goMoney) return false;
    this.timer = setInterval(() => {
      if (this.state.payCountdown <= 0) {
        Toast.info(`${intl.get('product.orderTimeout')}`, 2);
        return this.Clear();
      }
      this.setState({
        payCountdown: this.state.payCountdown - 1,
      });
    }, 999);
  };

  Clear = type => {
    this.onOpenChange(type);
    clearInterval(this.timer);
  };

  confirmPay = () => {
    const { data, homeSys } = this.props;
    if (homeSys.goMoney < data.go) {
      this.props.goPay();
    } else {
      const { buyConfirm } = this.props;
      buyConfirm(data.idList).then(res => {
        if (res.code === 200) {
          this.Clear('success');
          Toast.success(`${intl.get('product.participate')}`, 2);
        }
      });
    }
  };

  cancelPay = () => {
    const { buyCancel } = this.props;
    buyCancel([this.state.orderActivityId]).then(res => {
      if (res.code === 200) {
        this.Clear('cancel');
        Toast.info(`${intl.get('product.cancelOrder')}`, 2);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps;
      if (data.status === 200) {
        this.countdown();
      }
    }
  }

  render() {
    const { open, data, homeSys } = this.props;
    const { payCountdown } = this.state;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div>
        <div className={`${open ? `${styles.buy} ${styles.buyShow}` : `${styles.buyNone}`}`}>
          <div className={`${open ? `${styles.buyNextContent}` : null}`}>
            <div className={styles.topB}>
              <span className={styles.guide}>{intl.get('product.confirmSettlement')}</span>
              <Icon type="cross" size="md" className={styles.close} onClick={this.cancelPay} />
            </div>
            <div className={styles.buyNum}>
              <li>
                <span className={styles.left}>{intl.get('product.purchases')}</span>
                <span>{`${data.num} ${intl.get('home.personTime')}`}</span>
              </li>
              <li>
                <span className={styles.left}>
                  {intl.get('product.payGOCoins', { moneySymbol: config.moneyVirtualCn })}
                </span>
                <span>{numFormat(data.go)}</span>
              </li>
              <li>
                <span className={styles.left}>{intl.get('product.balance')}</span>
                <span>{numFormat(homeSys.goMoney)}</span>
              </li>
              {homeSys.goMoney > data.go ? (
                <p>
                  <span>{`${payCountdown}s`}</span> {intl.get('product.cancellationOrders')}
                </p>
              ) : null}
            </div>
            <div className={styles.bottom}>
              <Button type="primary" className={styles.pay} onClick={this.confirmPay}>
                {homeSys.goMoney > data.go
                  ? `${intl.get('product.confirmPayment')}`
                  : `${intl.get('product.pleaseRecharge', {
                      moneySymbol: config.moneyVirtualCn,
                    })}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  homeSys: state.home.data.homeSys,
});

const mapDispatch = dispatch => ({
  buyFetch: params => dispatch.product.buy(params),
  buyConfirm: params => dispatch.product.buyConfirm(params),
  buyCancel: params => dispatch.product.buyCancel(params),
});

export default connect(mapState, mapDispatch)(CartPay);
