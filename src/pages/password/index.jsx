/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import md5 from 'md5';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getBaseUrl } from '@/utils/util';
import passwordClose from '@/assets/images/passwordClose.png';
import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Password extends PureComponent {
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
      mobile: mobile ? mobile : this.props.location.state.mobile,
    });
  }

  handleCodeClick = e => {
    e.preventDefault();
    this.setState({
      codeModal: true,
    });
    this.changeCodeImg();
  };

  sendCode = () => {
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
            } else {
              return Toast.info(res.msg, 2);
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

  handleRegClick = e => {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.smsCode) {
        return Toast.info('请输入短信验证码', 2);
      } else if (!value.pwd) {
        return Toast.info('请输入新密码', 2);
      } else {
        that.props
          .resetPassword({
            smsCode: value.smsCode,
            countryCode: '84',
            mobile: this.state.mobile,
            pwd: md5(value.pwd),
          })
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              Toast.success('密码修改成功，请重新登录', 2);
              setTimeout(() => {
                that.props.history.push(`/login?lang=${lang}&mobile=${this.state.mobile}`);
              }, 2000);
            } else {
              return Toast.info(res.msg, 2);
            }
          });
        console.log(value);
      }
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  changeCodeImg = () => {
    this.setState({
      codeImgUrl: `${this.state.codeUrl}${new Date().getTime()}`,
    });
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
          找回密码
        </NavBar>
        <div className={styles.regBox}>
          <span className={styles.title}>手机号</span>
          <div className={styles.loginMobile}>+84 {mobile}</div>
          <div className={styles.codeBox}>
            <InputItem
              {...getFieldProps('smsCode')}
              clear
              placeholder="请输入短信验证码"
              className={styles.code}
              ref={el => (this.smsInput = el)}
              onClick={() => {
                this.smsInput.focus();
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
              placeholder="请设置新的6-16位登录密码"
              type={pwVisible ? 'text' : 'password'}
              className={styles.password}
              ref={el => (this.pwdInput = el)}
              onClick={() => {
                this.pwdInput.focus();
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
            确定
          </Button>
        </div>
        <Modal
          visible={codeModal}
          transparent
          maskClosable={false}
          title="请输入图形验证码"
          className={styles.codeModal}
        >
          <div className={styles.imgCode}>
            <InputItem
              {...getFieldProps('picCode')}
              clear
              placeholder="请输入图形验证码"
              className={styles.codeInput}
              ref={el => (this.codeImg = el)}
              onClick={() => {
                this.codeImg.focus();
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
  resetPassword: params => dispatch.register.userResetPsw(params),
});

export default connect(mapState, mapDispatch)(createForm()(Password));
