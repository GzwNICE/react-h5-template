import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon, Button, Modal } from 'antd-mobile';
import logo from '@/assets/images/logo.png';
import intl from 'react-intl-universal';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Setting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowDialog: false,
    };
  }
  componentDidMount() {
    this.setState({
      isShowDialog: false,
    });
  }
  onClose() {
    this.setState({
      isShowDialog: false,
    });
  }
  onLogOutClick() {
    this.setState({
      isShowDialog: true,
    });
  }
  handlerOutLogin = () => {
    localStorage.removeItem('token');
    this.props.history.go(-1);
  };
  onPrivacyInfoClick() {
    this.props.history.push('/agreement/2');
  }
  onServerInfoClick() {
    this.props.history.push('/agreement/0');
  }
  onAboutUsClick() {
    this.props.history.push('/aboutus');
  }

  render() {
    const { isShowDialog } = this.state;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.setting')}
        </NavBar>
        <div className={styles.userInfo}>
          <img className={styles.authorImg} src={logo}></img>
          <div className={styles.imgEdit}>GAGAGO1.0.0</div>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '30px' }}
          onClick={this.onPrivacyInfoClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.privacy_info')}</div>
          <div className={styles.arrow} />
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={this.onServerInfoClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.server_info')}</div>
          <div className={styles.arrow} />
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '10px' }}
          onClick={this.onAboutUsClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.aboutUs')}</div>
          <div className={styles.arrow} />
        </div>
        <Button onClick={this.onLogOutClick.bind(this)} className={styles.outLogin}>
          {intl.get('user.logout')}
        </Button>
        <Modal visible={isShowDialog} transparent maskClosable={false}>
          <div className={styles.loginOut}>{intl.get('user.logoutInfo')}</div>
          <div className={styles.footer}>
            <div className={styles.cancel} onClick={this.onClose.bind(this)}>
              {intl.get('user.cancel')}
            </div>
            <div className={styles.confirm} onClick={this.handlerOutLogin.bind(this)}>
              {intl.get('user.confirm')}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Setting);
