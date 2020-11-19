import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Grid, List } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import avatar from '@/assets/images/avatar.png';
import crown from '@/assets/images/crown.png';
import hot from '@/assets/images/hot.png';
import styles from './index.less'

const Item = List.Item;
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      isLogin: localStorage.getItem('mobile'),
      channel: localStorage.getItem('AppId'),
    };
  }

  listClick (url) {
    this.props.history.push(url);
  }

  loginCLick = () => {
    this.props.history.push(`/login`);
  }

  render() {
    const { isLogin, channel } = this.state;
    const gridData = [
      {
        icon: require('@/assets/images/wallet.png'),
        text: '钱包',
      },
      {
        icon: require('@/assets/images/VIP.png'),
        text: '会员',
      },
      {
        icon: require('@/assets/images/bill.png'),
        text: '账单',
      }
    ];
    const list1 = [
      {
        icon: require('@/assets/images/ic_invitation.png'),
        text: '邀请有奖',
        hot: true
      },
      {
        icon: require('@/assets/images/ic_zhaopin.png'),
        text: '技师招募',
        hot: true
      },
      {
        icon: require('@/assets/images/ic_teach.png'),
        text: '预约教程',
      },
      {
        icon: require('@/assets/images/ic_ping.png'),
        text: '我的评价',
      }
    ];
    const list2 = [
      {
        icon: require('@/assets/images/ic_service.png'),
        text: '帮助中心',
      },
      {
        icon: require('@/assets/images/feedback.png'),
        text: '意见反馈',
        url: '/feedBack'
      },
      {
        icon: require('@/assets/images/ic_set.png'),
        text: '设置',
      }
    ];
    return (
      <div className={styles.userPage}>
        <div className={styles.header}>
          <img src={avatar} alt="" className={styles.avatar} />
          {isLogin ? (
            <div className={styles.authorName}>
              <span className={styles.username}>098****4111</span>
              <span className={styles.code}>推广码：1HE6H</span>
            </div>
          ): (
            <div className={styles.authorLogin} onClick={this.loginCLick}>注册/登录</div>
          )}
        </div>
        <div className={styles.gridBox}>
          <Grid data={gridData} columnNum={3} hasLine={false} itemStyle={{ height: 80 }} activeStyle={false} />
          <div className={styles.vipBox}>
            <div className={styles.ll}>
              <img src={crown} alt=""/>
              <span className={styles.kt}>开通会员</span>
              <span className={styles.dg}>免出行费(定金) 50元</span>
            </div>
            <span className={styles.bt}>立即开通</span>
          </div>
        </div>
        <List className={styles.list}>
          {list1.map(i => {
            return (
              <Item
                thumb={i.icon}
                arrow="horizontal"
                onClick={() => this.listClick(i.url)}
                key={i.text}
              >
                {i.text}
                {i.hot ? <img src={hot} alt="" className={styles.hotImg}/> : null}
              </Item>
            )
          })}
        </List>
        <List className={styles.list}>
          {list2.map(i => {
            return (
              <Item
                thumb={i.icon}
                arrow="horizontal"
                onClick={() => this.listClick(i.url)}
                key={i.text}
              >
                {i.text}
                {i.hot ? <img src={hot} alt="" className={styles.hotImg}/> : null}
              </Item>
            )
          })}
        </List>
        <TabBarBox selectedTab="user" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
