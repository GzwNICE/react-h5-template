import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import styles from './index.less';
import ic_edit from '@/assets/images/ic_edit.png';

class AddressItem extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box}>
          <div className={styles.userInfo}>
              <div className={styles.name}>{data.userName}</div>
              <div className={styles.mobile}>{data.mobile}</div>
             {data.isDefault=="Y"? <div className={styles.label}>默认</div>:null}
          </div>
          <div className={styles.addressInfo}>
              <div className={styles.address}>{data.detailAddress}</div>
              <img className={styles.edit} src={ic_edit}></img>
          </div>
      </div>
    );
  }
}

export default AddressItem;
