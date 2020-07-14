/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Icon, Stepper, Radio, Button, Toast } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class BuyGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      stepVal: 5,
      personValue: null,
      personValueIndex: null,
      proportionValue: null,
      balanceStatus: 0, //余额状态
      partakeCount: 0, //购买次数 应和stepVal一致
      goAmount: 0, //需支付金额
      balance: 0, //账户余额
      orderActivityId: null, //订单id
      payCountdown: 30, //支付倒计时
    };
  }

  onOpenChange = type => {
    // this.setState({ open: !this.state.open });
    this.props.onOpenChange(type);
    this.setState({
      personValue: null,
      personValueIndex: null,
      proportionValue: null,
      stepVal: 5,
      next: false,
      payCountdown: 30,
      orderActivityId: null,
    });
  };

  onChange = val => {
    this.setState({ stepVal: val });
  };

  onChangePer = (value, index) => {
    this.setState({
      personValue: value,
      personValueIndex: index,
      proportionValue: null,
      stepVal: value,
    });
  };

  onChangeProp = value => {
    this.setState({
      proportionValue: value,
      personValue: null,
      stepVal: value,
    });
  };

  pay = () => {
    const { stepVal } = this.state;
    const { buyFetch, data } = this.props;
    if (!stepVal) {
      Toast.info(`${intl.get('product.morePurchases')}`, 2);
    } else {
      buyFetch({
        activityTurnId: data.activityTurnId,
        partakeCount: stepVal,
      }).then(res => {
        if (res.code === 200) {
          this.setState(
            {
              next: true,
              balanceStatus: res.data.status,
              partakeCount: res.data.partakeCount,
              goAmount: res.data.goAmount,
              balance: res.data.balance,
              orderActivityId: res.data.orderActivityId,
            },
            () => {
              this.countdown();
            }
          );
        }
      });
    }
  };

  countdown = () => {
    if (this.state.balanceStatus) return false;
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
    if (this.state.balanceStatus) {
      this.props.goPay();
    } else {
      const { buyConfirm } = this.props;
      buyConfirm([this.state.orderActivityId]).then(res => {
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
        this.Clear();
        Toast.info(`${intl.get('product.cancelOrder')}`, 2);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps;
      if (data.remainingCount > this.state.stepVal) {
        return false;
      } else {
        this.setState({
          stepVal: data.remainingCount,
        });
      }
    }
  }

  render() {
    const { open, data, personData, proportionData } = this.props;
    const {
      stepVal,
      proportionValue,
      personValue,
      next,
      balanceStatus,
      partakeCount,
      goAmount,
      balance,
      payCountdown,
      personValueIndex,
    } = this.state;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div>
        <div className={`${open ? `${styles.buy} ${styles.buyShow}` : `${styles.buyNone}`}`}>
          {!next ? (
            <div className={styles.buyContent}>
              <div className={styles.topB}>
                <img src={data.thumbnailUrl} alt="" className={styles.prodPic} />
                <span className={styles.guide}>{intl.get('product.morePurchases')}</span>
                <Icon type="cross" size="md" className={styles.close} onClick={this.onOpenChange} />
              </div>
              <div className={styles.buyNum}>
                <span className={styles.left}>{intl.get('product.purchases')}</span>
                <Stepper
                  className={styles.step}
                  min={1}
                  max={data.remainingCount}
                  showNumber
                  value={stepVal}
                  onChange={this.onChange}
                />
              </div>
              <div className={styles.selectBox}>
                <span className={styles.selTle}>{intl.get('product.quickSelection')}</span>
                <div className={styles.personValue}>
                  <span className={styles.text}>{intl.get('home.personTime')}</span>
                  <div className={styles.radioRows}>
                    {personData.map((i, index) => (
                      <Radio
                        className={`${styles.radioItem} ${
                          personValue === i.value && personValueIndex === index ? `${styles.radioItemS}` : null
                        }`}
                        style={data.remainingCount < i.label ? { color: '#cbcbcb' } : {}}
                        key={i.value + index}
                        checked={personValue === i.value && personValueIndex === index}
                        onChange={() => this.onChangePer(i.value, index)}
                        disabled={data.remainingCount < i.value}
                      >
                        {i.label}
                      </Radio>
                    ))}
                  </div>
                </div>
                <div className={styles.personValue}>
                  <span className={styles.text}>{intl.get('product.proportion')}</span>
                  <div className={styles.radioRows}>
                    {proportionData.map(i => (
                      <Radio
                        className={`${styles.radioItem} ${
                          proportionValue === i.value ? `${styles.radioItemS}` : null
                        }`}
                        style={data.remainingCount < i.value ? { color: '#cbcbcb' } : {}}
                        key={i.value}
                        checked={proportionValue === i.value}
                        onChange={() => this.onChangeProp(i.value)}
                        disabled={data.remainingCount < i.value}
                      >
                        {i.label}
                      </Radio>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div>
                  <span className={styles.total}>{intl.get('product.total')}：</span>
                  <span className={styles.price}>{`${stepVal * data.participatePrice} ${
                    config.moneyVirtualCn
                  }`}</span>
                </div>
                <Button type="primary" className={styles.pay} onClick={this.pay}>
                  {intl.get('product.confirmPayment')}
                </Button>
              </div>
            </div>
          ) : (
            <div className={`${open ? `${styles.buyNextContent}` : null}`}>
              <div className={styles.topB}>
                <span className={styles.guide}>{intl.get('product.confirmSettlement')}</span>
                <Icon type="cross" size="md" className={styles.close} onClick={this.cancelPay} />
              </div>
              <div className={styles.buyNum}>
                <li>
                  <span className={styles.left}>{intl.get('product.purchases')}</span>
                  <span>{`${partakeCount}人次`}</span>
                </li>
                <li>
                  <span className={styles.left}>
                    {intl.get('product.payGOCoins', { moneySymbol: config.moneyVirtualCn })}
                  </span>
                  <span>{goAmount}</span>
                </li>
                <li>
                  <span className={styles.left}>{intl.get('product.balance')}</span>
                  <span>{`${balance}`}</span>
                </li>
                {!balanceStatus ? (
                  <p>
                    <span>{`${payCountdown}s`}</span> {intl.get('product.cancellationOrders')}
                  </p>
                ) : null}
              </div>
              <div className={styles.bottom}>
                <Button type="primary" className={styles.pay} onClick={this.confirmPay}>
                  {!balanceStatus
                    ? `${intl.get('product.confirmPayment')}`
                    : `${intl.get('product.pleaseRecharge', {
                        moneySymbol: config.moneyVirtualCn,
                      })}`}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  buyFetch: params => dispatch.product.buy(params),
  buyConfirm: params => dispatch.product.buyConfirm(params),
  buyCancel: params => dispatch.product.buyCancel(params),
});

export default connect(mapState, mapDispatch)(BuyGroup);
