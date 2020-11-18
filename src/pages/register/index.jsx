/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import { NavBar, Icon, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getBaseUrl } from '@/utils/util';
import styles from './index.less';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      codeUrl: `${window.location.protocol}//${getBaseUrl()}/v1/captcha.php?r=`,
      codeImgUrl: '',
      redirect: queryString.parse(window.location.search).redirect,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.changeCodeImg();
  }

  // 注册
  handleRegClick = e => {
    e.preventDefault();
    const that = this;
    const { redirect } = this.state;
    const Reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.mobile) {
        return Toast.info('请填写手机号', 2);
      } else if (!value.password) {
        return Toast.info(`请设置登录密码`, 2);
      } else if (!Reg.test(value.password)) {
        return Toast.info('密码只能为6-16位由数字和字母组成', 2);
      } else if (!value.code) {
        return Toast.info(`输入图形中的验证码`, 2);
      } else {
        this.props
          .fetchRegister({
            mobile: value.mobile.replace(/\s*/g, ''),
            code: value.code,
            password: value.password,
            channel_code: localStorage.getItem('AppId'),
          })
          .then(res => {
            if (res.code === 200) {
              Toast.success('注册成功', 2);
              localStorage.setItem('mobile', value.mobile.replace(/\s*/g, ''));
              setTimeout(() => {
                redirect ? that.props.history.push(redirect) : that.props.history.push('/user');
              }, 2000);
            } else {
              this.changeCodeImg();
              this.codeInput.state.value = '';
            }
          });
      }
    });
  };

  changeCodeImg = () => {
    this.setState({
      codeImgUrl: `${this.state.codeUrl}${Math.random()}`,
    });
  };

  handleAgreement = () => {
    this.props.history.push('/agreement/0');
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { codeImgUrl } = this.state;
    return (
      <div className={styles.regPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navbar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          注册
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
  fetchRegister: params => dispatch.home.userRegister(params),
});

export default connect(mapState, mapDispatch)(createForm()(Register));
