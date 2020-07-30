import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, Toast } from 'antd-mobile';
import intl from 'react-intl-universal';
import copy from 'copy-to-clipboard';
import Empty from '@/components/empty';
import send from '@/assets/images/ic_step1_send.png';
import man from '@/assets/images/ic_step2_man.png';
import coin from '@/assets/images/ic_step3_coin.png';
import direction from '@/assets/images/direction.png';
import gold from '@/assets/images/invite_list_ic_gold.png';
import silver from '@/assets/images/invite_list_ic_silver.png';
import copper from '@/assets/images/invite_list_ic_copper.png';
import icCopy from '@/assets/images/ic_copy.png';
import question from '@/assets/images/ic_question.png';

import pic_banner from '@/assets/images/pic_banner.png';

import styles from './index.less';

class Invitation extends PureComponent {
  constructor(props) {
    super(props);
  }
  onRuleClick() {
    console.log('onRuleClick');
  }
  onQuestionClick() {
    console.log('onQuestionClick');
  }
  onCopyClick(copyContent) {
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
  componentDidMount() {}
  render() {
    const isEmpty = false;

    return (
      <div className={styles.help}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          rightContent={<div onClick={this.onRuleClick}>规则</div>}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.invitation')}
        </NavBar>
        {isEmpty ? (
          <Empty />
        ) : (
          <div className={styles.container}>
            <div className={styles.shareHeader}>
              <img className={styles.shareBanner} src={pic_banner}></img>
              <div className={styles.shareRule}>
                <div className={styles.ruleBox}>
                  <div className={styles.ruleItem}>
                    <img className={styles.ruleImg} src={send}></img>
                    <div className={styles.ruleContent}>发送邀请<br/>给好友</div>
                  </div>
                  <img className={styles.ruleNext} src={direction}></img>
                  <div className={styles.ruleItem}>
                    <img className={styles.ruleImg} src={man}></img>
                    <div className={styles.ruleContent}>好友注册<br/>并完成充值</div>
                  </div>
                  <img className={styles.ruleNext} src={direction}></img>
                  <div className={styles.ruleItem}>
                    <img className={styles.ruleImg} src={coin}></img>
                    <div className={styles.ruleContent}>获得相应<br/>奖励比例</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.invitationBg}>
              <div className={styles.title}>我的邀请链接</div>
              <div className={styles.invitationBox}>
                <div className={styles.invitationLink}>https://vngagago.com/invite/6-dc4fbf1-dc4fb...</div>
                <img
                  className={styles.copy}
                  src={icCopy}
                  onClick={this.onCopyClick.bind('https://vngagago.com/invite/6-dc4fbf1-dc4fb')}
                ></img>
              </div>
              <div className={styles.share}>分享</div>
            </div>
            <div className={styles.bgBox}>
              <div className={styles.rewardHead}>
                <div className={styles.head}>我的奖励</div>
                <div className={styles.more} onClick={this.onRewardMoreClick.bind(this)}>更多</div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.rewardInfo}>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>Tỉ lệ phân<br/>chia</div>
                  <img
                    className={styles.question}
                    src={question}
                    onClick={this.onQuestionClick}
                  ></img>
                  <div className={styles.infoValue}>10%</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>Số người<br/>chia sẻ</div>
                  <div className={styles.infoValue}>10</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>Tích luỹ GO xu<br/>thưởng</div>
                  <div className={styles.infoValue}>10</div>
                </div>
              </div>
            </div>
            <div className={styles.bgBox}>
              <div className={styles.rewardHead}>
                <div className={styles.head}>收益排行</div>
                <div className={styles.more} onClick={this.onRankMoreClick.bind(this)}>更多</div>
              </div>
              <div className={styles.item}>
                <img className={styles.rankImg} src={gold}></img>
                <div className={styles.rankName}>n***kf</div>
                <div className={styles.rankAmount}>3219 GO币</div>
              </div>
              <div className={styles.item}>
                <img className={styles.rankImg} src={silver}></img>
                <div className={styles.rankName}>n***kf</div>
                <div className={styles.rankAmount}>3219 GO币</div>
              </div>
              <div className={styles.item}>
                <img className={styles.rankImg} src={copper}></img>
                <div className={styles.rankName}>n***kf</div>
                <div className={styles.rankAmount}>3219 GO币</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Invitation);
