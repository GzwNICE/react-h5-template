import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import emptyImg from '@/assets/images/bg_empty.png';
import styles from './index.less';

class Empty extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <div className={styles.box}>
        <img className={styles.emptyImg} src={emptyImg} />
        <div className={styles.emptyInfo}>{text ? text : intl.get('payment.noContentYet')}</div>
      </div>
    );
  }
}

export default Empty;
