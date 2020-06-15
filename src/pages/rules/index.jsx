import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import md5 from 'md5';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import loginBg from '@/assets/images/loginBg.png';
import passwordClose from '@/assets/images/passwordClose.png';
import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class RulePage extends PureComponent {
  render() {
    return (
      <div className={styles.rules}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          计算规则
        </NavBar>
        <div className={styles.content}>
          <div className={styles.title}>展示最后100条购买记录</div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(RulePage);
