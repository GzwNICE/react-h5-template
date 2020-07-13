import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
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
      lang: Cookies.get('lang'),
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push(`/home`);
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
        return Toast.info(`${intl.get('login.ph1')}`, 2);
      } else if (!Reg.test(value.mobile)) {
        return Toast.info(`${intl.get('login.ph3')}`, 2);
      } else {
        this.setState({
          mobile: value.mobile,
        });
        judgeUser({
          mobile: value.mobile,
          countryCode: this.state.lang === 'zh' ? '86' : '84',
        }).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.setState({
                login: true,
              });
            } else {
              // eslint-disable-next-line react/destructuring-assignment
              this.props.history.push(`/register?mobile=${value.mobile}`);
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
        return Toast.info(`${intl.get('login.ph2')}`, 2);
      } else {
        login({
          mobile: this.state.mobile,
          checkCode: md5(value.password),
          type: 'password',
          countryCode: this.state.lang === 'zh' ? '86' : '84',
        }).then(res => {
          if (res.code === 200) {
            Toast.success(`${intl.get('login.success')}`, 2);
            localStorage.setItem('token', `Bearer ${res.data.token}`);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            setTimeout(() => {
              // eslint-disable-next-line react/destructuring-assignment
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
    const { login, mobile, pwVisible, lang } = this.state;
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
            <span className={styles.title}>{intl.get('login.loginReg')}</span>
            <div className={styles.mobileBox}>
              <span className={styles.area}>{`+${lang === 'zh' ? '86' : '84'}`}</span>
              <InputItem
                {...getFieldProps('mobile')}
                clear
                placeholder={intl.get('login.ph1')}
                className={styles.mobile}
                ref={el => (this.mobileInput = el)}
                onClick={() => {
                  this.mobileInput.focus();
                }}
              ></InputItem>
            </div>
            <span className={styles.tips}>{intl.get('login.tips')}</span>
            <Button type="primary" onClick={this.handleNextClick} className={styles.nextBut}>
              {intl.get('login.next')}
            </Button>
          </div>
        ) : (
          <div className={styles.loginBox}>
            <span className={styles.title}>{intl.get('login.welcomeBack')}</span>
            <div className={styles.loginMobile}>{`+${lang === 'zh' ? '86' : '84'} ${mobile}`}</div>
            <div className={`${styles.mobileBox} ${styles.passBox}`}>
              <InputItem
                {...getFieldProps('password')}
                clear
                placeholder={intl.get('login.ph2')}
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
              {intl.get('login.login')}
            </Button>
            <Link
              to={{
                pathname: '/password',
                search: `${this.props.history.location.search}`,
                state: { mobile: mobile },
              }}
              className={styles.forgetPassword}
            >
              {intl.get('login.fegPaw')}
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
