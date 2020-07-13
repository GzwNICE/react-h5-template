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
          <div className={styles.orderId}>
            {intl.get('order.str_winning_orderid')} {data.orderNumber}
          </div>
          <div className={styles.createTime}>
            {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
          </div>
        </div>
        <div className={styles.orderBox}>
          <div className={styles.orderType}>
            {intl.get('payment.str_change_gocoin')} {data.goMoneyTotal} {moneyVirtualCn}
          </div>
          <div style={data.status == 1 ? { color: '#ff5209' } : { color: '#333333' }}>
            {content}
          </div>
        </div>
        {data.payMoneyTotal ? (
          <div className={styles.payAmount}>
            {intl.get('payment.str_coin_rechargeMoney')} {data.payMoneyTotal} {moneySymbol}
          </div>
        ) : null}
        {data.serviceFee ? (
          <div className={styles.givenAmount}>
            {intl.get('payment.str_server_money')}
            {data.serviceFee} {moneySymbol}
          </div>
        ) : null}
      </div>
    );
  }
}

export default HistoryItem;
