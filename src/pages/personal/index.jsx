import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon } from 'antd-mobile';
import authorImg from '@/assets/images/avatar_notlogin.png';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class Personal extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.history.push('/login');
    const { userInfo } = this.props;
    userInfo();
  }
  render() {
    const { user } = this.props;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          个人资料
        </NavBar>
        <div className={styles.userInfo}>
          <img
            className={styles.authorImg}
            src={user.userInfo.photoUrl ? user.userInfo.photoUrl : authorImg}
          ></img>
          <div className={styles.imgEdit}>编辑</div>
          <input type="file" accept="image/*" className={styles.cameraInput} />
        </div>
        <div>
          <div></div>
          <div></div>
          <img></img>
        </div>
        <div></div>
        <div>
          <div></div>
          <div></div>
          <img></img>
        </div>
        <div>
            <div></div>
            <div></div>
        </div>
        <div>
            <div></div>
            <div></div>
            <img></img>
        </div>
        <div>
            <div></div>
            <div></div>
            <img></img>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data,
});

const mapDispatch = dispatch => ({
  userInfo: params => dispatch.user.getUserInfo(params),
});

export default connect(mapState, mapDispatch)(Personal);
