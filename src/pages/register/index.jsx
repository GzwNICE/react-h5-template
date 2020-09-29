/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getBaseUrl } from '@/utils/util';
import passwordClose from '@/assets/images/passwordClose.png';
import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      pwVisible: true,
      codeModal: false,
      codeUrl: `${window.location.protocol}//${getBaseUrl()}/v1/captcha.php?r=`,
      codeImgUrl: '',
      index: 5,
      sendCodeText: `${intl.get('password.sendCode')}`,
      disableCode: false,
      lang: Cookies.get('lang'),
    };
  }

  componentDidMount () {
    window.scrollTo(0, 0);
    this.changeCodeImg();
    const token = localStorage.getItem('token');
    if (token) {
      this.props.history.push(`/home`);
      return;
    }
    const { mobile } = queryString.parse(window.location.search);
    this.setState({
      mobile,
    });
  }

  handleCodeClick = e => {
    e.preventDefault();
    this.setState({
      codeModal: true,
    });
    this.changeCodeImg();
  };

  // 发送短信验证码
  sendCode = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.picCode) {
        return Toast.info(`${intl.get('password.ph1')}`, 2);
      } else {
        this.props
          .sendCode({
            phone: this.state.mobile,
            countryCode: this.state.lang === 'zh' ? '86' : '84',
            picCode: value.picCode,
          })
          .then(res => {
            if (res.code === 200) {
              this.setState({
                codeModal: false,
              });
              this.timer = setInterval(() => {
                if (this.state.index <= 0) {
                  return this.Clear();
                }
                this.setState({
                  index: this.state.index - 1,
                  sendCodeText: `${this.state.index - 1}s`,
                  disableCode: true,
                });
              }, 999);
            }
          });
      }
    });
  };

  Clear = () => {
    this.setState({
      disableCode: false,
      index: 5,
      sendCodeText: `${intl.get('password.sendAgin')}`,
    });
    clearInterval(this.timer);
  };

  // 注册
  handleRegClick = e => {
    e.preventDefault();
    const that = this;
    const Reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.mobile) {
        return Toast.info('请填写手机号', 2);
      } else if (!value.password) {
        return Toast.info(`请设置登录密码`, 2);
      } else if (!Reg.test(value.password)) {
        return Toast.info(`${intl.get('password.ph4')}`, 2);
      } else if (!value.code) {
        return Toast.info(`输入图形中的验证码`, 2);
      } else {
        this.props
          .fetchRegister({
            mobile: value.mobile.replace(/\s*/g, ''),
            code: value.code,
            password: value.password,
          })
          .then(res => {
            if (res.code === 10001) {
              this.changeCodeImg();
              this.codeInput.state.value = '';
            }else if (res.code === 200) {
              Toast.success(`${intl.get('password.regSuccess')}`, 2);
              localStorage.setItem('mobile', value.mobile.replace(/\s*/g, ''));
              setTimeout(() => {
                that.props.history.push('/user');
              }, 2000);
            }
          });
      }
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  afterCloseModal = () => {
    this.props.form.resetFields();
  };

  changeCodeImg = () => {
    this.setState({
      codeImgUrl: `${this.state.codeUrl}${Math.random()}`,
    });
  };

  ShowPassWord = () => {
    this.setState({
      pwVisible: !this.state.pwVisible,
    });
  };

  handleAgreement = () => {
    this.props.history.push('/agreement/0');
  };

  render () {
    const { getFieldProps } = this.props.form;
    const {
      mobile,
      pwVisible,
      codeImgUrl,
      codeModal,
      sendCodeText,
      disableCode,
      lang,
    } = this.state;
    return (
      <div className={styles.regPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF1C1C' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          {intl.get('password.reg')}
        </NavBar>
        <div className={styles.regBox}>
          <div className={styles.mobileBox}>
            <InputItem
              {...getFieldProps('mobile')}
              placeholder="请填写手机号"
              type="phone"
              className={styles.mobile}
              ref={el => (this.mobileInput = el)}
              onClick={() => {
                this.mobileInput.focus();
              }}
            >
              <span className={styles.countCode}>+86</span>
            </InputItem>
          </div>
          <div className={`${styles.mobileBox} ${styles.passBox}`}>
            <InputItem
              {...getFieldProps('password')}
              placeholder="请设置登录密码，不得少于6位数"
              type="password"
              className={styles.password}
              ref={el => (this.passInput = el)}
              onClick={() => {
                this.passInput.focus();
              }}
            />
          </div>
          <div className={`${styles.mobileBox} ${styles.passBox}`}>
            <InputItem
              {...getFieldProps('code')}
              placeholder="输入图形中的验证码"
              className={styles.codeBox}
              ref={el => (this.codeInput = el)}
              onClick={() => {
                this.codeInput.focus();
              }}
            />
            <img
              src={codeImgUrl}
              alt=""
              onClick={this.changeCodeImg}
              className={styles.passClose}
            />
          </div>
          <Button type="primary" className={styles.nextBut} onClick={this.handleRegClick}>
            提交注册
          </Button>
          <p className={styles.regAg}>
            点击提交注册即代表您同意
            <span onClick={this.handleAgreement}>《用户服务协议》</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  sendCode: params => dispatch.register.sendCode(params),
  fetchRegister: params => dispatch.register.userRegister(params),
  userCode: params => dispatch.register.userCode(params),
  fetchAgr: params => dispatch.register.getAgr(params),
});

export default connect(mapState, mapDispatch)(createForm()(Register));
