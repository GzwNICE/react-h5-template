/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Icon, Progress } from 'antd-mobile';
import { numFormat } from '@/utils/util';
import styles from './index.less';

class ShopCardItem extends PureComponent {
  deleteItem(id) {
    this.props.delete(id);
  }

  handleStepClick = data => {
    this.props.changeCount(data);
  };

  goDetail(id) {
    this.props.goDetail(id);
  }

  render() {
    const { data } = this.props;
    console.log(data);
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.listItem}>
        <Icon type="cross" className={styles.close} onClick={() => this.deleteItem(data.id)} />
        <img
          src={data.picUrl}
          alt=""
          className={styles.prodPic}
          onClick={() => this.goDetail(data.turnActivityId)}
        />
        <div className={styles.right}>
          <span
            className={styles.prodName}
            onClick={() => this.goDetail(data.turnActivityId)}
          >{`${intl.get('product.round', {
            currentTurn: data.turnCount,
          })} ${data.activityName}`}</span>
          <div className={styles.second}>
            <span className={styles.money}>
              <span>{`${numFormat(data.price)} ${config.moneyVirtualCn}`}</span>/{intl.get('home.personTime')}
            </span>
            <div
              className={styles.step}
              onClick={() =>
                this.handleStepClick({ id: data.id, buyCount: data.buyCount, max: data.laveCount })
              }
            >
              <span className={styles.left1}>-</span>
              <span className={styles.center}>{data.buyCount}</span>
              <span>+</span>
            </div>
          </div>
          <div className={styles.last}>
            <Progress
              percent={data.percent}
              position="normal"
              appearTransition
              className={styles.progress}
              barStyle={{ backgroundColor: '#ff5209', border: 'none' }}
            />
            <span className={styles.num}>{`${intl.get('home.remaining')} ${
              data.laveCount
            } ${intl.get('home.personTime')}`}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCardItem;
