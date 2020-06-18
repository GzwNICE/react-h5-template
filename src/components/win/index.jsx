import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import intl from 'react-intl-universal';
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';
import queryString from 'query-string';

import moment from 'moment';
import styles from './index.less';
import { Link } from 'react-router-dom';

const { lang } = queryString.parse(window.location.search);

class Win extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));

    let orderStatus = '';
    let colorStatus = '';
    if (data.status === 'NO_CONFIRM') {
      //流奖
      orderStatus = intl.get('order.no_confirm');
      colorStatus = '#333333';
    } else if (data.status === 'WIN') {
      //奖品待确认
      orderStatus = intl.get('order.win');
      colorStatus = '#666666';
    } else if (data.status === 'WAIT_PROVIDE') {
      //奖品未发放
      orderStatus = intl.get('order.wait_provide');
      colorStatus = '#FF5209';
    } else if (data.status === 'PROVIDED') {
      colorStatus = '#ff34c759';
      if (data.productType === 'SUBSTANCE') {
        //奖品已发放 实体
        orderStatus = intl.get('order.provided');
      } else if (data.productType === 'VIRTUAL') {
        //虚拟
        orderStatus = intl.get('order.provided');
      } else if (data.productType === 'COIN') {
        //go币
        orderStatus = intl.get('order.provided');
      }
    } else if (data.status === 'REFUNDED') {
      //已退款
      orderStatus = intl.get('order.refunded');
      colorStatus = '#333333';
    } else if (data.status === 'COIN_RECYCLE') {
      //已经兑换Go币
      orderStatus = intl.get('order.coin_recycle', { moneyVirtualCn: moneyVirtualCn });
      colorStatus = '#666666';
    } else if (data.status === 'WAIT_CASH') {
      //待兑现
      orderStatus = intl.get('order.wait_cash');
      colorStatus = '#666666';
    } else if (data.status === 'CASHED') {
      // 已兑现
      orderStatus = intl.get('order.cashed');
      colorStatus = '#666666';
    }
    return (
      <div className={styles.box}>
        <div className={styles.orderBox}>
          <img className={styles.orderImg} src={data.pic}></img>
          <div className={styles.orderInfo}>
            <div className={styles.orderTitle}>
              第{data.currentTurn}轮 {data.activityName}
            </div>
            <div className={styles.status}>
              <div className={styles.state} style={{ color: colorStatus }}>
                {orderStatus}
              </div>
              {data.status === 'WAIT_CASH' ? <div className={styles.apply}>审核中</div> : null}
              {data.status === 'WIN' ? (
                <Link
                  to={{
                    pathname: `/product/${data.activityTurnId}`,
                    search: `?lang=${lang}`,
                  }}
                >
                  <div className={styles.btn} onClick={this.onDetailClick.bind(this)}>去确认</div>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.winInfo}>
          {data.status === 'NO_CONFIRM' ? (
            <div className={styles.confirmInfo}>
              需要确认信息之后才会发奖哦，超过24小时未确认将自动流奖
            </div>
          ) : null}
          {data.shoppingAddress ? (
            <div className={styles.address}>收货地址：{data.shoppingAddress}</div>
          ) : null}
          {data.remark ? <div className={styles.sendRemark}>发货备注：{data.remark}</div> : null}
          {data.cardNumber ? (
            <div className={styles.virtual}>
              <div className={styles.card}>卡号{data.cardNumber}</div>
              <div className={styles.copy} onClick={this.onCopyClick.bind(this, data.cardNumber)}>
                复制
              </div>
            </div>
          ) : null}
          {data.cardSecretKey ? (
            <div className={styles.virtual}>
              <div className={styles.card}>卡密{data.cardSecretKey}</div>
              <div
                className={styles.copy}
                onClick={this.onCopyClick.bind(this, data.cardSecretKey)}
              >
                复制
              </div>
            </div>
          ) : null}
          <div className={styles.detailBox}>
            <div className={styles.winTime}>
              中奖时间： {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
            </div>
            {data.status === 'COIN_RECYCLE' ||
            data.status === 'WAIT_CASH' ||
            data.status === 'CASHED' ? (
              <div className={styles.detail} onClick={this.onDetailDialogClick.bind(this, data.status,data.orderId)}>
                兑换详情
              </div>
            ) : null}
          </div>
          <div className={styles.orderId}>订单ID：{data.orderNumber}</div>
        </div>
      </div>
    );
  }
  onDetailClick(data) {
    console.log('跳转到详情页', data);
    this.props.history.push(`/product/${data.activityTurnId}?lang=${lang}`);
  }

  onCopyClick(copyContent) {
    if (copy(copyContent)) {
      Toast.info('复制成功', 2);
    } else {
      Toast.info('复制失败', 2);
    }
  }
  onDetailDialogClick(status, orderId) {
    if (status === 'COIN_RECYCLE') {
      this.props.parent.setGoCoinDialog(true, orderId);
    } else if (status === 'WAIT_CASH' || status === 'CASHED') {
      this.props.parent.setCashDialog(true, orderId);
    }
  }
}

export default Win;
