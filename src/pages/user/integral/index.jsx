/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Toast, Modal, Button } from 'antd-mobile';
import intl from 'react-intl-universal';
import { numFormat } from '@/utils/util';
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

  componentDidMount() {
    const { points, task } = this.props;
    points();
    task();
  }

  handlerClose = () => {
    this.setState({
      changeModal: !this.state.changeModal,
    });
  };

  handleChange = () => {
    const { exchange, points } = this.props;
    exchange().then(res => {
      if (res.code === 200) {
        this.setState({
          changeModal: false,
        });
        Toast.success('兑换成功！', 2);
        points();
      }
    });
  };

  jump = link => {
    this.props.history.push(`${link}`);
  };

  render() {
    const { changeModal } = this.state;
    const { pointData, taskData } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
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
            <span className={styles.number}>{numFormat(pointData.points)}</span>
            <span
              className={styles.change}
            >{`可换 ${pointData.exchangeGoMoney} ${config.moneyVirtualCn}`}</span>
            {pointData.exchangeGoMoney < 1 ? null : (
              <span
                className={styles.goCoin}
                onClick={this.handlerClose}
              >{`兑换${config.moneyVirtualCn}`}</span>
            )}
            <span className={styles.expired}>{`1天后过期积分 ${pointData.expiredSoonPoints}`}</span>
          </div>
          <div className={styles.subtitle}>新手任务</div>
          <div className={styles.noviceTask}>
            {taskData.newer
              ? taskData.newer.map((i, index) => {
                  return (
                    <IntegralCard
                      type="noviceTask"
                      data={i}
                      last={index === taskData.newer.length - 1}
                      key={i.taskScene}
                      jump={this.jump}
                    />
                  );
                })
              : null}
          </div>
          <div className={styles.subtitle}>任务大厅</div>
          <div className={styles.noviceTask}>
            {taskData.task
              ? taskData.task.map((i, index) => {
                  return (
                    <IntegralCard
                      type="noviceTask"
                      schedule
                      data={i}
                      last={index === taskData.task.length - 1}
                      key={i.taskScene}
                      jump={this.jump}
                    />
                  );
                })
              : null}
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
            <p className={styles.text1}>{`您将消耗 ${pointData.exchangeGoMoney *
              pointData.exchangeGoMoneyRadio} 积分兑换 ${pointData.exchangeGoMoney} ${
              config.moneyVirtualCn
            }`}</p>
            <p className={styles.text2}>
              {`${config.moneyVirtualCn}是GaGaGo平台为答谢用户提供的回馈服务，因此通过积分兑换的${config.moneyVirtualCn}，不可退款，不可撤销。`}
            </p>
            <div className={styles.buttonGroup}>
              <Button type="primary" className={styles.cancel} onClick={this.handlerClose}>
                取消
              </Button>
              <Button type="primary" className={styles.determine} onClick={this.handleChange}>
                确定
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  pointData: state.integral.data.pointData,
  taskData: state.integral.data.taskData,
});

const mapDispatch = dispatch => ({
  points: params => dispatch.integral.points(params),
  task: params => dispatch.integral.task(params),
  exchange: params => dispatch.integral.exchange(params),
});

export default connect(mapState, mapDispatch)(Integral);
