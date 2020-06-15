import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon } from 'antd-mobile';
import authorImg from '@/assets/images/avatar_notlogin.png';
import arrow_right from '@/assets/images/ic_arrow_white.png';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class Personal extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { userInfo } = this.props;
    userInfo();
  }
  onRealNameClick() {
    this.props.history.push(`/editname?title=编辑真实姓名&type=name&lang=${lang}`);
  }
  onSexClick() {
    console.log('onSexClick');
  }
  onAddressClick() {
    console.log('onAddressClick');
  }

  onAddCardClick() {
    this.props.history.push(`/editname?title=身份证号&type=idcard&lang=${lang}`);
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
        <div
          className={styles.itemBox}
          style={{ marginTop: '10px' }}
          onClick={this.onRealNameClick.bind(this)}
        >
          <div className={styles.title}>真实姓名</div>
          <img className={styles.arrow} src={arrow_right} />
          <div className={styles.content}>
            {user.userInfo.name ? user.userInfo.name : '请填写真实姓名'}
          </div>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={this.onSexClick.bind(this)}
>
          <div className={styles.title}>性别</div>
          <img className={styles.arrow} src={arrow_right} />
          <div className={styles.content}>
            {user.userInfo.sex ? user.userInfo.sex : '请选择性别'}
          </div>
        </div>
        <div className={styles.itemBox} style={{ marginTop: '10px' }}>
          <div className={styles.title}>手机号</div>
          <div className={styles.content}>{user.userInfo.mobile}</div>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={this.onAddressClick.bind(this)}
        >
          <div className={styles.title}>收货地址</div>
          <img className={styles.arrow} src={arrow_right} />
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={user.userInfo.idCard ? null : this.onAddCardClick.bind(this)}
        >
          <div className={styles.title}>身份证号</div>
          <img className={styles.arrow} src={arrow_right} />
          <div className={styles.content}>{user.userInfo.idCard} </div>
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
