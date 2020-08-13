/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Button } from 'antd-mobile';
import styles from './index.less';

class IntegralCard extends PureComponent {
  render() {
    const { last, type } = this.props;
    return (
      <div className={`${styles.integralCard} ${last ? `${styles.last}` : ''}`}>
        <div className={styles.left}>
          <li className={styles.project}>
            完善资料<span className={styles.points}>+10</span>
          </li>
          <li className={styles.supplement}>补充个人全部资料信息。</li>
          {type === 'task' ? <li className={styles.schedule}>完成 0/1 每周上限100分</li> : null}
        </div>
        <div className={styles.right}>
          {type === 'novice' ? (
            <Button type="primary" className={styles.finish}>
              去完成
            </Button>
          ) : (
            <Button type="primary" className={styles.completed}>
              已完成
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default IntegralCard;
