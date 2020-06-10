import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import styles from './index.less';

class NoWin extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.orderInfo}>
          <img className={styles.orderImg} src={data.imgUrl}></img>
          <div>
            <div className={styles.orderTitle}>第1轮 APP STORE充值卡500元APP STORE充值卡500元</div>
            <div className={styles.status}>
              <div className={styles.state}>购买人次：</div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.winInfo}>
          <div className={styles.winTime}>中奖时间：2019/10/01 13：00</div>
          <div className={styles.orderId}>订单ID：10391818181</div>
        </div>
      </div>
    );
  }
}

export default NoWin;
