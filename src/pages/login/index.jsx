import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import styles from './index.less';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: qs.parse(window.location.search).redirect,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const mobile = localStorage.getItem('mobile');
    if (mobile) {
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
          mobile: value.mobile.replace(/\s*/g, ''),
          password: value.password,
        }).then(res => {
          if (res.code === 200) {
            Toast.success(`${intl.get('login.success')}`, 2);
            localStorage.setItem('mobile', value.mobile.replace(/\s*/g, ''));
            setTimeout(() => {
              this.props.history.go(-1);
            }, 2000);
          }
        });
      }
    });
  };

  toRegister = () => {
    const { redirect } = this.state;
    if (redirect) {
      this.props.history.push(`/register?redirect=${redirect}`);
    } else {
      this.props.history.push(`/register`);
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
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
          账号登录
        </NavBar>
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
            登录
          </Button>
          <div onClick={this.toRegister} className={styles.forgetPassword}>
            没有账号？点击注册
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  login: params => dispatch.home.login(params),
});

export default connect(mapState, mapDispatch)(createForm()(Login));
