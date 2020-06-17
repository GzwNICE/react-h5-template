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

const { lang } = queryString.parse(window.location.search);
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      mobile: '',
      pwVisible: false,
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push(`/home?lang=${lang}`);
      return;
    }
    const { mobile } = queryString.parse(window.location.search);
    this.setState({
      mobile,
      login: mobile ? true : false,
    });
  }

  handleNextClick = e => {
    e.preventDefault();
    const { judgeUser } = this.props;
    const Reg = /^[0-9]*$/;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.mobile) {
        return Toast.info('请输入手机号', 2);
      } else if (!Reg.test(value.mobile)) {
        return Toast.info('请输入正确的手机号', 2);
      } else {
        this.setState({
          mobile: value.mobile,
        });
        judgeUser({
          mobile: value.mobile,
          countryCode: '84',
        }).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.setState({
                login: true,
              });
            } else {
              // eslint-disable-next-line react/destructuring-assignment
              this.props.history.push(`/register?lang=${lang}&mobile=${value.mobile}`);
            }
          }
        });
      }
    });
  };

  handleLoginClick = e => {
    e.preventDefault();
    const { login } = this.props;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.password) {
        return Toast.info('请输入登录密码', 2);
      } else {
        login({
          mobile: this.state.mobile,
          checkCode: md5(value.password),
          type: 'password',
          countryCode: '84',
        }).then(res => {
          if (res.code === 200) {
            Toast.success('登录成功', 2);
            localStorage.setItem('token', `Bearer ${res.data.token}`);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            setTimeout(() => {
              this.props.history.go(-1);
            }, 2000);
          }
        });
      }
    });
  };

  ShowPassWord = () => {
    this.setState({
      pwVisible: !this.state.pwVisible,
    });
  };

  // focus = e => {
  //   this[e].focus();
  // };

  render() {
    const { getFieldProps } = this.props.form;
    const { login, mobile, pwVisible } = this.state;
    return (
      <div className={styles.loginPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
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
                className={styles.mobile}
                ref={el => (this.mobileInput = el)}
                onClick={() => {
                  this.mobileInput.focus();
                }}
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
                ref={el => (this.pawInput = el)}
                onClick={() => {
                  this.pawInput.focus();
                }}
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
            <Link
              to={{
                pathname: '/password',
                search: `${this.props.history.location.search}`,
                state: { mobile: mobile },
              }}
              className={styles.forgetPassword}
            >
              忘记密码？
            </Link>
          </div>
        )}
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
