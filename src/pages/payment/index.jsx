/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import queryString from 'query-string';
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
      lang: queryString.parse(window.location.search).lang,
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
        window.location.href = res.data;
      }
    });
  };

  onLeftClick = () => {
    alert(' ', '充值即将成功，你确定放弃赚钱的机会吗？', [
      { text: '取消' },
      {
        text: '继续',
        onPress: () => {
          this.props.history.go(-1);
        },
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
          充值
        </NavBar>
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className={styles.topGo}>请选择GO币充值数量</div>
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
                  <Badge text={`送${i.goMoneyGive}`} hot className={styles.badge} />
                ) : null}
              </div>
            ))}
          </div>
          <div className={styles.itemP}>
            <div className={styles.title}>需支付</div>
            <div className={styles.amount}>{`${payValue && payValue.fbPayTotal} ${
              config.moneySymbol
            }`}</div>
          </div>
          <div className={styles.serverAmount}>{`含银行服务费：${payValue && payValue.serviceFee} ${
            config.moneySymbol
          }`}</div>
        </div>
        <div className={styles.payTypeTitle}>支付方式</div>
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
        <div className={styles.payTypeTitle}>用户须知</div>
        <div style={{ backgroundColor: '#fff' }}>
          <div className={styles.content}>
            1. GO币与法币为固定兑换比例，GO币仅能用于参与商品活动；
            <br /> 2. 购买的GO币不可挂失、不可转让、不可售卖，请妥善保管好您的账号；
            <br /> 3. 用户进行充值时需要支付一定的银行服务费。
          </div>
        </div>
        <Button className={styles.submit} onClick={this.handlePay}>
          立即充值
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
