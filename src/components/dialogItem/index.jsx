import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';

import styles from './index.less';

class Item extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.itemBox}>
        <div className={styles.itemTitle}>{data.title}</div>
        <div className={styles.itemValue}>{data.value}</div>
      </div>
    );
  }
}
export default Item;
