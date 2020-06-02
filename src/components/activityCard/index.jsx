import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

class ActivityCard extends PureComponent {
  render() {
    const hot = true;
    return (
      <div className={styles.card}>
        <div className={styles.topBox}>
          <img
            src="http://img.pconline.com.cn/images/product/5520/552026/dc_canon_sx170_3.jpg"
            alt=""
            className={styles.shopImg}
          />
          {hot ? <img src={hotImg} alt="" className={styles.hotImg} /> : null}
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.shopTitle}>第二代苹果无线</div>
          <div className={styles.schedule}>
            <Progress
              percent={40}
              position="normal"
              style={{ flex: '1', borderRadius: '2px', backgroundColor: '#FBCEBB' }}
              barStyle={{ borderRadius: '2px', border: '2px solid #FF5209' }}
            />
            <span className={styles.remaining}>剩余1234人次</span>
          </div>
          <div className={styles.oddsOfWinning}>多买10次可提升0.16%中奖率</div>
        </div>
      </div>
    );
  }
}

export default ActivityCard;
