import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import intl from 'react-intl-universal';
import bgMiddle from '@/assets/images/bg_middle.png';
import gold from '@/assets/images/ic_gold_1@2x.png';
import silver from '@/assets/images/ic_silver_2@2x.png';
import copper from '@/assets/images/ic_copper_3@2x.png';

import styles from './index.less';

class Rank extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ranks: [],
      myRank: {},
    };
  }
  componentDidMount() {
    const { ranks, myRank, userInfo } = this.props;
    userInfo();
    ranks({ url: '/app/inviter/reward/income/rank' }).then(res => {
      this.setState({
        ranks: res.data,
      });
    });
    myRank({ url: '/app/inviter/reward/user/rank' }).then(res => {
      this.setState({
        myRank: res.data,
      });
    });
  }
  render() {
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const {ranks,myRank} = this.state
    const { user } = this.props;
    console.log("user",user)
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.str_ranking')}
        </NavBar>
        <div className={styles.rankTopThree}>
          <div className={styles.secAndThree}>
            <div className={styles.rank}>
              <img className={styles.logo} src={silver}></img>
              <div className={styles.name}>{ranks[1] != null ? ranks[1].inviterName: ''}</div> 
              <div className={styles.reawrd}>{ranks[1] != null ?ranks[1].cumulativeReward: ''}</div> 
            </div>
            <div className={styles.rank}>
              <img className={styles.logo} src={copper}></img>
              <div className={styles.name} style={{ color: '#e9a9a9' }}>
                {ranks[2] != null?ranks[2].inviterName:""}
              </div>
              <div className={styles.reawrd}>{ranks[2] != null?ranks[2].cumulativeReward:''}</div>
            </div>
          </div>
          <img className={styles.logoBg} src={bgMiddle}></img>
          <div className={styles.rank1}>
            <img className={styles.logo} src={gold}></img>
            <div className={styles.name}>{ranks[0] != null?ranks[0].inviterName:''}</div>
            <div className={styles.reawrd}>{ranks[0] != null?ranks[0].cumulativeReward:''}</div>
          </div>
        </div>
        <div className={styles.rankEnd}>
          <div className={styles.titleBox}>
            <div className={styles.num}>{intl.get('user.str_ranking_title')}</div>
            <div className={styles.name}>{intl.get('user.str_inviter_account_number')}</div>
            <div className={styles.reawrd}>{intl.get('user.str_reward')}</div>
          </div>
          {ranks.map((item,index) => {
            if (index >= 3) {
            return  <div className={styles.itemBox}>
                <div className={styles.num}>{index+1}.</div>
            <div className={styles.name}>{item.inviterName}</div>
                  <div className={styles.reawrd}>
                    {item.cumulativeReward}
                    {config.moneyVirtualCn}
                  </div>
              </div>
              }
             })}
        </div>
        <div className={styles.myRankBox}>
       <img className={styles.myIcon} src={user.userInfo.photoUrl}></img>
          <div className={styles.myRank}>
            {myRank.userCumulativeReward !=0?<div className={styles.num}>No.{myRank.userRank}</div>:""}  
          {myRank.userCumulativeReward !=0? <div className={styles.me}>{intl.get('user.str_rank_me')}</div>:""}
          {myRank.userCumulativeReward !=0?"":  <div className={styles.noRank}>{intl.get('user.str_no_ranking')}</div>}
          </div>
          <div className={styles.totalRewarBox}>
            <div className={styles.totalRewardTitle}>{intl.get('user.str_total_rewards')}</div>
            <div className={styles.totalReward}>{myRank.userCumulativeReward} {config.moneyVirtualCn}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data,
});

const mapDispatch = dispatch => ({
  ranks: params => dispatch.user.getData(params),
  myRank: params => dispatch.user.getData(params),
  userInfo: params => dispatch.user.getUserInfo(params),

  clearList: params => dispatch.user.clearRewardList(params),
});

export default connect(mapState, mapDispatch)(Rank);
