import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import emptyImg from '@/assets/images/bg_empty.png';
import styles from './index.less';

class NoWin extends PureComponent {
  render() {
    return (
      <div className={styles.box}>
        <img className={styles.emptyImg} src={emptyImg} />
        <div className={styles.emptyInfo}>暂时还没有订单哦</div>
      </div>
    );
  }
}

export default NoWin;
