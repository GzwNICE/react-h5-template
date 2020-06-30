/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
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
              <p className={styles.p1}>{`成为 ${data.name} 中奖用户`}</p>
              <p className={styles.p1}>{`你的中奖号码为：${data.code}`}</p>
              <p className={styles.p2}>
                请前往领奖确认页进行信息确认，若超过24小时没有认领，将视为自动放弃领奖。
              </p>
              <Button type="primary" className={styles.b1} onClick={this.handleConfirm}>
                前往确认
              </Button>
              <p className={styles.b2} onClick={this.onClose}>
                稍后确认
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReceiveAward;
