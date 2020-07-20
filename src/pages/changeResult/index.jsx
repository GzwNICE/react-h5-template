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
      type: queryString.parse(window.location.search).type, //SUBSTANCE->实体；VIRTUAL->虚拟；COIN->虚拟币
    };
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
    const { prize } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const list = [
      {
        activityId: '110',
        activityName: 'jiesi 活动状态jiesi 活动状态jiesi 活动状态jiesi 活动状态',
        activityTurnId: '1635',
        addWinRate: 0.3,
        cartEnable: 0,
        currentTurn: 10,
        imgUrl:
          'https://legend-oss-public.oss-cn-hangzhou.aliyuncs.com/product/1592896721706495.jpg',
        isTop: 0,
        isTopTime: 631123200000,
        participatePrice: '0',
        productId: '35',
        productName: '手机活动',
        progressRate: 0,
        remainingCount: 3300,
        startTime: 1594893733000,
      },
      {
        activityId: '110',
        activityName: 'jiesi 活动状态',
        activityTurnId: '1636',
        addWinRate: 0.3,
        cartEnable: 0,
        currentTurn: 10,
        imgUrl:
          'https://legend-oss-public.oss-cn-hangzhou.aliyuncs.com/product/1592896721706495.jpg',
        isTop: 0,
        isTopTime: 631123200000,
        participatePrice: '0',
        productId: '35',
        productName: '手机活动',
        progressRate: 0,
        remainingCount: 3300,
        startTime: 1594893733000,
      },
      {
        activityId: '110',
        activityName: 'jiesi 活动状态',
        activityTurnId: '1638',
        addWinRate: 0.3,
        cartEnable: 0,
        currentTurn: 10,
        imgUrl:
          'https://legend-oss-public.oss-cn-hangzhou.aliyuncs.com/product/1592896721706495.jpg',
        isTop: 0,
        isTopTime: 631123200000,
        participatePrice: '0',
        productId: '35',
        productName: '手机活动',
        progressRate: 0,
        remainingCount: 3300,
        startTime: 1594893733000,
      },
    ];
    return (
      <div className={styles.changeResult}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={this.goBack}
        >
          兑换
        </NavBar>
        <div className={styles.resultContent}>
          <Result
            img={
              <img
                src={type === 'go' ? exchangeSucceed : receiveSuccess}
                className={styles.successPic}
                alt=""
              />
            }
            title={type === 'go' ? `已成功兑换 3712 GO币` : `兑换现金申请已提交`}
          />
          {type === 'go' ? <p className={styles.monTips}>可在我的-我的GO币查看GO入账明细</p> : null}
          {type === '1' ? (
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
            {list.map(i => {
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
  prize: state.prize.data.prize,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ChangeResult);
