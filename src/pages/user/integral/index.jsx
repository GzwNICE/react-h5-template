/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Toast, Modal, Button } from 'antd-mobile';
import intl from 'react-intl-universal';
// import Empty from '@/components/empty';
import IntegralCard from '@/components/integralCard';
import changeModalImg from '@/assets/images/changeModal.png';
import integralBg from '@/assets/images/integral_bg.png';
import integralBlank from '@/assets/images/integralBlank.png';

import styles from './index.less';

class Integral extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changeModal: false,
    };
  }

  handlerClose = () => {
    this.setState({
      changeModal: !this.state.changeModal,
    });
  };

  render() {
    const { changeModal } = this.state;
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
          <div style={{ backgroundImage: `url(${integralBg})` }} className={styles.topBox}>
            <span
              className={styles.turnover}
              onClick={() => this.props.history.push('/integral/turnover')}
            >
              积分流水
            </span>
            <span className={styles.tle1}>可用积分</span>
            <span className={styles.number}>20,000</span>
            <span className={styles.change}>可换 20 Go币</span>
            <span className={styles.goCoin} onClick={this.handlerClose}>兑换GO币</span>
            <span className={styles.expired}>1天后过期积分 1908</span>
          </div>
          <div className={styles.subtitle}>新手任务</div>
          <div className={styles.noviceTask}>
            <IntegralCard type="noviceTask" last />
          </div>
          <div className={styles.subtitle}>任务大厅</div>
          <div className={styles.noviceTask}>
            <IntegralCard type="noviceTask" schedule last />
          </div>
          <div className={styles.noMore}>- 没有更多内容了-</div>
        </div>
        <Modal
          visible={changeModal}
          transparent
          maskClosable={false}
          title="兑换提醒"
          style={{ width: '3.02rem' }}
          className={styles.changeModal}
        >
          <div className={styles.content}>
            <img src={changeModalImg} alt="" className={styles.changeModalImg} />
            <p className={styles.text1}>您将消耗 5000 积分兑换 1 GO币</p>
            <p className={styles.text2}>
              GO币是GaGaGo平台为答谢用户提供的回馈服务，因此通过积分兑换的GO币，不可退款，不可撤销。
            </p>
            <div className={styles.buttonGroup}>
              <Button type="primary" className={styles.cancel} onClick={this.handlerClose}>
                取消
              </Button>
              <Button type="primary" className={styles.determine}>
                确定
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Integral);
