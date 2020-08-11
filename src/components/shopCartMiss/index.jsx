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
              {intl.get('login.login')}
            </Link>{' '}
            {intl.get('shoppingCart.checkCart')}
          </p>
        ) : (
          <p className={styles.text}>{intl.get('shoppingCart.shoppingEmpty')}</p>
        )}
      </div>
    );
  }
}

export default MissCard;
