/* eslint-disable react/destructuring-assignment */
// 首页
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tabs, NavBar, Icon } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
import bg_label_vip from '@/assets/images/bg_label_vip.png';
import ic_income_coin from '@/assets/images/ic_income_coin.png';
import queryString from 'query-string';
import OutList from '@/pages/user/paylist/outList';
import InList from '@/pages/user/paylist/inList';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class PayList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }
  componentDidMount() {
    const { userInfo, goMoney } = this.props;
    userInfo();
    goMoney();
  }

  handlerTabClick = (tab, index) => {
    console.log(tab, index);
    this.setState({
      tabIndex: index,
    });
  };

  onHistoryClick() {
    this.props.history.push(`/payhistory`);
  }

  onPayClick() {
    this.props.history.push(`/payment`);
  }

  render() {
    const tabs = [{ title: '支出明细' }, { title: '收入明细' }];
    const { user, money } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));
    const { tabIndex } = this.state;
    return (
      <div className={styles.payListPage}>
        <NavBar
          mode="dark"
          style={{ backgroundColor: '#FF5209' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.push('/user')}
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
            <div className={styles.goPrepaid} onClick={this.onPayClick.bind(this)}>
              去充值
            </div>
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
            <Tabs //活动列表
              tabs={tabs}
              swipeable={false}
              tabBarBackgroundColor="#fff"
              tabBarUnderlineStyle={{
                border: '2px solid #FF5209',
                width: '34%',
                marginLeft: '8%',
                borderRadius: '2px',
              }}
              tabBarActiveTextColor="#FF5209"
              tabBarInactiveTextColor="#333333"
              onTabClick={this.handlerTabClick}
            >
              <OutList type="OUT" />
              <InList type="IN" />
            </Tabs>
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
