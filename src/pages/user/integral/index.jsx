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
        Toast.success(`${intl.get('integral.exchangeSuccess')}`, 2);
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
          {intl.get('integral.myIntegral')}
        </NavBar>
        <div className={styles.vacancy}>
          <img src={integralBlank} alt="" className={styles.blank} />
          <span className={styles.forward}>{intl.get('integral.stayTuned')}</span>
          <span className={styles.tips}>{intl.get('integral.construction')}</span>
        </div>
        <div className={styles.listBox}>
          <div style={{ backgroundImage: `url(${integralBg})` }} className={styles.topBox}>
            <span
              className={styles.turnover}
              onClick={() => this.props.history.push('/integral/turnover')}
            >
              {intl.get('integral.turnover')}
            </span>
            <span className={styles.tle1}>{intl.get('integral.available')}</span>
            <span className={styles.number}>{numFormat(pointData.points)}</span>
            <span className={styles.change}>{`${intl.get('integral.interchangeable')} ${
              pointData.exchangeGoMoney
            } ${config.moneyVirtualCn}`}</span>
            {pointData.exchangeGoMoney < 1 ? null : (
              <span className={styles.goCoin} onClick={this.handlerClose}>{`${intl.get(
                'payment.str_change_gocoin'
              )} ${config.moneyVirtualCn}`}</span>
            )}
            <span className={styles.expired}>{`${intl.get('integral.expireAfter')} ${
              pointData.expiredSoonPoints
            }`}</span>
          </div>
          <div className={styles.subtitle}>{intl.get('integral.noviceTask')}</div>
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
          <div className={styles.subtitle}>{intl.get('integral.missionHall')}</div>
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
          <div className={styles.noMore}>{intl.get('integral.noMore')}</div>
        </div>
        <Modal
          visible={changeModal}
          transparent
          maskClosable={false}
          title={intl.get('integral.redemption')}
          style={{ width: '3.02rem' }}
          className={styles.changeModal}
        >
          <div className={styles.content}>
            <img src={changeModalImg} alt="" className={styles.changeModalImg} />
            <p className={styles.text1}>{`${intl.get(
              'integral.willConsume'
            )} ${pointData.exchangeGoMoney * pointData.exchangeGoMoneyRadio} ${intl.get(
              'integral.redeem'
            )} ${pointData.exchangeGoMoney} ${config.moneyVirtualCn}`}</p>
            <p className={styles.text2}>
              {intl.get('integral.redemptionTips', { moneyVirtualCn: config.moneyVirtualCn })}
            </p>
            <div className={styles.buttonGroup}>
              <Button type="primary" className={styles.cancel} onClick={this.handlerClose}>
                {intl.get('user.cancel')}
              </Button>
              <Button type="primary" className={styles.determine} onClick={this.handleChange}>
                {intl.get('user.confirm')}
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
