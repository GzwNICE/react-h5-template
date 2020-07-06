/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import { NavBar, Icon, Result, Button } from 'antd-mobile';
// import { createForm } from 'rc-form';
import { numFormat } from '@/utils/util';
// import copy from 'copy-to-clipboard';
import receiveSuccess from '@/assets/images/receiveSuccess.png';
import receiveError from '@/assets/images/receiveError.png';
import resultTips from '@/assets/images/resultTips.png';
import styles from './index.less';

class PayResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: queryString.parse(window.location.search).status,
      data: queryString.parse(window.location.search),
      time: null,
    };
  }

  componentDidMount() {
    const time = this.getLocalTime(queryString.parse(window.location.search).purchaseTime);
    this.setState({
      time,
    });
  }

  goBack = () => {
    if (this.state.type === '0') {
      this.props.history.push('/paylist');
    } else {
      this.props.history.push('/payment');
    }
  };

  getLocalTime = nS => {
    return `${nS[0]}${nS[1]}${nS[2]}${nS[3]}-${nS[4]}${nS[5]}-${nS[6]}${nS[7]} ${nS[8]}${nS[9]}:${nS[10]}${nS[11]}`;
  };

  render() {
    const { type, data, time } = this.state;
    // const { prize } = this.props;
    const { moneySymbol, moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.result}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={this.goBack}
        >
          {type === '0' ? `支付成功` : `支付异常`}
        </NavBar>
        <div className={styles.resultContent}>
          <Result
            img={
              <img
                src={type === '0' ? receiveSuccess : receiveError}
                className={styles.successPic}
                alt=""
              />
            }
            title={type === '0' ? `支付成功！` : `支付服务异常！`}
            message={
              <div>
                {type === '0' ? (
                  <p
                    className={styles.monH2}
                  >{`已经成功兑换 ${data.goMoneyTotal} ${moneyVirtualCn}`}</p>
                ) : (
                  <p className={styles.monH2}>
                    若您的银行卡已扣款，可在 我的-我的GO币 页面查询GO币是否充值成功
                  </p>
                )}
              </div>
            }
          />
          {type === '0' ? (
            <div className={styles.successBox}>
              <p className={styles.monTips}>{`支付金额： ${numFormat(
                data.amount
              )} ${moneySymbol}`}</p>
              <p className={styles.monTips}>{`支付时间：${time}`}</p>
              <div className={styles.tipBox}>
                <img src={resultTips} alt="" className={styles.tipImg} />
                <span className={styles.tipText}>
                  GO币会在5分钟之内到账，请耐心等待，如有疑问可咨询客服。
                </span>
              </div>
            </div>
          ) : (
            <p className={styles.virTips2}>{`时间：${time}`}</p>
          )}
          <Button type="primary" className={styles.backButton} onClick={this.goBack}>
            {type === '0' ? '返回' : '重新支付'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  prize: state.prize.data.prize,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(PayResult);
