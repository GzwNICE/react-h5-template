import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import moment from 'moment';
import intl from 'react-intl-universal';

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
              {intl.get('order.str_current_turn')} {data.currentTurn} {data.activityName}
            </div>
            <div className={styles.status}>
              <div className={styles.state}>
                {intl.get('order.str_nowin_buytimes', { num: data.luckCodeCount })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.winInfo}>
          <div className={styles.winTime}>
            {intl.get('order.str_order_time')}
            {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
          </div>
          <div className={styles.orderId}>
            {intl.get('order.str_winning_orderid')}
            {data.orderNumber}
          </div>
        </div>
      </div>
    );
  }
}

export default NoWin;
