import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon } from 'antd-mobile';
import logo from '@/assets/images/logo.png';
import intl from 'react-intl-universal';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Setting extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { requestData } = this.props;
    requestData({ url: '/home/about/us/get/info' });
  }

  render() {
    const { resultData } = this.props;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.aboutUs')}
        </NavBar>
        <div className={styles.userInfo}>
          <img className={styles.authorImg} src={logo}></img>
          <div className={styles.imgEdit}> 大赢家-专注各种娱乐程序软件开发，有棋牌游戏、对战游戏、休闲游戏等各种切入，帮助用户获取更多快乐。</div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  resultData: state.user.data.resultData,
});

const mapDispatch = dispatch => ({
  requestData: params => dispatch.user.getAboutUs(params),
});

export default connect(mapState, mapDispatch)(Setting);
