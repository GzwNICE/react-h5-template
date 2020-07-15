/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
// import { connect } from 'react-redux';
import { Modal, Button } from 'antd-mobile';
// import { Link } from 'react-router-dom';
// import queryString from 'query-string';
import winDollar from '@/assets/images/winDolag.png';
// import { format } from '@/utils/util';
import styles from './index.less';

// const { lang } = queryString.parse(window.location.search);

class ReceiveAward extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    this.props.close();
  };

  handleConfirm = () => {
    this.props.confirm();
  };

  render() {
    const { visible, data } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          className={styles.receive}
        >
          <div className={styles.content}>
            <img src={winDollar} alt="" className={styles.winDollar} />
            <div className={styles.prodInfo}>
              <img src={data.img} alt="" className={styles.prodImg} />
              <p className={styles.p1}>
                {intl.get('product.become',{ name: data.name })}
              </p>
              <p className={styles.p1}>{`${intl.get('product.winningNumber')}：${data.code}`}</p>
              <p className={styles.p2}>
                {intl.get('product.informationConfirmed')}
              </p>
              <Button type="primary" className={styles.b1} onClick={this.handleConfirm}>
                {intl.get('product.goToConfirm')}
              </Button>
              <p className={styles.b2} onClick={this.onClose}>
                {intl.get('product.confirmLater')}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReceiveAward;
