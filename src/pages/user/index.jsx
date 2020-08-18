/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Grid, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import authorImg from '@/assets/images/avatar_notlogin.png';
import ic_gocoin_s from '@/assets/images/ic_gocoin_s.png';
import goin_arrow from '@/assets/images/personal_ic_arrow@2x.png';
import wait from '@/assets/images/ic_waiting.png';
import win from '@/assets/images/ic_gift.png';
import nowin from '@/assets/images/ic_order.png';
import evaluation from '@/assets/images/ic_evaluation.png';
import integral from '@/assets/images/credits.png';
import invitation from '@/assets/images/ic_invitation.png';
import join from '@/assets/images/ic_join.png';
import help from '@/assets/images/ic_service.png';
import feedback from '@/assets/images/ic_feedback.png';
import setting from '@/assets/images/ic_set.png';
import styles from './index.less';

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
    this.props.history.push(`/personal`);
  }
  onPayListClick() {
    this.props.history.push(`/paylist`);
  }
  onMyServerClick(_el) {
    if (this.state.isLogin) {
      //1:分享好友; 2:加入社群; 3:帮助中心; 4:意见反馈; 5:设置;
      this.props.history.push(`/${_el.type}`);
    } else {
      //登录
      this.props.history.push(`/login`);
    }
  }

  render() {
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const tabs = [
      { label: intl.get('user.wait_open'), icon: wait, type: 1 },
      { label: intl.get('user.winning'), icon: win, type: 2 },
      { label: intl.get('user.nowin'), icon: nowin, type: 3 },
      { label: intl.get('user.str_title_show_order'), icon: evaluation, type: 4 },
    ];
    const tabServer = [
      {
        label: intl.get('integral.myIntegral'),
        icon: integral,
        type: 'integral',
        tips: intl.get('integral.collar', { moneyVirtualCn: config.moneyVirtualCn }),
      },
      {
        label: intl.get('user.invitation'),
        icon: invitation,
        type: 'invitation',
        tips: intl.get('user.str_click_getmoney'),
      },
      { label: intl.get('user.join'), icon: join, type: 'join' },
      { label: intl.get('user.help'), icon: help, type: 'help' },
      { label: intl.get('user.feedback'), icon: feedback, type: 'feedback' },
      { label: intl.get('user.setting'), icon: setting, type: 'set' },
    ];
    const { user } = this.props;
    const { IPhoneX, isLogin } = this.state;
    return (
      <div className={styles.userPage}>
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
                      ? `${intl.get('user.myGoCoin1', {
                          moneyVirtualCn: config.moneyVirtualCn,
                          goMoney: user.userInfo.goMoney,
                        })}`
                      : `${intl.get('user.myGoCoin', { moneyVirtualCn: config.moneyVirtualCn })}`}
                  </span>
                  <img className={styles.arrow} src={goin_arrow}></img>
                </div>
                {isLogin ? (
                  <div
                    className={styles.goTopUp}
                    onClick={() => {
                      this.props.history.push('/payment');
                    }}
                  >
                    {intl.get('user.deCharge')}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.order}>
            <div className={styles.myorder}>{intl.get('user.myorder')}</div>
            <Grid
              data={tabs}
              columnNum={4}
              hasLine={false}
              onClick={_el => {
                if (isLogin) {
                  if (_el.type == '4') {
                    this.props.history.push(`/evaluation`);
                  } else {
                    this.props.history.push(`/order?label=${_el.label}&type=${_el.type}`);
                  }
                } else {
                  this.props.history.push(`/login`);
                }
              }}
              renderItem={item => (
                <div className={styles.item1}>
                  <img src={item.icon} className={styles.icon} alt="" />
                  <div className={styles.label} style={{ marginTop: '5px' }}>
                    {item.label}
                  </div>
                </div>
              )}
            />
          </div>
          <div className={styles.order}>
            <div className={styles.myorder}>{intl.get('user.myServer')}</div>
            <Grid
              data={tabServer}
              columnNum={4}
              hasLine={false}
              onClick={_el => {
                this.onMyServerClick(_el);
              }}
              renderItem={item => (
                <div className={styles.item2}>
                  <img src={item.icon} className={styles.icon} alt="" />
                  <div className={styles.label} style={{ marginTop: '5px' }}>
                    {item.label}
                  </div>
                  {item.tips ? <div className={styles.itemInfo}>{item.tips}</div> : ''}
                </div>
              )}
            />
          </div>
        </div>
        <div className={`${styles.tBar} ${IPhoneX === 'true' ? `${styles.tBarIPhone}` : null}`}>
          <TabBarBox selectedTab="userPage" />
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
