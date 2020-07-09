import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon, Picker, List } from 'antd-mobile';
import authorImg from '@/assets/images/avatar_notlogin.png';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
const sexs = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
];

class Personal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sexValue: ['男'],
      colorValue: ['#00FF00'],
    };
  }
  componentDidMount() {
    const { userInfo } = this.props;
    userInfo();
    userInfo().then(() => {
      this.setState({
        sexValue:[this.props.user.userInfo.sex],
      });
    });
  }
  onRealNameClick(name) {
    this.props.history.push(`/editname?title=编辑真实姓名&type=name&content=${name}`);
  }
  onSexClick() {
    console.log('onSexClick');
  }
  onAddressClick() {
    this.props.history.push(`/addressList`);
  }

  onAddCardClick() {
    this.props.history.push(`/editname?title=身份证号&type=idCard`);
  }

  onChangeSex = sex =>{
    const { updateUser } = this.props;
    this.setState(
      {
        sexValue: sex,
      },
      () => {
        updateUser({
          sex: this.state.sexValue[0],
          updateAvatar: 'false',
        });
      }
    );
  };
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
          onClick={this.onRealNameClick.bind(this, user.userInfo.name)}
        >
          <div className={styles.title}>真实姓名</div>
          <div className={styles.arrow}/>
          <div className={styles.content}>
            {user.userInfo.name ? user.userInfo.name : '请填写真实姓名'}
          </div>
        </div>
        <Picker data={sexs} cols={1} value={this.state.sexValue} onChange={this.onChangeSex}>
          <List.Item arrow="horizontal">
            <div className={styles.title}>性别</div>
          </List.Item>
        </Picker>
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
          <div className={styles.arrow}/>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={user.userInfo.idCard ? null : this.onAddCardClick.bind(this)}
        >
          <div className={styles.title}>身份证号</div>
          <div className={styles.arrow}/>
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
  updateUser: params => dispatch.user.updateUserInfo(params),

});

export default connect(mapState, mapDispatch)(Personal);
