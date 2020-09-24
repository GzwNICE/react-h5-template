import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import { Link } from 'react-router-dom';
// import queryString from 'query-string';
import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

// const { lang } = queryString.parse(window.location.search);
class ActivityCard extends PureComponent {
  render() {
    const { data, recommend } = this.props;
    return (
      <div className={recommend ? `${styles.card} ${styles.recommend}` : `${styles.card}`}>
        <Link
          to={{
            pathname: `/product/${data.activityTurnId}`,
          }}
        >
          <div className={styles.topBox}>
            <img src={data.imgUrl} alt="" className={styles.shopImg} />
          </div>
          <div className={styles.bottomBox}>
            <div className={styles.shopTitle}>商品名称最多显示2行显示不下商品名称最多显示2行显示不下</div>
            <div className={styles.oddsOfWinning}>
              <span className={styles.money}>¥1.9</span>
              <span className={styles.eg}>秒杀价</span>
              <span className={styles.hua}>¥20</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ActivityCard;
