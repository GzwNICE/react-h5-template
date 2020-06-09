/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getBaseUrl } from '@/utils/util';
import passwordClose from '@/assets/images/passwordClose.png';
import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class Password extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      pwVisible: true,
      codeModal: false,
      codeUrl: `${window.location.protocol}//${getBaseUrl()}/app/sms/img/code?t=`,
      codeImgUrl: '',
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.changeCodeImg();
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
    const { mobile, pwVisible, codeImgUrl, codeModal } = this.state;
    return (
      <div className={styles.regPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => console.log('onLeftClick')}
        >
          找回密码
        </NavBar>
        <div className={styles.regBox}>
          <span className={styles.title}>手机号</span>
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
              placeholder="请设置新的6-16位登录密码"
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
              {...getFieldProps('codeImg')}
              clear
              placeholder="请输入"
              className={styles.codeInput}
            />
            <img src={codeImgUrl} alt="" onClick={this.changeCodeImg} className={styles.codePic} />
          </div>
          <span className={styles.change} onClick={this.changeCodeImg}>
            看不清？换一张
          </span>
          <div className={styles.footer}>
            <Button className={styles.cancel} onClick={this.onClose('codeModal')}>
              取消
            </Button>
            <Button type="primary" className={styles.determine} onClick={this.onClose('codeModal')}>
              确定
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(createForm()(Password));
