import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon, Picker, List } from 'antd-mobile';
import authorImg from '@/assets/images/avatar_notlogin.png';
import intl from 'react-intl-universal';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Personal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sexValue: ['男'],
      colorValue: ['#00FF00'],
    };
  }
  componentDidMount() {
    this.setState({
      sexs: [
        {
          label: intl.get('user.str_man'),
          value: '男',
        },
        {
          label: intl.get('user.str_woman'),
          value: '女',
        },
      ],
    });
    const { userInfo } = this.props;
    userInfo().then(() => {
      this.setState({
        sexValue: [this.props.user.userInfo.sex],
      });
    });
  }
  onRealNameClick(name) {
    this.props.history.push(
      `/editname?title=${intl.get('user.str_realname_title')}&type=name&content=${name}`
    );
  }
  onSexClick() {
    console.log('onSexClick');
  }
  onAddressClick() {
    this.props.history.push(`/addressList`);
  }

  onAddCardClick() {
    this.props.history.push(`/editname?title=${intl.get('user.str_idcard_no')}&type=idCard`);
  }

  onChangeSex = sex => {
    const { updateUser, userInfo } = this.props;
    this.setState(
      {
        sexValue: sex,
      },
      () => {
        updateUser({
          sex: this.state.sexValue[0],
          updateAvatar: 'false',
        }).then(() => {
          userInfo();
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
          {intl.get('user.str_personal_data')}
        </NavBar>
        <div className={styles.userInfo}>
          <img
            className={styles.authorImg}
            src={user.userInfo.photoUrl ? user.userInfo.photoUrl : authorImg}
          ></img>
          <div className={styles.imgEdit}>{intl.get('user.str_edit')}</div>
          <input type="file" accept="image/*" className={styles.cameraInput} />
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '10px' }}
          onClick={this.onRealNameClick.bind(this, user.userInfo.name)}
        >
          <div className={styles.title}>{intl.get('user.str_real_name')}</div>
          <div className={styles.arrow} />
          <div className={styles.content}>
            {user.userInfo.name ? user.userInfo.name : intl.get('user.str_input_realname')}
          </div>
        </div>
        <Picker
          data={this.state.sexs}
          cols={1}
          value={this.state.sexValue}
          onChange={this.onChangeSex}
        >
          <List.Item arrow="horizontal">
            <div className={styles.title}>{intl.get('user.str_sex')}</div>
          </List.Item>
        </Picker>
        <div className={styles.itemBox} style={{ marginTop: '10px' }}>
          <div className={styles.title}>{intl.get('user.str_phone_num')}</div>
          <div className={styles.content}>{user.userInfo.mobile}</div>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={this.onAddressClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.str_user_address')}</div>
          <div className={styles.arrow} />
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={user.userInfo.idCard ? null : this.onAddCardClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.str_idcard_no')}</div>
          <div className={styles.arrow} />
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
