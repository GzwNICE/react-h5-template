// 首页
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tabs, NavBar, Icon } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import bg_label_vip from '@/assets/images/bg_label_vip.png';
import ic_income_coin from '@/assets/images/ic_income_coin.png';
import queryString from 'query-string';
import DetailList from '@/pages/user/paylist/detaillist';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => (
        <div style={{ ...style, zIndex: 1 }}>
          <Tabs.DefaultTabBar {...props} />
        </div>
      )}
    </Sticky>
  );
}
class PayList extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.history.push('/login');
    const { userInfo, goMoney } = this.props;
    userInfo();
    goMoney();
  }
  onHistoryClick() {
    this.props.history.push(`/payhistory?lang=${lang}`);
  };
  render() {
    const tabs = [{ title: '支出明细' }, { title: '收入明细' }];
    const { user, money } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));

    return (
      <div className={styles.home}>
        <NavBar
          mode="dark"
          style={{ backgroundColor: '#FF5209' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={<div onClick={this.onHistoryClick.bind(this)}>充值流水</div>}
        />
        <div className={styles.infoBox}>
          <div className={styles.pure_top}></div>
          <div className={styles.coinInfo}>
            <div className={styles.mycoin}>
              <img className={styles.bg} src={bg_label_vip}></img>
              <div className={styles.font}>我的{moneyVirtualCn}</div>
            </div>
            <div className={styles.useCoinTitle}>当前可用{moneyVirtualCn}</div>
            <div className={styles.useCoin}>{user.goMoney}</div>
            <img className={styles.bgStar} src={ic_income_coin}></img>
            <div className={styles.goPrepaid}>去充值</div>
            <div className={styles.coinStatus}>
              {money.inviterRewardGoMoney != 0 ? (
                <div className={styles.totalCoin}>赠币总量：{money.inviterRewardGoMoney}</div>
              ) : null}
              {money.expiringSoonGoMoney != 0 ? (
                <div className={styles.overdueCoin}>1天后过期：{money.expiringSoonGoMoney}</div>
              ) : null}
            </div>
          </div>
          <div style={{ marginTop: '40px' }} className={styles.tabsBox}>
            <StickyContainer>
              <Tabs //活动列表
                tabs={tabs}
                initialPage={0}
                swipeable={false}
                renderTabBar={renderTabBar}
                tabBarBackgroundColor="#fff"
                tabBarUnderlineStyle={{
                  border: '2px solid #FF5209',
                  width: '34%',
                  marginLeft: '8%',
                  borderRadius: '2px',
                }}
                tabBarActiveTextColor="#FF5209"
                tabBarInactiveTextColor="#333333"
              >
                <DetailList type="OUT" />
                <DetailList type="IN" />
              </Tabs>
            </StickyContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data.userInfo,
  money: state.user.data.goMoney,
});

const mapDispatch = dispatch => ({
  userInfo: params => dispatch.user.getUserInfo(params),
  goMoney: params => dispatch.user.getGoMoney(params),
});

export default connect(mapState, mapDispatch)(PayList);
