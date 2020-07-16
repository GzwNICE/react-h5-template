import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import intl from 'react-intl-universal';

import pic_visual from '@/assets/images/pic_visual@2x.png';

import styles from './index.less';

class Join extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.contentBox}>
        <img className={styles.bg_visual} src={pic_visual}></img>
        <div className={styles.join} style={{ marginBottom: '120px' }}>
          {intl.get('user.joinFacebook')}
        </div>
        <div className={styles.join} style={{ marginBottom: '60px' }}>
          {intl.get('user.joinTelegram')}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Join);
