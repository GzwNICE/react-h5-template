import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import moment from 'moment';
import intl from 'react-intl-universal';

import styles from './index.less';

class WaitOpen extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.orderTime}>
          {intl.get('order.str_order_time')} {moment(data.createTime).format('DD/MM/YYYY HH:mm')}
        </div>
        <div className={styles.orderBox}>
          <img className={styles.orderImg} src={data.pic}></img>
          <div className={styles.orderInfo}>
            <div className={styles.orderTitle}>
              {intl.get('order.str_current_turn')} {data.currentTurn} {data.activityName}
            </div>
            <div className={styles.schedule}>
              <div className={styles.progressTitle}>{intl.get('order.str_open_progress')} </div>
              <div className={styles.progress}>
                <Progress
                  percent={data.luckProgress}
                  position="normal"
                  style={{
                    width: '100%',
                    height: '14px',
                    borderRadius: '7px',
                    backgroundColor: '#FBCEBB',
                  }}
                  barStyle={{
                    border: '7px solid rgb(255, 82, 9)',
                    borderRadius: '7px',
                    boxSizing: 'border-box',
                  }}
                />
                <div className={styles.progressNum}>{`${data.luckProgress}%`}</div>
              </div>
              <div className={styles.remaining}>
                {intl.get('order.laveCount', { num: data.laveCount })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>

        <div className={styles.buyInfo}>
          <div className={styles.buyCount}>
            {intl.get('order.str_has_buy', { num: data.luckCodeCount })}
          </div>
          <div
            className={styles.buyCode}
            onClick={this.onCodeClick.bind(this, data.activityTurnId)}
          >
            {intl.get('order.str_search_my_code')}
          </div>
        </div>
      </div>
    );
  }
  onCodeClick = () => {
    this.props.parent.showCodeDialog(this.props.data.activityTurnId);
  }
}

export default WaitOpen;
