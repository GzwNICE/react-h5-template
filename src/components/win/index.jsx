/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';
// import queryString from 'query-string';
import moment from 'moment';
import queryString from 'query-string';

import { Link } from 'react-router-dom';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

// const { lang } = queryString.parse(window.location.search);

class Win extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, push } = this.props;
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
      colorStatus = '#666666';
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
      <div className={styles.box} onClick={() => {push(`/product/${data.activityTurnId}`)}}>
        <div className={styles.orderBox}>
          <div className={styles.orderImg}>
            <img src={data.pic}></img>
          </div>
          <div className={styles.orderInfo}>
            <div className={styles.orderTitle}>
              {intl.get('order.str_current_turn')} {data.currentTurn} {data.activityName}
            </div>
            <div className={styles.status}>
              <div className={styles.state} style={{ color: colorStatus }}>
                {orderStatus}
              </div>
              {data.status === 'WAIT_CASH' ? (
                <div className={styles.apply}>{intl.get('order.str_show_applying')}</div>
              ) : null}
              {data.status === 'WIN' ? (
                <div className={styles.btn} onClick={this.onDetailClick.bind(this, data.activityTurnId)}>
                  {intl.get('order.str_go_confirm')}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.winInfo}>
          {data.status === 'NO_CONFIRM' ? (
            <div className={styles.confirmInfo}>{intl.get('order.str_need_24later')}</div>
          ) : null}
          {data.shoppingAddress ? (
            <div className={styles.address}>
              {intl.get('order.str_getproduct_address')}
              {data.shoppingAddress}
            </div>
          ) : null}
          {data.remark ? (
            <div className={styles.sendRemark}>
              {intl.get('order.str_send_reamrk')}
              {data.remark}
            </div>
          ) : null}
          {data.cardNumber ? (
            <div className={styles.virtual}>
              <div className={styles.card}>
                {intl.get('order.str_card_number')}
                {data.cardNumber}
              </div>
              <div className={styles.copy} onClick={this.onCopyClick.bind(this, data.cardNumber)}>
                {intl.get('order.str_copy')}
              </div>
            </div>
          ) : null}
          {data.cardSecretKey ? (
            <div className={styles.virtual}>
              <div className={styles.card}>
                {intl.get('order.str_card_secret_key')}
                {data.cardSecretKey}
              </div>
              <div
                className={styles.copy}
                onClick={this.onCopyClick.bind(this, data.cardSecretKey)}
              >
                {intl.get('order.str_copy')}
              </div>
            </div>
          ) : null}
          <div className={styles.detailBox}>
            <div className={styles.winTime}>
              {intl.get('order.str_winning_time')}
              {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
            </div>
            {data.status === 'COIN_RECYCLE' ||
            data.status === 'WAIT_CASH' ||
            data.status === 'CASHED' ? (
              <div
                className={styles.detail}
                onClick={this.onDetailDialogClick.bind(this, data.status, data.orderId)}
              >
                {intl.get('order.str_winget_detail')}
              </div>
            ) : null}
          </div>
          <div className={styles.orderId}>
            {intl.get('order.str_winning_orderid')}
            {data.orderNumber}
          </div>
        </div>
      </div>
    );
  }
  onDetailClick = (id, e) => {
    e.stopPropagation();
    const { getAwardRules, getAwardInfo } = this.props;
    getAwardRules({
      activityTurnId: id,
    }).then(res => {
      if (res.code === 200) {
        if (res.data.status === 0) {
          this.props.push(`/prize/${id}`);
          return;
        }
        if (res.data.status === 1) {
          // 无领奖规则，直接领取奖品，跳转领奖结果页
          getAwardInfo({ activityTurnId: id }).then(res => {
            if (res.code === 200) {
              this.props.push(`/awardResult?type=${res.data.productType}`);
            }
          });
          return;
        }
        if (res.data.status === 2) {
          // 有回收规则，跳转领奖方式选择页
          this.props.push(`/prizeSelection/${id}`);
          return;
        }
      }
    });
  };

  onCopyClick(copyContent) {
    if (copy(copyContent)) {
      Toast.info(intl.get('order.str_copy_success'), 2);
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

const mapState = state => ({
  detail: state.product.data.detail,
});

const mapDispatch = dispatch => ({
  getRules: params => dispatch.product.existRules(params),
  getAwardRules: params => dispatch.product.awardRule(params),
  getAwardInfo: params => dispatch.prize.result(params),
});

export default connect(mapState, mapDispatch)(Win);
