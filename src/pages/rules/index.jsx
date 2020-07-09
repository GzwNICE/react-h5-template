import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
// import md5 from 'md5';
// import intl from 'react-intl-universal';
import { NavBar, Icon, List, Button } from 'antd-mobile';
// import { Link } from 'react-router-dom';
// import { createForm } from 'rc-form';
// import loginBg from '@/assets/images/loginBg.png';
// import passwordClose from '@/assets/images/passwordClose.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import { format } from '@/utils/util';
import styles from './index.less';

const Item = List.Item;

class RulePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.activityTurnId,
    };
  }

  componentDidMount() {
    const { getLists } = this.props;
    getLists({ activityTurnId: this.state.id });
  }

  render() {
    const { rules } = this.props;
    const list = rules.orders;
    const head = () => {
      return (
        <div className={styles.header}>
          <span className={styles.username}>用户名</span>
          <span className={styles.code}>抽奖号码</span>
          <span className={styles.time}>购买时间（时间因子）</span>
        </div>
      );
    };
    return (
      <div className={styles.rules}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          计算规则
        </NavBar>
        <div className={styles.content}>
          <div className={styles.title}>展示最后100条购买记录</div>
          <List renderHeader={head}>
            {list &&
              list.map(i => {
                return (
                  <Item key={i.prizesCode}>
                    <div className={styles.listItem}>
                      <span className={styles.username}>{i.name}</span>
                      <span className={styles.code}>{i.prizesCode}</span>
                      <span className={styles.time}>
                        {format(i.distributeTime, 'arr')[0]}
                        <span style={{ color: '#FF9F0A' }}>
                          {' '}
                          {format(i.distributeTime, 'arr')[1]}
                        </span>
                      </span>
                    </div>
                  </Item>
                );
              })}
          </List>
          <div className={styles.footer}>
            <h4>计算规则：</h4>
            <p>{`1. 求和，抽取最后100条购买记录，取时/分/秒/毫秒，相加之和为 ${rules.totalMillis} `}</p>
            <p>{`2. 取余，时间因子相加之和除以本轮活动需要参与的总人数： ${rules.totalMillis} / ${rules.partakeCount} = ${rules.remainder}`}</p>
            <p>{`3. 结果：余数+第一位抽奖号码 = ${rules.remainder} + ${
              rules.firstPrizesCode
            } = ${rules.remainder + rules.firstPrizesCode}`}</p>
            <Button className={styles.winCode}>{`中奖号码：${rules.prizesCode}`}</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  rules: state.product.data.rules,
});

const mapDispatch = dispatch => ({
  getLists: params => dispatch.product.getRules(params),
});

export default connect(mapState, mapDispatch)(RulePage);
