import React, { PureComponent } from 'react';
import { Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import TabBarBox from '@/components/tabBar';
import authorImg from '@/assets/images/avatar_notlogin.png';
import ic_gocoin_s from '@/assets/images/ic_gocoin_s.png';
import goin_arrow from '@/assets/images/personal_ic_arrow@2x.png';
import arrow_right from '@/assets/images/ic_arrow_white.png';
import wait from '@/assets/images/ic_waiting.png';
import win from '@/assets/images/ic_gift.png';
import nowin from '@/assets/images/ic_order.png';
import styles from './index.less';
import cookie from 'js-cookie';
class User extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.history.push('/login');
  }
  loginCLick() {
    this.props.history.push('/login');
  }
  feedBackClick() {
    // eslint-disable-next-line react/destructuring-assignment
    cookie.set('userId', 'asdasd');
    console.log(cookie.get('userId'));
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const tabs = [
      { label: '待开奖', icon: wait },
      { label: '已中奖', icon: win },
      { label: '未中奖', icon: nowin },
    ];
    return (
      <div>
        <div className={styles.topBox}>
          <div className={styles.title}>{intl.get('user.title')}</div>
          <div className={styles.authorInfo}>
            <img className={styles.authorImg} src={authorImg}></img>
            <div className={styles.authorLoginType}>
              <div className={styles.authorName} onClick={this.loginCLick.bind(this)}>{intl.get('user.loginOrRegister')}</div>
              <div className={styles.authorCoin}>
                <img className={styles.coin} src={ic_gocoin_s}></img>
                <span className={styles.label}>{intl.get('user.myGoCoin')}</span>
                <img className={styles.arrow} src={goin_arrow}></img>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.order}>
            <div className={styles.myorder}>我的订单</div>
            <Grid
              data={tabs}
              columnNum={3}
              hasLine={false}
              onClick={_el => console.log(_el)}
              renderItem={item => (
                <div>
                  <img src={item.icon} className={styles.icon} alt="" />
                  <div className={styles.label}>{item.label}</div>
                </div>
              )}
            />
            <div className={styles.feedBack} onClick={this.feedBackClick.bind(this)}>
              <span className={styles.title}>意见反馈</span>
              <img className={styles.arrow} src={arrow_right} />
            </div>
          </div>
        </div>
        <div className={styles.tBar}>
          <TabBarBox selectedTab="userPage" />
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(User);
