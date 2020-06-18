import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import intl from 'react-intl-universal';
import moment from 'moment';
import styles from './index.less';

class HistoryItem extends PureComponent {
  render() {
    const { data } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));
    const { moneySymbol } = JSON.parse(localStorage.getItem('configuration'));
    let content = '';

    if (data.status == 0) {
      content = intl.get('payhistory.unup');
    } else if (data.status == 1) {
      content = intl.get('payhistory.topuping');
    } else if (data.status == 2) {
      content = intl.get('payhistory.topup_success');
    } else if (data.status == 3) {
      content = intl.get('payhistory.topup_faile');
    } else if (data.status == 4) {
      content = intl.get('payhistory.topup_cancel');
    }
    return (
      <div className={styles.box}>
        <div className={styles.orderIdBox}>
          <div className={styles.orderId}>订单ID：{data.orderNumber}</div>
          <div className={styles.createTime}>
            {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
          </div>
        </div>
        <div className={styles.orderBox}>
          <div className={styles.orderType}>
            兑换 {data.goMoneyTotal} {moneyVirtualCn}
          </div>
          <div style={data.status == 1 ? { color: '#ff5209' } : { color: '#333333' }}>
            {content}
          </div>
        </div>
        {data.payMoneyTotal ? (
          <div className={styles.payAmount}>
            支付：{data.payMoneyTotal} {moneySymbol}
          </div>
        ) : null}
        {data.serviceFee ? (
          <div className={styles.givenAmount}>
            含服务费：{data.serviceFee} {moneySymbol}
          </div>
        ) : null}
      </div>
    );
  }
}

export default HistoryItem;
