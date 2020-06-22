/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getBaseUrl } from '@/utils/util';
import passwordClose from '@/assets/images/passwordClose.png';
import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      pwVisible: true,
      codeModal: false,
      codeUrl: `${window.location.protocol}//${getBaseUrl()}/app/sms/img/code?t=`,
      codeImgUrl: '',
      index: 5,
      sendCodeText: '发送验证码',
      disableCode: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.history.push(`/home?lang=${lang}`);
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
        return Toast.info('请输入图形验证码', 2);
      } else {
        this.props
          .sendCode({
            phone: this.state.mobile,
            countryCode: '84',
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
      sendCodeText: '重新发送',
    });
    clearInterval(this.timer);
  };

  // 注册
  handleRegClick = e => {
    e.preventDefault();
    const Reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.smsCode) {
        return Toast.info('请输入短信验证码', 2);
      } else if (!value.pwd) {
        return Toast.info('请输入登录密码', 2);
      } else if (!Reg.test(value.pwd)) {
        return Toast.info('密码只能为6-16位由数字和字母组成', 2);
      } else {
        console.log(value);
        this.props
          .fetchRegister({
            countryCode: '84',
            mobile: this.state.mobile,
            smsCode: value.smsCode,
            pwd: value.pwd,
          })
          .then(res => {
            if (res.code === 200) {
              Toast.success('注册成功', 2);
              localStorage.setItem('token', `Bearer ${res.data.token}`);
              localStorage.setItem('refreshToken', res.data.refreshToken);
              setTimeout(() => {
                this.props.history.push(`/home?lang=${lang}`);
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
      codeImgUrl: `${this.state.codeUrl}${new Date().getTime()}`,
    });
    this.afterCloseModal();
  };

  ShowPassWord = () => {
    this.setState({
      pwVisible: !this.state.pwVisible,
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { mobile, pwVisible, codeImgUrl, codeModal, sendCodeText, disableCode } = this.state;
    return (
      <div className={styles.regPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          注册
        </NavBar>
        <div className={styles.regBox}>
          <span className={styles.title}>注册GAGA GO</span>
          <div className={styles.loginMobile}>+84 {mobile}</div>
          <div className={styles.codeBox}>
            <InputItem
              {...getFieldProps('smsCode')}
              clear
              placeholder="请输入短信验证码"
              className={styles.code}
              maxLength={6}
              type="number"
              ref={el => (this.codeInput = el)}
              onClick={() => {
                this.codeInput.focus();
              }}
            />
            <Button
              type="primary"
              className={styles.sendCode}
              onClick={this.handleCodeClick}
              disabled={disableCode}
            >
              {sendCodeText}
            </Button>
          </div>
          <div className={`${styles.mobileBox} ${styles.passBox}`}>
            <InputItem
              {...getFieldProps('pwd')}
              clear
              placeholder="请设置6-16位登录密码"
              type={pwVisible ? 'text' : 'password'}
              className={styles.password}
              ref={el => (this.passInput = el)}
              onClick={() => {
                this.passInput.focus();
              }}
            />
            <img
              src={pwVisible ? passwordOpen : passwordClose}
              alt=""
              className={styles.passClose}
              onClick={this.ShowPassWord}
            />
          </div>
          <Button type="primary" className={styles.nextBut} onClick={this.handleRegClick}>
            注册
          </Button>
        </div>
        <Modal
          visible={codeModal}
          transparent
          maskClosable={false}
          title="请输入图形验证码"
          className={styles.codeModal}
          afterClose={this.afterCloseModal}
        >
          <div className={styles.imgCode}>
            <InputItem
              {...getFieldProps('picCode')}
              clear
              placeholder="请输入图形验证码"
              className={styles.codeInput}
              ref={el => (this.picCodeInput = el)}
              onClick={() => {
                this.picCodeInput.focus();
              }}
            />
            <img src={codeImgUrl} alt="" onClick={this.changeCodeImg} className={styles.codePic} />
          </div>
          <p className={styles.change}>看不清？换一张</p>
          <div className={styles.footer}>
            <Button className={styles.cancel} onClick={this.onClose('codeModal')}>
              取消
            </Button>
            <Button type="primary" className={styles.determine} onClick={this.sendCode}>
              确定
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  sendCode: params => dispatch.register.sendCode(params),
  fetchRegister: params => dispatch.register.userRegister(params),
});

export default connect(mapState, mapDispatch)(createForm()(Register));
