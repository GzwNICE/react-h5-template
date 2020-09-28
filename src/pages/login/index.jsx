import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import loginBg from '@/assets/images/bg_login@2x.png';
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
      lang: Cookies.get('lang'),
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('mobile');
    if (token) {
      this.props.history.push(`/home`);
      return;
    }
  }

  handleLoginClick = e => {
    e.preventDefault();
    const { login } = this.props;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.mobile) {
        return Toast.info('请填写手机号', 2);
      } else if (!value.password) {
        return Toast.info('请输入密码', 2);
      } else {
        login({
          mobile: value.mobile.replace(/\s*/g, ""),
          password: md5(value.password),
        }).then(res => {
          if (res.code === 200) {
            Toast.success(`${intl.get('login.success')}`, 2);
            localStorage.setItem('mobile', value.mobile.replace(/\s*/g, ""));
            setTimeout(() => {
              // eslint-disable-next-line react/destructuring-assignment
              this.props.history.go(-1);
            }, 2000);
          }
        });
      }
    });
  };

  // focus = e => {
  //   this[e].focus();
  // };

  render() {
    const { getFieldProps } = this.props.form;
    const { login, mobile, pwVisible, lang } = this.state;
    return (
      <div className={styles.loginPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navbar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          登录
        </NavBar>
        <img src={loginBg} alt="" className={styles.banner} />

          <div className={styles.loginBox}>
            <div className={`${styles.mobileBox}`}>
              <InputItem
                {...getFieldProps('mobile')}
                placeholder="请填写手机号"
                type="phone"
                className={styles.mobile}
                ref={el => (this.moInput = el)}
                onClick={() => {
                  this.moInput.focus();
                }}
                onBlur={() => {
                  window.scrollTo(0, 0);
                }}
              ></InputItem>
            </div>
            <div className={`${styles.mobileBox} ${styles.passBox}`}>
              <InputItem
                {...getFieldProps('password')}
                placeholder="请输入密码"
                type="password"
                className={styles.password}
                ref={el => (this.pawInput = el)}
                onClick={() => {
                  this.pawInput.focus();
                }}
                onBlur={() => {
                  window.scrollTo(0, 0);
                }}
              ></InputItem>
            </div>
            <Button type="primary" className={styles.nextBut} onClick={this.handleLoginClick}>
              {intl.get('login.login')}
            </Button>
            <Link
              to={{
                pathname: '/register',
                search: `${this.props.history.location.search}`,
                state: { mobile: mobile },
              }}
              className={styles.forgetPassword}
            >
              没有账号？点击注册
            </Link>
          </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  judgeUser: params => dispatch.login.exist(params),
  login: params => dispatch.login.login(params),
});

export default connect(mapState, mapDispatch)(createForm()(Login));
