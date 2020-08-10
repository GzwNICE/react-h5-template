/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
// import queryString from 'query-string';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { NavBar, Icon, Button, Radio, Badge, Modal, Toast } from 'antd-mobile';
import momo from '@/assets/images/momo.png';
import funpay from '@/assets/images/funpay.png';
import styles from './index.less';

const alert = Modal.alert;
class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // lang: queryString.parse(window.location.search).lang,
      payValue: null,
      payType: '0',
    };
  }

  componentDidMount() {
    const { getTopUpList } = this.props;
    getTopUpList().then(res => {
      if (res.code === 200) {
        this.setState({
          payValue: res.data[0],
        });
      }
    });
  }

  onChangePer = value => {
    this.setState({
      payValue: value,
    });
  };
  onChangePay = type => {
    this.setState({
      payType: type,
    });
  };

  handlePay = () => {
    const { pay } = this.props;
    pay({
      payId: this.state.payValue.id,
      payType: this.state.payType,
      returnUrl: `${window.location.origin}/payResult`,
    }).then(res => {
      if (res.code === 200) {
        window.location.href = res.data.payUrl;
      }
    });
  };

  onLeftClick = () => {
    alert(' ', `${intl.get('payment.areYouSure')}`, [
      {
        text: `${intl.get('payment.carryOon')}`,
        onPress: () => {
          this.props.history.go(-1);
        },
      },
      {
        text: `${intl.get('password.cancel')}`,
      },
    ]);
  };
  render() {
    const { payValue, payType } = this.state;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { topUpList } = this.props;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={this.onLeftClick}
        >
          {intl.get('payment.topUp')}
        </NavBar>
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className={styles.topGo}>
            {intl.get('payment.selectAmount', { moneyVirtualCn: config.moneyVirtualCn })}
          </div>
          <div className={styles.radioRows}>
            {topUpList.map(i => (
              <div
                className={`${styles.radioItem} ${
                  payValue && payValue.id === i.id ? `${styles.radioItemS}` : null
                }`}
                key={i.id}
              >
                <Radio
                  className={styles.radio}
                  checked={payValue && payValue.id === i.id}
                  onChange={() => this.onChangePer(i)}
                >
                  {i.goMoney}
                </Radio>
                {i.goMoneyGive ? (
                  <Badge
                    text={`${intl.get('payment.give')}${i.goMoneyGive}`}
                    hot
                    className={styles.badge}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div className={styles.itemP}>
            <div className={styles.title}>{intl.get('payment.needToPay')}</div>
            <div className={styles.amount}>{`${payValue && payValue.fbPayTotal} ${
              config.moneySymbol
            }`}</div>
          </div>
          <div className={styles.serverAmount}>{`${intl.get(
            'payment.includingService'
          )}：${payValue && payValue.serviceFee} ${config.moneySymbol}`}</div>
        </div>
        <div className={styles.payTypeTitle}>{intl.get('payment.paymentMethod')}</div>
        <div className={styles.payType} onClick={() => this.onChangePay('0')}>
          <img src={funpay} className={styles.funpayImg}></img>
          <div className={styles.name}>FunPay</div>
          <span
            className={`${styles.radio} ${payType === '0' ? `${styles.radioSleet}` : null}`}
          ></span>
        </div>
        <div className={styles.payType} onClick={() => this.onChangePay('1')}>
          <img className={styles.momoImg} src={momo}></img>
          <div className={styles.name}>Momo Wallet</div>
          <span
            className={`${styles.radio} ${payType === '1' ? `${styles.radioSleet}` : null}`}
          ></span>
        </div>
        <div className={styles.payType} onClick={() => this.onChangePay('2')}>
          <img
            className={styles.payooImg}
            src="https://www.payoo.vn/website/static/css/image/payoo-logo.png"
          ></img>
          <div className={styles.name}>Payoo</div>
          <span
            className={`${styles.radio} ${payType === '2' ? `${styles.radioSleet}` : null}`}
          ></span>
        </div>
        <div className={styles.payTypeTitle}>{intl.get('payment.userNotice')}</div>
        <div style={{ backgroundColor: '#fff' }}>
          <div className={styles.content}>
            {intl.get('payment.not1', { moneyVirtualCn: config.moneyVirtualCn })}
            <br /> {intl.get('payment.not2', { moneyVirtualCn: config.moneyVirtualCn })}
            <br /> {intl.get('payment.not3', { moneyVirtualCn: config.moneyVirtualCn })}
          </div>
        </div>
        <Button className={styles.submit} onClick={this.handlePay}>
          {intl.get('payment.topUpNow')}
        </Button>
      </div>
    );
  }
}

const mapState = state => ({
  topUpList: state.payment.data.topUpList,
});

const mapDispatch = dispatch => ({
  getTopUpList: params => dispatch.payment.getTopUpList(params),
  pay: params => dispatch.payment.pay(params),
});

export default connect(mapState, mapDispatch)(Payment);
