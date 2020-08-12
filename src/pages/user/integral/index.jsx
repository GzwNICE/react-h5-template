/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Toast, Modal, Button } from 'antd-mobile';
import intl from 'react-intl-universal';
// import copy from 'copy-to-clipboard';
// import Empty from '@/components/empty';
// import send from '@/assets/images/ic_step1_send.png';
// import man from '@/assets/images/ic_step2_man.png';
// import coin from '@/assets/images/ic_step3_coin.png';
// import direction from '@/assets/images/direction.png';
// import gold from '@/assets/images/invite_list_ic_gold.png';
// import silver from '@/assets/images/invite_list_ic_silver.png';
// import copper from '@/assets/images/invite_list_ic_copper.png';
// import icCopy from '@/assets/images/ic_copy.png';
// import question from '@/assets/images/ic_question.png';
import integralBlank from '@/assets/images/integralBlank.png';

import styles from './index.less';

class Integral extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.integral}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          className={styles.navBar}
        >
          我的积分
        </NavBar>
        <div className={styles.vacancy}>
          <img src={integralBlank} alt="" className={styles.blank} />
          <span className={styles.forward}>敬请期待</span>
          <span className={styles.tips}>程序员正在建设中…</span>
        </div>
        <div className={styles.listBox}>
          <div></div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Integral);
