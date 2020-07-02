/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import { NavBar, Icon, Result, Button, Toast, Modal } from 'antd-mobile';
// import { createForm } from 'rc-form';
// import { getBaseUrl } from '@/utils/util';
import copy from 'copy-to-clipboard';
import receiveSuccess from '@/assets/images/receiveSuccess.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class AwardResults extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: queryString.parse(window.location.search).type, //SUBSTANCE->实体；VIRTUAL->虚拟；COIN->虚拟币
    };
  }

  handleCopy = value => {
    if (copy(value)) {
      Toast.info('复制成功', 2);
    } else {
      Toast.info('复制失败', 2);
    }
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  render() {
    const { type } = this.state;
    const { prize } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.result}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={this.goBack}
        >
          领取奖品
        </NavBar>
        <div className={styles.resultContent}>
          <Result
            img={<img src={receiveSuccess} className={styles.successPic} alt="" />}
            title="领取成功！"
            message={
              <div>
                {type === 'SUBSTANCE' ? (
                  <p className={styles.textTips}>
                    工作人员会在1-5个工作日内与你联系 <br />
                    感谢您的支持，祝您生活愉快！
                  </p>
                ) : type === 'COIN' ? (
                  <p
                    className={styles.monH2}
                  >{`奖品 ${config.moneyVirtualCn} X ${prize.coinCount}`}</p>
                ) : (
                  <p>{prize.productName}</p>
                )}
              </div>
            }
          />
          {type === 'COIN' ? (
            <div>
              <p className={styles.monTips}>金币已发放到您的账户，可前往【个人中心】 中进行查看</p>
              <p className={styles.monTips}>感谢您的支持，祝您生活愉快！</p>
            </div>
          ) : null}
          {type === 'VIRTUAL' ? (
            <div className={styles.virtual}>
              <div className={styles.virBox}>
                {prize.cardNum ? (
                  <p className={styles.li}>
                    卡号：<span className={styles.num}>{prize.cardNum}</span>
                    <span className={styles.copy} onClick={() => this.handleCopy(prize.cardNum)}>
                      复制
                    </span>
                  </p>
                ) : null}
                <p className={styles.li}>
                  卡密：<span className={styles.num}>{prize.cardSecret}</span>
                  <span className={styles.copy} onClick={() => this.handleCopy(prize.cardSecret)}>
                    复制
                  </span>
                </p>
              </div>
              <p className={styles.virTips}>
                *卡密只允许充值到自己的手机号，若充值给其他用户造成的任何损失，平台概不负责。
              </p>
              <p className={styles.virTips2}>感谢您的支持，祝您生活愉快！</p>
            </div>
          ) : null}
          <Button type="primary" className={styles.backButton} onClick={this.goBack}>
            返回
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

export default connect(mapState, mapDispatch)(AwardResults);
