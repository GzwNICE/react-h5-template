import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
// import md5 from 'md5';
import intl from 'react-intl-universal';
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
          <span className={styles.username}>{intl.get('rules.userName')}</span>
          <span className={styles.code}>{intl.get('rules.lotteryNumbers')}</span>
          <span className={styles.time}>{intl.get('rules.purchaseTime')}</span>
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
          {intl.get('rules.calculationRules')}
        </NavBar>
        <div className={styles.content}>
          <div className={styles.title}>{intl.get('rules.displayRecords')}</div>
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
            <h4>{intl.get('rules.calculationRules')}：</h4>
            <p>{`${intl.get('rules.tips1')} ${rules.totalMillis} `}</p>
            <p>{`${intl.get('rules.tips1')}： ${rules.totalMillis} / ${rules.partakeCount} = ${rules.remainder}`}</p>
            <p>{`${intl.get('rules.tips1')} = ${rules.remainder} + ${
              rules.firstPrizesCode
            } = ${rules.remainder + rules.firstPrizesCode}`}</p>
            <Button className={styles.winCode}>{`${intl.get('product.prizeNumber')}：${rules.prizesCode}`}</Button>
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
