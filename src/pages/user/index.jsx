import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import TabBarBox from '@/components/tabBar';
import styles from './index.less';

class User extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles.box}>{intl.get('user.aaa')}</div>
        <div className={styles.tBar}>
          <TabBarBox selectedTab="userPage" />
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(User);
