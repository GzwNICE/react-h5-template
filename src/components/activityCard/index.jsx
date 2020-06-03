import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

class ActivityCard extends PureComponent {
  render() {
    const { data, hot } = this.props;
    console.log(data);
    return (
      <div className={styles.card}>
        <div className={styles.topBox}>
          <img src={data.imgUrl} alt="" className={styles.shopImg} />
          {hot ? <img src={hotImg} alt="" className={styles.hotImg} /> : null}
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.shopTitle}>{data.productName}</div>
          <div className={styles.schedule}>
            <Progress
              percent={data.progressRate}
              position="normal"
              style={{ flex: '1', borderRadius: '2px', backgroundColor: '#FBCEBB' }}
              barStyle={{ borderRadius: '2px', border: '2px solid #FF5209' }}
            />
            <span className={styles.remaining}>{`剩余${data.currentTurn}人次`}</span>
          </div>
          <div className={styles.oddsOfWinning}>{`多买10次可提升${data.addWinRate}%中奖率`}</div>
        </div>
      </div>
    );
  }
}

export default ActivityCard;
