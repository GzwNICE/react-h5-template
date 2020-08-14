/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Button } from 'antd-mobile';
import styles from './index.less';

class IntegralCard extends PureComponent {
  render() {
    // type 调用组件的展示类型 string
    // last 是否为最后一条数据
    // schedule 任务大厅是否展示进度
    const { last, type, schedule } = this.props;
    return (
      <div>
        {type === 'noviceTask' ? (
          <div className={`${styles.integralCard} ${last ? `${styles.last}` : ''}`}>
            <div className={styles.left}>
              <li className={styles.project}>
                完善资料<span className={styles.points}>+10</span>
              </li>
              <li className={styles.supplement}>补充个人全部资料信息。</li>
              {schedule ? <li className={styles.schedule}>完成 0/1 每周上限100分</li> : null}
            </div>
            <div className={styles.right}>
              {/*<Button type="primary" className={styles.finish}>
                去完成
              </Button>
              */}
              <Button type="primary" className={styles.completed}>
                已完成
              </Button>
            </div>
          </div>
        ) : null}
        {type === 'points' ? (
          <div
            className={`${styles.integralCard} ${styles.pointsCard} ${
              last ? `${styles.last}` : ''
            }`}
          >
            <div className={styles.pointsLeft}>
              <li className={styles.project}>每日签到</li>
              <li className={styles.supplement}>2019/12/02获得</li>
            </div>
            <div className={styles.pointsRight}>
              <li className={styles.num}>+10</li>
              <li className={styles.failureTime}>2020/12/02失效</li>
            </div>
          </div>
        ) : null}
        {type === 'record' ? (
          <div
            className={`${styles.integralCard} ${styles.pointsCard} ${
              last ? `${styles.last}` : ''
            }`}
          >
            <div className={styles.pointsLeft}>
              <li className={styles.project}>兑换 10 GO币</li>
              <li className={styles.supplement}>2019/12/02 13:00</li>
            </div>
            <div className={styles.pointsRight}>
              <li className={styles.recordNum}>-1000000</li>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default IntegralCard;
