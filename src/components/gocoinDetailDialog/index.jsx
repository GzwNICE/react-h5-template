import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import intl from 'react-intl-universal';

// import intl from 'react-intl-universal';
import { Button, Modal } from 'antd-mobile';
import DialogItem from '@/components/dialogItem';

import styles from './index.less';

class DetailDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
    };
  }
  onClose() {
    this.props.parent.setGoCoinDialog(false);
  }

  render() {
    const { codeModal, getGoCoinDetail, orderId } = this.props;
    const { moneyVirtualCn } = JSON.parse(localStorage.getItem('configuration'));

    getGoCoinDetail({ orderId: orderId }).then(res => {
      this.setState({
        result: res.data,
      });
    });

    return (
      <div className={styles.regPage}>
        <Modal
          visible={codeModal}
          transparent
          maskClosable={false}
          title={intl.get('order.dialogDetail')}
          className={styles.codeModal}
        >
          <DialogItem
            data={{
              title: intl.get('order.productGoMoney'),
              value: `${this.state.result.productGoMoney}${moneyVirtualCn}`,
            }}
          />
          <DialogItem data={{ title: intl.get('order.goGiveRate'), value: `${this.state.result.goGiveRate}%` }} />
          <DialogItem
            data={{
              title: intl.get('order.goGiveMoney'),
              value: `${this.state.result.goGiveMoney}${moneyVirtualCn}`,
            }}
          />
          <DialogItem
            data={{
              title: intl.get('order.convertGoMoney'),
              value: `${this.state.result.convertGoMoney}${moneyVirtualCn}`,
            }}
          />
          <DialogItem
            data={{
              title: intl.get('order.createTime'),
              value: moment(this.state.result.createTime).format('DD/MM/YYYY HH:mm'),
            }}
          />
          <div className={styles.footer}>
            <Button className={styles.cancel} onClick={this.onClose.bind(this)}>
              {intl.get('order.know')}
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapState = state => ({
  coinDetail: state.user.data.goCoinDetail,
});

const mapDispatch = dispatch => ({
  getGoCoinDetail: params => dispatch.order.getExchangeDetail(params),
});

export default connect(mapState, mapDispatch)(DetailDialog);
