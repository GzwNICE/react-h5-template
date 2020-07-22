/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { NavBar, Icon, Result, Button, Toast, Flex } from 'antd-mobile';
// import { createForm } from 'rc-form';
// import { getBaseUrl } from '@/utils/util';
import copy from 'copy-to-clipboard';
import ActivityCard from '@/components/activityCard';
import receiveSuccess from '@/assets/images/receiveSuccess.png';
import exchangeSucceed from '@/assets/images/exchange_pic_succeed.png';
import styles from './index.less';

class ChangeResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: queryString.parse(window.location.search).type,
    };
  }

  componentDidMount() {
    Toast.loading('Loading...', 0);
    const { getOpenList } = this.props;
    const params = {
      page: 1,
      size: 100,
    };
    getOpenList(params).then(() => {
      Toast.hide();
    });
  }

  handleCopy = value => {
    if (copy(value)) {
      Toast.info(`${intl.get('result.copySuccess')}`, 2);
    } else {
      Toast.info(`${intl.get('result.copyError')}`, 2);
    }
  };

  goBack = () => {
    this.props.history.push('/home');
  };

  render() {
    const { type } = this.state;
    const money = type === 'coins' ? queryString.parse(window.location.search).money : '';
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { endList } = this.props;
    return (
      <div className={styles.changeResult}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={this.goBack}
        >
          {intl.get('payment.str_change_gocoin')}
        </NavBar>
        <div className={styles.resultContent}>
          <Result
            img={
              <img
                src={type === 'coins' ? exchangeSucceed : receiveSuccess}
                className={styles.successPic}
                alt=""
              />
            }
            title={
              type === 'coins'
                ? `${intl.get('exchange.changeSuccess', {
                    money: money,
                    moneyVirtualCn: config.moneyVirtualCn,
                  })}`
                : `${intl.get('exchange.cashApplication')}`
            }
          />
          {type === 'coins' ? (
            <p className={styles.monTips}>
              {intl.get('exchange.text1', { moneyVirtualCn: config.moneyVirtualCn })}
            </p>
          ) : null}
          {type === 'cash' ? (
            <ul className={styles.virtual}>
              <li className={styles.virTips}>{intl.get('exchange.text2')}</li>
              <li className={styles.virTips}>{intl.get('exchange.text3')}</li>
            </ul>
          ) : null}
          <Button type="primary" className={styles.backButton} onClick={this.goBack}>
            {intl.get('exchange.backHome')}
          </Button>
        </div>
        <div className={styles.recommendBox}>
          <span className={styles.title}>{intl.get('exchange.system')}</span>
          <Flex wrap="wrap" justify="between">
            {endList.data.map(i => {
              return (
                <div key={i.id} className={styles.hotItem}>
                  <ActivityCard data={i} recommend />
                </div>
              );
            })}
          </Flex>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  endList: state.home.data.endList,
});

const mapDispatch = dispatch => ({
  getOpenList: params => dispatch.home.fetchGetEndList(params),
});

export default connect(mapState, mapDispatch)(ChangeResult);
