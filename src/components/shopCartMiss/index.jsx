import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import shopCartBg from '@/assets/images/shopCartBg.png';
import { Link } from 'react-router-dom';
import styles from './index.less';

class MissCard extends PureComponent {
  render() {
    const { type } = this.props;
    return (
      <div>
        <img src={shopCartBg} alt="" className={styles.shopCartBg} />
        {type ? (
          <p className={styles.text}>
            <Link
              to={{
                pathname: `/login`,
              }}
            >
              登录
            </Link>{' '}
            后可查看我的购物车
          </p>
        ) : (
          <p className={styles.text}>购物车是空的</p>
        )}
      </div>
    );
  }
}

export default MissCard;
