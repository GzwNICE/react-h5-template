/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import loginBg from '@/assets/images/loginBg.png';
import passwordClose from '@/assets/images/passwordClose.png';
import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      mobile: '',
      pwVisible: false,
    };
  }

  handleNextClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) return;
      console.log(value);
      if (!value.mobile) {
        return Toast.info('请输入手机号', 2);
      } else {
        this.setState({
          login: true,
          mobile: value.mobile,
        });
      }
    });
  };

  handleLoginClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.password) {
        return Toast.info('请输入登录密码', 2);
      } else {
        console.log(value);
      }
    });
  };

  ShowPassWord = () => {
    this.setState({
      pwVisible: !this.state.pwVisible,
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { login, mobile, pwVisible } = this.state;
    return (
      <div className={styles.loginPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => console.log('onLeftClick')}
        />
        <img src={loginBg} alt="" className={styles.banner} />
        {!login ? (
          <div className={styles.loginBox}>
            <span className={styles.title}>注册/登录</span>
            <div className={styles.mobileBox}>
              <span className={styles.area}>+84</span>
              <InputItem
                {...getFieldProps('mobile')}
                clear
                placeholder="请输入手机号"
                ref={el => (this.autoFocusInst = el)}
                className={styles.mobile}
              ></InputItem>
            </div>
            <span className={styles.tips}>* 未注册的手机号验证后将自动创建账号</span>
            <Button type="primary" onClick={this.handleNextClick} className={styles.nextBut}>
              下一步
            </Button>
          </div>
        ) : (
          <div className={styles.loginBox}>
            <span className={styles.title}>欢迎回来</span>
            <div className={styles.loginMobile}>+84 {mobile}</div>
            <div className={`${styles.mobileBox} ${styles.passBox}`}>
              <InputItem
                {...getFieldProps('password')}
                clear
                placeholder="请输入登录密码"
                type={pwVisible ? 'text' : 'password'}
                className={styles.password}
              ></InputItem>
              <img
                src={pwVisible ? passwordOpen : passwordClose}
                alt=""
                className={styles.passClose}
                onClick={this.ShowPassWord}
              />
            </div>
            <Button type="primary" className={styles.nextBut} onClick={this.handleLoginClick}>
              登录
            </Button>
            <Link to="/home" className={styles.forgetPassword}>
              忘记密码？
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(createForm()(Login));
