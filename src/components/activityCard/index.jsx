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
            <span className={styles.shopTitle}>
              <span style={{ color: '#FA6400', marginRight: '8px'}}>{data.name}</span>
              {data.content}
            </span>
          </div>
        </Link>
      </div>
    );
  }
}

export default ActivityCard;
