import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from 'antd-mobile';
import styles from './index.less';

class CategoryCard extends PureComponent {
  render() {
    const { data, idEnd } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.category}>
        <Link
          to={{
            pathname: `/product/${data.activityTurnId}`,
          }}
        >
          <div className={`${styles.content} ${idEnd ? `${styles.contentNo}` : ''}`}>
            <img src={data.imgUrl} alt="" className={styles.productPic} />
            <div className={styles.productInfo}>
              <div className={styles.name}>{data.activityName}</div>
              <div
                className={styles.money}
              >{`${data.participatePrice}${config.moneyVirtualCn}`}</div>
              <div className={styles.progressBox}>
                <Progress
                  percent={data.progressRate}
                  position="normal"
                  style={{
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#FBCEBB',
                    overflow: 'hidden',
                  }}
                  barStyle={{
                    backgroundColor: 'rgb(255,82,9)',
                    border: 'none',
                  }}
                />
                <div className={styles.num}>{`${data.progressRate}%`}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CategoryCard;
