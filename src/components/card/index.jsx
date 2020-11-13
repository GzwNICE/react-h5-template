import React, { Component } from 'react';
import user from '@/assets/images/user.jpg';
import location from '@/assets/images/location.png';
import star from '@/assets/images/redstar.png';
import styles from './index.less';

export class Card extends Component {
  render() {
    const { type } = this.props;
    return (
      <div>
        {type === 'garden' ? (
          <div className={styles.gardenCard}>
            <img src={user} alt="" className={styles.llImg} />
            <div className={styles.rrBox}>
              <div className={styles.t1}>
                <span className={styles.name}>笑笑小小可爱</span>
                <span className={styles.status}>有空闲</span>
              </div>
              <div className={styles.star}>
                {Array.from(new Array(5)).map(() => {
                  return <img src={star} alt="" />;
                })}
              </div>
              <div className={styles.area}>
                <span className={styles.old}>25岁·摩羯座</span>
                <span className={styles.price}>¥ 99.00</span>
              </div>
              <div className={styles.num}>
                <div className={styles.ll}>
                  <img src={location} alt="" />
                  <span>杭州</span>
                </div>
                <span className={styles.rr}>已接单：167</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.cardBox}>
            <img src={user} alt="" className={styles.ttImg} />
            <div className={styles.bbBox}>
              <div className={styles.tt}>
                <span className={styles.name}>泡沫之夏</span>
                <span className={styles.old}>25岁·摩羯座</span>
              </div>
              <div className={styles.area}>
                <img src={location} alt="" />
                <span>杭州</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Card;
