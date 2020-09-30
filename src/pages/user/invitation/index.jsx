import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, Toast, Modal, Button } from 'antd-mobile';

import intl from 'react-intl-universal';
import copy from 'copy-to-clipboard';
import send from '@/assets/images/ic_step1_send.png';
import man from '@/assets/images/ic_step2_man.png';
import coin from '@/assets/images/ic_step3_coin.png';
import direction from '@/assets/images/direction.png';

import pic_banner from '@/assets/images/pic_banner.png';

import styles from './index.less';

class Invitation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      codeModal: false,
      ranks: [],
    };
  }
  onRuleClick() {
    this.props.history.push(`/rule`);
  }

  onCopyClick(copyContent, e) {
    if (copy(copyContent)) {
      Toast.info(intl.get('order.str_copy_success'), 2);
    }
  }
  onRewardMoreClick() {
    this.props.history.push(`/reward`);
  }
  onRankMoreClick() {
    this.props.history.push(`/rank`);
  }
  modalEvent(e) {
    this.setState({
      codeModal: e,
    });
  }
  onShareClick() {
    navigator.share({});
  }
  componentDidMount() {
    const isLogin = localStorage.getItem('mobile');
    if (!isLogin) {
      this.props.history.push(`/login`);
      return;
    }
  }
  render() {
    return (
      <div className={styles.help}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => this.props.history.go(-1)}
        >
          邀请好友
        </NavBar>
        <div className={styles.container}>
          <div className={styles.shareHeader}>
            <img className={styles.shareBanner} src={pic_banner}></img>
            <div className={styles.flBox}>
              <div className={styles.itemBox}>
                <span className={styles.tt}>待结算返利</span>
                <span className={styles.bb}>¥0.0</span>
              </div>
              <div className={styles.itemBox}>
                <span className={styles.tt}>可提现余额</span>
                <span className={styles.bb}>¥0.0</span>
              </div>
            </div>
            <div className={styles.shareRule}>
              <div className={styles.ruleBox}>
                <div className={styles.ruleItem}>
                  <img className={styles.ruleImg} src={send}></img>
                  <div className={styles.ruleContent}>
                    发送邀请
                    <br />
                    给好友
                  </div>
                </div>
                <img className={styles.ruleNext} src={direction}></img>
                <div className={styles.ruleItem}>
                  <img className={styles.ruleImg} src={man}></img>
                  <div className={styles.ruleContent}>
                    好友注册
                    <br />
                    并完成购买
                  </div>
                </div>
                <img className={styles.ruleNext} src={direction}></img>
                <div className={styles.ruleItem}>
                  <img className={styles.ruleImg} src={coin}></img>
                  <div className={styles.ruleContent}>
                    获得相应
                    <br />
                    佣金比例
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.invitationBg}>
            <img src={`${window.location.origin}/my/qrcode/1HGK5_100*100.png`} alt="" />
          </div>
          <div className={styles.bgBox}>
            <div className={styles.head}>我的返利记录</div>
            <div className={styles.line}>暂无内容</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  canUse: params => dispatch.user.getData(params),
  ranks: params => dispatch.user.getData(params),
  shareConfig: params => dispatch.user.getData(params),
});

export default connect(mapState, mapDispatch)(Invitation);
