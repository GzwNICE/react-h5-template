import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import intl from 'react-intl-universal';
import moment from 'moment';
import styles from './index.less';

class PaymentItem extends PureComponent {
  render() {
    const { data, type } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));
    let content = '';
    if (data.tradeFrom === 'RECHARGE') {
      content = intl.get('payment.recharge', { moneyVirtualCn: moneyVirtualCn });
    } else if (data.tradeFrom === 'CONSUME') {
      content = intl.get('payment.concume', { moneyVirtualCn: moneyVirtualCn });
    } else if (data.tradeFrom === 'REWARD_BACK') {
      content = intl.get('payment.reward_back');
    } else if (data.tradeFrom === 'REWARD') {
      content = intl.get('payment.reward', { moneyVirtualCn: moneyVirtualCn });
    } else if (data.tradeFrom === 'SYS_REWARD') {
      content = intl.get('payment.sys_reward');
    } else if (data.tradeFrom === 'NEW_REGISTER_GIVE') {
      content = intl.get('payment.new_register_given');
    } else if (data.tradeFrom === 'GO_CONVERT') {
      content = intl.get('payment.go_convert', { moneyVirtualCn: moneyVirtualCn });
    } else if (data.tradeFrom === 'GO_REWARD_EXPIRE') {
      content = intl.get('payment.go_reward_expire');
    } else if (data.tradeFrom === 'FRIEND_RECHARGE_GIVEN') {
      content = intl.get('payment.friend_recharge_given', { moneyVirtualCn: moneyVirtualCn });
    } else {
      content = data.tradeContent;
    }
    return (
      <div className={styles.box}>
        {data.tradeNumber ? (
          <div className={styles.orderId}>
            {intl.get('order.str_winning_orderid')}
            {data.tradeNumber}
          </div>
        ) : null}
        <div className={styles.orderBox}>
          <div className={styles.orderType}>{content}</div>
          <div className={styles.orderAmount}>
            {type == 'IN' ? '+' : '-'} {data.payGoAmount}
          </div>
        </div>
        <div className={styles.payBox}>
          {data.rechargeMoney ? (
            <div className={styles.payAmount}>
              {' '}
              {intl.get('payment.str_coin_rechargeMoney')}
              {data.rechargeMoney} đ
            </div>
          ) : null}
          {data.giveAwayMoney ? (
            <div className={styles.givenAmount}>
              ({intl.get('payment.str_coin_giveAwayMoney')}
              {data.giveAwayMoney}
              {moneyVirtualCn})
            </div>
          ) : null}
        </div>
        <div className={styles.timeBox}>
          <div className={styles.createTime}>
            {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
          </div>
          <div className={styles.balance}>
            ({intl.get('payment.str_coin_rest')}
            {data.goMoney}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentItem;
