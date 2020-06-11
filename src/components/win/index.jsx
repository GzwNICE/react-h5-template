import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import moment from 'moment';
import styles from './index.less';

class Win extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.orderBox}>
          <img className={styles.orderImg} src={data.pic}></img>
          <div className={styles.orderInfo}>
               <div className={styles.orderTitle}>第{data.currentTurn}轮 {data.activityName}</div>
            <div className={styles.status}>
              <div className={styles.state}>奖品待确认</div>
              <div className={styles.btn}>去确认</div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.winInfo}>
          <div className={styles.confirmInfo}>需要确认信息之后才会发奖哦，超过24小时未确认将自动流奖</div>
          <div className={styles.address}>收货地址：河内市</div>
          <div className={styles.sendRemark}>发货备注：</div>
          <div className={styles.winInfo}>
            <div className={styles.winTime}>
              中奖时间： {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
            </div>
            <div className={styles.orderId}>订单ID：{data.orderNumber}</div>
        </div>
        </div>
      </div>
    );
  }
}

export default Win;
