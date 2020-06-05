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

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      pwVisible: true,
    };
  }

  handleCodeClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) return;
      console.log(value);
      if (!value.mobile) {
        return Toast.info('请输入手机号', 2);
      } else {
        this.setState({
          mobile: value.mobile,
        });
      }
    });
  };

  handleRegClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.password) {
        return Toast.info('请输入短信验证码', 2);
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
    const { mobile, pwVisible } = this.state;
    return (
      <div className={styles.regPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => console.log('onLeftClick')}
        >
          注册
        </NavBar>
        <div className={styles.regBox}>
          <span className={styles.title}>注册GAGA GO</span>
          <div className={styles.loginMobile}>+84 {mobile}</div>
          <div className={styles.codeBox}>
            <InputItem
              {...getFieldProps('code')}
              clear
              placeholder="请输入短信验证码"
              className={styles.code}
            />
            <Button type="primary" className={styles.sendCode} onClick={this.handleCodeClick}>
              发送验证码
            </Button>
          </div>
          <div className={`${styles.mobileBox} ${styles.passBox}`}>
            <InputItem
              {...getFieldProps('password')}
              clear
              placeholder="请设置6-16位登录密码"
              type={pwVisible ? 'text' : 'password'}
              className={styles.password}
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
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(createForm()(Register));
