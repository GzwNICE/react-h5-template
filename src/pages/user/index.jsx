/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Grid, Button, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import authorImg from '@/assets/images/avatar_notlogin.png';
import ic_gocoin_s from '@/assets/images/ic_gocoin_s.png';
import goin_arrow from '@/assets/images/personal_ic_arrow@2x.png';
import arrow_right from '@/assets/images/ic_arrow_white.png';
import wait from '@/assets/images/ic_waiting.png';
import win from '@/assets/images/ic_gift.png';
import nowin from '@/assets/images/ic_order.png';
import queryString from 'query-string';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      isLogin: localStorage.getItem('token') != null,
    };
  }

  componentDidMount() {
    // this.props.history.push('/login');
    const { userInfo } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      userInfo();
    }
  }
  loginCLick() {
    this.props.history.push(`/login`);
  }
  onPersonClick() {
    // this.props.history.push(`/personal`);
  }
  onPayListClick() {
    this.props.history.push(`/paylist`);
  }
  feedBackClick() {
    this.props.history.push(`/feedback`);
  }

  handlerOutLogin = () => {
    localStorage.removeItem('token');
    this.setState({
      isLogin: false,
    });
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const tabs = [
      { label: intl.get('user.wait_open'), icon: wait, type: 1 },
      { label: intl.get('user.winning'), icon: win, type: 2 },
      { label: intl.get('user.nowin'), icon: nowin, type: 3 },
    ];
    const { user } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));
    const { IPhoneX, isLogin } = this.state;
    return (
      <div>
        <div className={styles.topBox}>
          <NavBar className={styles.navBar}>{intl.get('user.title')}</NavBar>
          <div className={styles.authorInfo}>
            <img
              className={styles.authorImg}
              src={isLogin ? user.userInfo.photoUrl : authorImg}
              onClick={this.onPersonClick.bind(this)}
            ></img>
            <div className={styles.authorLoginType}>
              {!isLogin ? (
                <div className={styles.authorLogin} onClick={this.loginCLick.bind(this)}>
                  {intl.get('user.loginOrRegister')}
                </div>
              ) : (
                <div className={styles.authorName}>{user.userInfo.mobile}</div>
              )}
              <div className={styles.autoBox}>
                <div className={styles.authorCoin} onClick={this.onPayListClick.bind(this)}>
                  <img className={styles.coin} src={ic_gocoin_s}></img>
                  <span className={styles.label}>
                    {isLogin
                      ? `${intl.get('user.myGoCoin', { moneyVirtualCn: moneyVirtualCn })} ${
                          user.userInfo.goMoney
                        }`
                      : `${intl.get('user.myGoCoin', { moneyVirtualCn: moneyVirtualCn })}`}
                  </span>
                  <img className={styles.arrow} src={goin_arrow}></img>
                </div>
                {isLogin ? (<span
                  className={styles.goTopUp}
                  onClick={() => {
                    this.props.history.push('/payment');
                  }}
                >
                  {intl.get('user.deCharge')}
                </span>) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.order}>
            <div className={styles.myorder}>{intl.get('user.myorder')}</div>
            <Grid
              data={tabs}
              columnNum={3}
              hasLine={false}
              onClick={_el => {
                if (isLogin) {
                  this.props.history.push(`/order?label=${_el.label}&type=${_el.type}`);
                } else {
                  this.props.history.push(`/login`);
                }
              }}
              renderItem={item => (
                <div>
                  <img src={item.icon} className={styles.icon} alt="" />
                  <div className={styles.label} style={{marginTop:"5px"}}>{item.label}</div>
                </div>
              )}
            />
            <div className={styles.feedBack} onClick={this.feedBackClick.bind(this)}>
              <span className={styles.title}> {intl.get('user.feedback')}</span>
              <img className={styles.arrow} src={arrow_right} />
            </div>
          </div>
        </div>
        {isLogin ? (
          <Button onClick={this.handlerOutLogin} className={styles.outLogin}>
            {intl.get('user.logout')}
          </Button>
        ) : null}
        <div className={`${styles.tBar} ${IPhoneX === 'true' ? `${styles.tBarIPhone}` : null}`}>
          <TabBarBox selectedTab="userPage" search={this.props.history.location.search} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data,
});

const mapDispatch = dispatch => ({
  userInfo: params => dispatch.user.getUserInfo(params),
});

export default connect(mapState, mapDispatch)(User);
