import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import ic_edit from '@/assets/images/ic_edit.png';
import queryString from 'query-string';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class AddressItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  onEditClick() {
    const { data, parent } = this.props;
    parent.props.history.push({ pathname: `/addressAdd`, state: { item: data } });
  }
  onChangeClick() {
    console.log('选中');
  }
  render() {
    const { data } = this.props;
    return (
      <div className={styles.box} onClick={this.onChangeClick.bind(this)}>
        <div className={styles.userInfo}>
          <div className={styles.name}>{data.userName}</div>
          <div className={styles.mobile}>{data.mobile}</div>
          {data.isDefault == 'Y' ? <div className={styles.label}>默认</div> : null}
        </div>
        <div className={styles.addressInfo}>
          <div className={styles.address}>{data.detailAddress}</div>
          <img className={styles.edit} src={ic_edit} onClick={this.onEditClick.bind(this)}></img>
        </div>
      </div>
    );
  }
}

export default AddressItem;
