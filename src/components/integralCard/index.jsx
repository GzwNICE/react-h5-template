/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Button } from 'antd-mobile';
import { cycle } from '@/utils/util';
import styles from './index.less';

class IntegralCard extends PureComponent {
  render() {
    // data 基本内容
    // type 调用组件的展示类型 string
    // last 是否为最后一条数据
    // schedule 任务大厅是否展示进度
    const { data, last, type, schedule } = this.props;
    return (
      <div>
        {type === 'noviceTask' ? (
          <div className={`${styles.integralCard} ${last ? `${styles.last}` : ''}`}>
            <div className={styles.left}>
              <li className={styles.project}>
                {data.taskName}
                <span className={styles.points}>+{data.presentPoints}</span>
              </li>
              <li className={styles.supplement}>{data.taskDesc}</li>
              {schedule ? (
                <li className={styles.schedule}>{`完成 ${data.completionTimes}/${
                  data.taskLimitCycleTimes
                } ${cycle(data.taskCycle)}上限${data.presentPoints *
                  data.taskLimitCycleTimes}分`}</li>
              ) : null}
            </div>
            <div className={styles.right}>
              {data.isDone ? (
                <Button type="primary" className={styles.completed} disabled>
                  已完成
                </Button>
              ) : (
                <Button type="primary" className={styles.finish}>
                  去完成
                </Button>
              )}
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
