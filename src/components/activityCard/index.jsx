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
            {data.isTop ? <img src={hotImg} alt="" className={styles.hotImg} /> : null}
          </div>
          <div className={styles.bottomBox}>
            <div className={styles.shopTitle}>{data.activityName}</div>
            <div className={styles.schedule}>
              {recommend ? (
                <span className={styles.shedText}>{intl.get('shoppingCart.schedule')}：</span>
              ) : null}
              <div className={styles.prog}>
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
              </div>
              <span className={styles.remaining}>{`${intl.get('home.remaining')}${
                data.remainingCount
              }`}</span>
            </div>
            {recommend ? null : (
              <div className={styles.oddsOfWinning}>
                {intl.get('home.BuyMore', { addWinRate: data.addWinRate })}
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
}

export default ActivityCard;
