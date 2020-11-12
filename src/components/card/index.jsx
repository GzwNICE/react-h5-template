import React, { Component } from 'react'
import user from '@/assets/images/user.jpg';
import location from '@/assets/images/location.png';
import styles from './index.less';

export class Card extends Component {
  render() {
    return (
      <div className={styles.cardBox}>
        <img src={user} alt="" className={styles.ttImg} />
        <div className={styles.bbBox}>
          <div className={styles.tt}>
            <span className={styles.name}>泡沫之夏</span>
            <span className={styles.old}>25岁·摩羯座</span>
          </div>
          <div className={styles.area}>
            <img src={location} alt=""/>
            <span>杭州</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
