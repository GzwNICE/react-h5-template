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
    const { data } = this.props;
    return (
      <div className={styles.card}>
        <Link
          to={{
            pathname: `/product/${data.activityTurnId}`,
          }}
        >
          <div className={styles.topBox}>
            <img src={data.imgUrl} alt="" className={styles.shopImg} />
            {data.isTop ? <img src={hotImg} alt="" className={styles.hotImg} /> : null}
          </div>
          <div className={styles.bottomBox}>
            <div className={styles.shopTitle}>{data.activityName}</div>
            <div className={styles.schedule}>
              <Progress
                percent={data.progressRate}
                position="normal"
                style={{
                  flex: '1',
                  borderRadius: '4px',
                  backgroundColor: '#FBCEBB',
                  overflow: 'hidden',
                }}
                barStyle={{ backgroundColor: 'rgb(255,82,9)', border: 'none' }}
              />
              <span className={styles.remaining}>{`${intl.get('home.remaining')}${
                data.remainingCount
              }${intl.get('home.personTime')}`}</span>
            </div>
            <div className={styles.oddsOfWinning}>{`${intl.get('home.BuyMore')}${
              data.addWinRate
            }%${intl.get('home.oddsWinning')}`}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ActivityCard;
