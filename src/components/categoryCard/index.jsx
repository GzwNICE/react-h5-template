import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

class CategoryCard extends PureComponent {
  render() {
    // const { data, recommend } = this.props;
    return (
      <div className={styles.category}>
        <div className={styles.content}>
          <img src={hotImg} alt="" className={styles.productPic} />
          <div className={styles.productInfo}>
            <div className={styles.name}>
              台式惠普（惠普）战66微边框商务电脑商务电脑商务电脑23.8英寸
            </div>
            <div className={styles.money}>1 GO币</div>
            <div className={styles.progressBox}>
              <Progress
                percent="90"
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
              <div className={styles.num}>90%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
