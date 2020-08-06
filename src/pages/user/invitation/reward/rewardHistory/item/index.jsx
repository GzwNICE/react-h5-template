import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import intl from 'react-intl-universal';
import styles from './index.less';

class RewardItem extends PureComponent {

  render() {
    const { data } = this.props;
    return (
        <div>
          <div className={styles.historyTitle}>
         <div className={styles.title} style={{ textAlign: 'left' }}>
             {data.friendName}
         </div>
         <div className={styles.title} style={{ textAlign: 'left' }}>
           {moment(data.rechargeDate).format('DD/MM HH:mm')}
         </div>
         <div className={styles.title} style={{ textAlign: 'right' }}>
            {data.rechargeFee}
        </div>
          <div className={styles.title} style={{ textAlign: 'right' }}>
           {data.rewardGoMoney}
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
