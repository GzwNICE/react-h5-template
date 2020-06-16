import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import moment from 'moment';

import styles from './index.less';

class WaitOpen extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.orderTime}>
          下单时间：{moment(data.createTime).format('DD/MM/YYYY HH:mm')}
        </div>
        <div className={styles.orderBox}>
          <img className={styles.orderImg} src={data.pic}></img>
          <div className={styles.orderInfo}>
            <div className={styles.orderTitle}>
              第{data.currentTurn}轮 {data.activityName}
            </div>
            <div className={styles.schedule}>
              <div className={styles.progressTitle}>开奖进度：</div>
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
              <div className={styles.remaining}>{`剩余${data.laveCount}人次`}</div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>

        <div className={styles.buyInfo}>
          <div className={styles.buyCount}>已购买：{data.luckCodeCount}人次</div>
          <div
            className={styles.buyCode}
            onClick={this.onCodeClick.bind(this, data.activityTurnId)}
          >
            查看我的抽奖号码
          </div>
        </div>
      </div>
    );
  }
  onCodeClick(activityTurnId) {
    this.props.parent.showCodeDialog(true, activityTurnId);
  }
}

export default WaitOpen;
