import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import styles from './index.less';

class WaitOpen extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.orderTime}>下单时间：2019/10/01 13：00</div>
        <div className={styles.orderInfo}>
          <img className={styles.orderImg} src={data.imgUrl}></img>
          <div>
            <div className={styles.orderTitle}>第1轮 APP STORE充值卡500元APP STORE充值卡500元</div>
            <div className={styles.schedule}>
              <div className={styles.progressTitle}>开奖进度：</div>
              <div className={styles.progress}>
                <Progress
                  percent={data.progress}
                  position="normal"
                  style={{ width: '100%', height:'14px', borderRadius: '7px', backgroundColor: '#FBCEBB' }}
                  barStyle={{ border: '7px solid rgb(255, 82, 9)', borderRadius: '7px', boxSizing: 'border-box' }}
                />
                <div className={styles.progressNum}>{`${data.progress}%`}</div>
              </div>
              <div className={styles.remaining}>{`剩余${data.remainingCount}人次`}</div>
            </div>
          </div>
        </div>
        <div className={styles.buyInfo}>
          <div className={styles.buyCount}>已购买：1人次</div>
          <div className={styles.buyCode}>查看我的抽奖号码</div>
        </div>
      </div>
    );
  }
}

export default WaitOpen;
