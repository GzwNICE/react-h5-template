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
import ic_vip from '@/assets/images/ic_vip@2x.png';
import evaluation from '@/assets/images/ic_evaluation.png';
import sale from '@/assets/images/ic_return.png';
import ic_jiLu from '@/assets/images/czjl.png';
import invitation1 from '@/assets/images/ic_invitation@3x.png';
import evaluation1 from '@/assets/images/ic_evaluation@3x.png';
import teach from '@/assets/images/ic_teach@3x.png';
import service1 from '@/assets/images/ic_service@3x.png';
import feedback1 from '@/assets/images/ic_feedback@3x.png';
import set1 from '@/assets/images/ic_set@3x.png';
import { List } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;
class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      isLogin: localStorage.getItem('mobile'),
      channel: localStorage.getItem('AppId'),
    };
  }

  componentDidMount() {
    // this.props.history.push('/login');
    // const { userInfo } = this.props;
    // const token = localStorage.getItem('token');
    // if (token) {
    //   userInfo();
    // }
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

  toOrder(type) {
    if (this.state.isLogin) {
      this.props.history.push(`/order/${type}`);
    } else {
      this.props.history.push(`/login`);
    }
  }

  goSure = () => {
    const login = localStorage.getItem('mobile');
    if (login) {
      this.props.history.push(`/prize`);
    }else {
      this.props.history.push(`/login`);
    }
  };

  listJump(url) {
    if (this.state.isLogin) {
      this.props.history.push(url);
    } else {
      this.props.history.push(`/login`);
    }
  }

  render() {
    // const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const list1 = [
      { text: '充值记录', thumb: ic_jiLu, url: `/miss?title=充值记录` },
      { text: '邀请好友', thumb: invitation1, url: `/invitation?t=${new Date().getTime()}` },
      { text: '我的评价', thumb: evaluation1, url: '/evaluation' },
      { text: '安装教程', thumb: teach, url: '/order' },
    ];
    const list2 = [
      { text: '帮助中心', thumb: service1, url: '/help' },
      { text: '意见反馈', thumb: feedback1, url: '/feedback' },
      { text: '设置', thumb: set1, url: '/set' },
    ];
    // const { user } = this.props;
    const { IPhoneX, isLogin, channel } = this.state;
    return (
      <div className={styles.userPage}>
        <div className={styles.topBox}>
          <NavBar className={styles.navBar}>{intl.get('user.title')}</NavBar>
          <div className={styles.authorInfo}>
            <img className={styles.authorImg} src={authorImg}></img>
            <div className={styles.authorLoginType}>
              {!isLogin ? (
                <div className={styles.authorLogin} onClick={this.loginCLick.bind(this)}>
                  {intl.get('user.loginOrRegister')}
                </div>
              ) : (
                <div className={styles.authorName}>
                  <span>{isLogin}</span>
                  <span className={styles.channel}>{`推广码: ${channel}`}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.vipBox} onClick={this.goSure}>
          <img src={ic_vip} alt="" className={styles.left} />
          <span className={styles.center}>开通服务<span className={styles.ty}>新用户首次专项1日体验卡</span></span>
          <div className={styles.right}>立即前往</div>
        </div>
        <div className={styles.order}>
          <List>
            {list1.map(i => {
              return (
                <Item
                  key={i.text}
                  thumb={i.thumb}
                  arrow="horizontal"
                  onClick={() => this.listJump(i.url)}
                >
                  {i.text}
                </Item>
              );
            })}
          </List>
        </div>
        <div className={styles.order}>
          <List>
            {list2.map(i => {
              return (
                <Item
                  key={i.text}
                  thumb={i.thumb}
                  arrow="horizontal"
                  onClick={() => this.listJump(i.url)}
                >
                  {i.text}
                </Item>
              );
            })}
          </List>
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
