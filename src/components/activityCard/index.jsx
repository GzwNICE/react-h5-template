import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import { Link } from 'react-router-dom';
// import queryString from 'query-string';
import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

// const { lang } = queryString.parse(window.location.search);
const imagesContext = require.context('@/assets/images/home', false, /\.png$/);
class ActivityCard extends PureComponent {
  render () {
    const { data, recommend } = this.props;
    return (
      <div className={styles.card}>
        <Link
          to={{
            pathname: `/product/${data.id}`,
          }}
        >
          <div className={styles.topBox}>
            <img src={imagesContext(data.img)} alt="" className={styles.shopImg} />
          </div>
          <div className={styles.bottomBox}>
            <div className={styles.shopTitle}>{data.name}</div>
            <div className={styles.oddsOfWinning}>
              <span className={styles.money}>{`¥${data.spikePrice}`}</span>
              <span className={styles.eg}>秒杀价</span>
              <span className={styles.hua}>{`¥${data.price}`}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ActivityCard;
