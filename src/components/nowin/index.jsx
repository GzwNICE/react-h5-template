import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import moment from 'moment';
import styles from './index.less';

class NoWin extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.orderInfo}>
          <img className={styles.orderImg} src={data.pic}></img>
          <div>
            <div className={styles.orderTitle}>
              第{data.currentTurn}轮 {data.activityName}
            </div>
            <div className={styles.status}>
              <div className={styles.state}>购买人次：{data.luckCodeCount}</div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.winInfo}>
          <div className={styles.winTime}>
            中奖时间： {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
          </div>
          <div className={styles.orderId}>订单ID：{data.orderNumber}</div>
        </div>
      </div>
    );
  }
}

export default NoWin;
