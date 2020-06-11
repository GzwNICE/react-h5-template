import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Progress } from 'antd-mobile';
import moment from 'moment';

import styles from './index.less';

class DetailDialog extends PureComponent {
  render() {
    const { data } = this.props;
    return (
        <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.message}>{message}</div>
        <div className={styles.buttons}>
            <button className={styles.button} onClick={onCancel}>
               取消
            </button>
          <button className={cx(styles.button, styles.active)} onClick={onConfirm}>
            确定
          </button>
        </div>
      </div>
       
    );
  }
  }
}

export default DetailDialog;
