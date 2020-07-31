import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import shopCartBg from '@/assets/images/shopCartBg.png';
import { Icon, Stepper, Progress } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import styles from './index.less';

class ShopCardItem extends PureComponent {
  render() {
    // const { type } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.listItem}>
        <Icon type="cross" className={styles.close} />
        <img src={shopCartBg} alt="" className={styles.prodPic} />
        <div className={styles.right}>
          <span className={styles.prodName}>
            第10轮 AirPods 苹果无线蓝牙耳机第二代苹果无线蓝牙耳苹果无线蓝牙耳机第二代苹果无线蓝牙耳
          </span>
          <div className={styles.second}>
            <span className={styles.money}>
              <span>{`1 ${config.moneyVirtualCn}`}</span>/人次
            </span>
            <Stepper
              className={styles.step}
              showNumber
              // max={10}
              // min={1}
              value={1}
              // onChange={this.onChange}
            />
          </div>
          <div className={styles.last}>
            <Progress
              percent={40}
              position="normal"
              appearTransition
              className={styles.progress}
              barStyle={{ backgroundColor: '#ff5209', border: 'none' }}
            />
            <span className={styles.num}>剩余 16 人次</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCardItem;
