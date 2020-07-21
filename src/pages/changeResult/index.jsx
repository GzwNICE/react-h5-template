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
                ? `已成功兑换 ${money} ${config.moneyVirtualCn}`
                : `兑换现金申请已提交`
            }
          />
          {type === 'coins' ? (
            <p className={styles.monTips}>可在我的-我的GO币查看GO入账明细</p>
          ) : null}
          {type === 'cash' ? (
            <ul className={styles.virtual}>
              <li className={styles.virTips}>
                GaGaGO已对接第三方礼品回收公司，会在1-7个工作日奖品将卖给第三方公司，并处理你的提现申请。
              </li>
              <li className={styles.virTips}>您可在 我的 - 已中奖 中查看兑换进度。</li>
            </ul>
          ) : null}
          <Button type="primary" className={styles.backButton} onClick={this.goBack}>
            返回主页
          </Button>
        </div>
        <div className={styles.recommendBox}>
          <span className={styles.title}>系统推荐</span>
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
