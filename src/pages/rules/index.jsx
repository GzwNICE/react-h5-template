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
    getLists({ activityTurnId: 1042 });
  }

  render() {
    const { rules } = this.props;
    const list = rules.orders;
    const data = Array.from(new Array(100)).map(() => ({
      i: 1,
    }));
    console.log(this.props);
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
                        2019-10-03 <span style={{ color: '#FF9F0A' }}>09：36：01：878</span>
                      </span>
                    </div>
                  </Item>
                );
              })}
          </List>
          <div className={styles.footer}>
            <h4>计算规则：</h4>
            <p>1. 求和，抽取最后100条购买记录，取时/分/秒/毫秒，相加之和为 9348134966 </p>
            <p>2. 取余，时间因子相加之和除以本轮活动需要参与的总人数： 9348134966 / 3499 = 145（余数）</p>
            <p>3. 结果：余数+第一位抽奖号码 = 145 + 10000001 = 100000146</p>
            <Button className={styles.winCode}>中奖号码：10000146</Button>
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
