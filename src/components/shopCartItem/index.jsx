import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Icon, Stepper, Progress } from 'antd-mobile';
import styles from './index.less';

class ShopCardItem extends PureComponent {
  deleteItem(id) {
    this.props.delete(id);
  }

  render() {
    const { data } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.listItem}>
        <Icon type="cross" className={styles.close} onClick={() => this.deleteItem(data.id)} />
        <img src={data.picUrl} alt="" className={styles.prodPic} />
        <div className={styles.right}>
          <span className={styles.prodName}>{`第${data.turnCount}轮 ${data.productName}`}</span>
          <div className={styles.second}>
            <span className={styles.money}>
              <span>{`${data.price} ${config.moneyVirtualCn}`}</span>/人次
            </span>
            <Stepper
              className={styles.step}
              showNumber
              max={data.laveCount}
              min={1}
              value={data.buyCount}
              // onChange={this.onChange}
            />
          </div>
          <div className={styles.last}>
            <Progress
              percent={data.percent}
              position="normal"
              appearTransition
              className={styles.progress}
              barStyle={{ backgroundColor: '#ff5209', border: 'none' }}
            />
            <span className={styles.num}>{`剩余 ${data.laveCount} 人次`}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCardItem;
