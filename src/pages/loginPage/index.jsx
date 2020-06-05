import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import loginBg from '@/assets/images/loginBg.png';
import styles from './index.less';

class Login extends PureComponent {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.loginPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => console.log('onLeftClick')}
        >
          登录
        </NavBar>
        <img src={loginBg} alt="" className={styles.banner} />
        <div className={styles.loginBox}>
          <span className={styles.title}>注册/登录</span>
          <InputItem
            {...getFieldProps('autofocus')}
            clear
            placeholder="auto focus"
            ref={el => (this.autoFocusInst = el)}
          >
            标题
          </InputItem>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(createForm()(Login));
