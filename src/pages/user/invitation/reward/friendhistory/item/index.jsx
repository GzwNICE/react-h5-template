import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import intl from 'react-intl-universal';
import styles from './index.less';

class RewardItem extends PureComponent {

  render() {
    let friendStatus = '';
    if (data.friendStatus === '0') {
        friendStatus = intl.get('user.str_has_regist');
      } else if (data.status === '1') {
        friendStatus = intl.get('user.str_has_income');
      } else if (data.status === '2') {
        friendStatus = intl.get('user.str_unuse');
      } else if (data.status === '3') {
        friendStatus = intl.get('user.str_invitation');
      } 
    const { data } = this.props;
    return (
        <div>
          <div className={styles.historyTitle}>
            <div className={styles.title} style={{ textAlign: 'left' }}>
              {data.friendName}
            </div>
            <div className={styles.title} style={{ textAlign: 'left' }}>
              {moment(data.createTime).format('DD/MM HH:mm')}
            </div>
            <div className={styles.title} style={{ textAlign: 'right' }}>
              {friendStatus}
            </div>
          </div>
       
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(RewardItem);
