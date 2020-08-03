import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, Toast, Modal, Button } from 'antd-mobile';
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
    this.state = {
      codeModal: false,
    };
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
  modalEvent(e) {
    this.setState({
      codeModal: e,
    });
  }
  componentDidMount() {}
  render() {
    const isEmpty = false;
    const { codeModal } = this.state;
    return (
      <div className={styles.help}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          rightContent={<div onClick={this.onRuleClick}>{intl.get('user.str_rules')}</div>}
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
                    <div className={styles.ruleContent}>{intl.get('user.str_send_friend')}</div>
                  </div>
                  <img className={styles.ruleNext} src={direction}></img>
                  <div className={styles.ruleItem}>
                    <img className={styles.ruleImg} src={man}></img>
                    <div className={styles.ruleContent}>{intl.get('user.str_register_finish')}</div>
                  </div>
                  <img className={styles.ruleNext} src={direction}></img>
                  <div className={styles.ruleItem}>
                    <img className={styles.ruleImg} src={coin}></img>
                    <div className={styles.ruleContent}>{intl.get('user.str_get_goin')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.invitationBg}>
        <div className={styles.title}>{intl.get('user.str_my_share_link')}</div>
              <div className={styles.invitationBox}>
                <div className={styles.invitationLink}>https://vngagago.com/invite/6-dc4fbf1-dc4fb...</div>
                <img
                  className={styles.copy}
                  src={icCopy}
                  onClick={this.onCopyClick.bind('https://vngagago.com/invite/6-dc4fbf1-dc4fb')}
                ></img>
              </div>
              <div className={styles.share}>{intl.get('user.str_share')}</div>
            </div>
            <div className={styles.bgBox}>
              <div className={styles.rewardHead}>
                <div className={styles.head}>{intl.get('user.str_my_reward')}</div>
                <div className={styles.more} onClick={this.onRewardMoreClick.bind(this)}>{intl.get('user.str_show_more')}</div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.rewardInfo}>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>分成比例</div>
                  <img
                    className={styles.question}
                    src={question}
                    onClick={this.modalEvent.bind(this, true)}
                  ></img>
                  <div className={styles.infoValue}>10%</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>邀请人数</div>
                  <div className={styles.infoValue}>10</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>累计go币奖励</div>
                  <div className={styles.infoValue}>10</div>
                </div>
              </div>
            </div>
            <div className={styles.bgBox}>
              <div className={styles.rewardHead}>
                <div className={styles.head}>{intl.get('user.str_ranking')}</div>
                <div className={styles.more} onClick={this.onRankMoreClick.bind(this)}>{intl.get('user.str_show_more')}</div>
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

        <Modal
          visible={codeModal}
          transparent
          maskClosable={false}
          title={<div className={styles.dialogTitle}>{intl.get('user.str_proportion_dividends')}</div>}
        >
          <div className={styles.dialogContent1}>{intl.get('user.str_proportion_dividends_content')}</div>
          <div className={styles.dialogContent2}>{intl.get('user.str_proportion_dividends_remind')}</div>
          <Button className={styles.cancel} onClick={this.modalEvent.bind(this, false)}>
            {intl.get('order.know')}
          </Button>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Invitation);
