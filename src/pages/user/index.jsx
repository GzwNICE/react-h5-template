import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import avatar from '@/assets/images/avatar.png';
import styles from './index.less'


export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX')
    };
  }

  render() {
    return (
      <div className={styles.userPage}>
        <div className={styles.header}>
          <img src={avatar} alt="" className={styles.avatar} />
          <span className={styles.username}>098****4111</span>
          <span className={styles.code}>推广码：1HE6H</span>
        </div>
        <TabBarBox selectedTab="user" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
