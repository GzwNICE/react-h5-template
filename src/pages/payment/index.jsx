import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon,Button, Radio } from 'antd-mobile';
import momo from '@/assets/images/momo.png';
import funpay from '@/assets/images/funpay.png';

import styles from './index.less';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));
class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      payValue: null,
      payType:1,
      payData: [{ value: 100 }, { value: 200 }, { value: 300 }],
      payData2: [{ value: 400 }, { value: 500 }, { value: 600 }],
      payData3: [{ value: 700 }, { value: 800 }, { value: 900 }],
    };
  }
  onChangePer = value => {
    this.setState({
      payValue: value,
    });
  };
  onChangePay= type=>{
    this.setState({
      payType: type,
    });
  }
  render() {
    const { payData, payData2, payData3, payValue, payType } = this.state;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          充值
        </NavBar>
        <div style={{backgroundColor:"#ffffff"}}>
        <div className={styles.topGo}>请选择GO币充值数量</div>
        <div className={styles.radioRows}>
          {payData.map(i => (
              <Radio
                className={`${styles.radioItem} ${
                  payValue === i.value ? `${styles.radioItemS}` : null
                }`}
                key={i.value}
                checked={payValue === i.value}
                onChange={() => this.onChangePer(i.value)}
              >
                {i.value}
              </Radio>
          ))}
        </div>
        <div className={styles.radioRows}>
          {payData2.map(i => (
            <Radio
              className={`${styles.radioItem} ${
                payValue === i.value ? `${styles.radioItemS}` : null
              }`}
              key={i.value}
              checked={payValue === i.value}
              onChange={() => this.onChangePer(i.value)}
            >
              {i.value}
            </Radio>
          ))}
        </div>
        <div className={styles.radioRows}>
          {payData3.map(i => (
            <Radio
              className={`${styles.radioItem} ${
                payValue === i.value ? `${styles.radioItemS}` : null
              }`}
              key={i.value}
              checked={payValue === i.value}
              onChange={() => this.onChangePer(i.value)}
            >
              {i.value}
            </Radio>
          ))}
        </div>
        <div className={styles.itemP}>
          <div className={styles.title}>需支付</div>
          <div className={styles.amount}>100,000₫</div>
        </div>
        <div className={styles.serverAmount}>含银行服务费：5,000₫</div>
        </div>
        <div className={styles.payTypeTitle}>支付方式</div>
        <div className={styles.payType}>
          <img src={funpay} className={styles.funpayImg}></img>
          <div className={styles.name}>FunPay</div>
          <input type="radio" checked={payType === 1} onChange={() => this.onChangePay(1)}></input>
        </div>
        <div className={styles.payType}>
          <img className={styles.momoImg} src={momo}></img>
          <div className={styles.name}>Momo Wallet</div>
          <input type="radio" checked={payType === 2} onChange={() => this.onChangePay(2)}></input>
        </div>
        <div className={styles.payTypeTitle}>用户须知</div>
        <div style={{ backgroundColor: '#fff' }}>
          <div className={styles.content}>
            1. GO币与法币为固定兑换比例，GO币仅能用于参与商品活动；
            <br /> 2. 购买的GO币不可挂失、不可转让、不可售卖，请妥善保管好您的账号；
            <br /> 3. 用户进行充值时需要支付一定的银行服务费。
          </div>
        </div>
        <Button className={styles.submit}>立即充值</Button>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Payment);
