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
import sale from '@/assets/images/ic_return.png';
import invitation1 from '@/assets/images/ic_invitation@3x.png';
import evaluation1 from '@/assets/images/ic_evaluation@3x.png';
import join1 from '@/assets/images/ic_join@3x.png';
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
      // isLogin: true,
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

  listJump(url) {
    if (this.state.isLogin) {
      this.props.history.push(url)
    } else {
      this.props.history.push(`/login`);
    }
  }

  render() {
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const tabs = [
      { label: '待付款', icon: wait, type: '1' },
      { label: '待发货', icon: win, type: '2' },
      { label: '待收货', icon: nowin, type: '3' },
      { label: '已完成', icon: evaluation, type: '4' },
      { label: '退换/售后', icon: sale, type: '5' },
    ];
    const list1 = [
      {text: '邀请好友', thumb: invitation1, url: '/invitation'},
      {text: '我的评价', thumb: evaluation1, url: '/evaluation'},
      {text: '加入社区', thumb: join1, url: '/miss?title=加入社区'}
    ]
    const list2 = [
      {text: '帮助中心', thumb: service1, url: '/miss?title=帮助中心'},
      {text: '意见反馈', thumb: feedback1, url: '/feedback'},
      {text: '设置', thumb: set1, url: '/set'}
    ]
    const { user } = this.props;
    const { IPhoneX, isLogin } = this.state;
    return (
      <div className={styles.userPage}>
        <div className={styles.topBox}>
          <NavBar className={styles.navBar}>{intl.get('user.title')}</NavBar>
          <div className={styles.authorInfo}>
            <img
              className={styles.authorImg}
              src={authorImg}
              onClick={this.onPersonClick.bind(this)}
            ></img>
            <div className={styles.authorLoginType}>
              {!isLogin ? (
                <div className={styles.authorLogin} onClick={this.loginCLick.bind(this)}>
                  {intl.get('user.loginOrRegister')}
                </div>
              ) : (
                <div className={styles.authorName}>{isLogin}</div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.order}>
            <div className={styles.myorder}>
              <span className={styles.left}>{intl.get('user.myorder')}</span>
              <span className={styles.right} onClick={() => this.toOrder('0')}>查看全部订单</span>
            </div>
            <Grid
              data={tabs}
              columnNum={5}
              hasLine={false}
              onClick={_el => {
                if (isLogin) {
                  if (_el.type == '5') {
                    this.props.history.push(`/evaluation`);
                  } else {
                    this.props.history.push(`/order/${_el.type}`);
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
            <List>
              {list1.map(i=> {
                return (
                  <Item
                  key={i.text}
                  thumb={i.thumb}
                  arrow="horizontal"
                  onClick={() => this.listJump(i.url)}
                >{i.text}</Item>)
              })}
            </List>
          </div>
          <div className={styles.order}>
          <List>
            {list2.map(i=> {
              return (
                <Item
                key={i.text}
                thumb={i.thumb}
                arrow="horizontal"
                onClick={() => this.listJump(i.url)}
              >{i.text}</Item>)
            })}
          </List>
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
