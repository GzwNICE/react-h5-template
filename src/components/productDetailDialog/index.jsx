import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Button, Modal } from 'antd-mobile';
import DialogItem from '@/components/dialogItem';
import { connect } from 'react-redux';
import moment from 'moment';
import intl from 'react-intl-universal';

import styles from './index.less';

class DetailDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      status: '',
    };
  }
  onClose() {
    this.props.parent.setCashDialog(false);
  }
  render() {
    const { codeModal, getGoCoinDetail, orderId } = this.props;
    const { moneySymbol } = JSON.parse(localStorage.getItem('configuration'));

    getGoCoinDetail({ orderId: orderId }).then(res => {
      let statusContent = '';
      if (res.data.status == 0) {
        statusContent = intl.get('order.applying');
      } else {
        statusContent = intl.get('order.finish');
      }
      this.setState({
        result: res.data,
        status: statusContent,
      });
    });
    return (
      <div className={styles.regPage}>
        <Modal
          visible={codeModal}
          transparent
          maskClosable={false}
          title={intl.get('order.str_winget_detail')}
          className={styles.codeModal}
        >
          <DialogItem data={{ title: intl.get('order.status'), value: this.state.status }} />
          <DialogItem
            data={{ title: intl.get('order.marketPrice'), value: `${this.state.result.marketPrice} ${moneySymbol}` }}
          />
          <DialogItem
            data={{ title: intl.get('order.serviceFeeRate'), value: `${this.state.result.serviceFeeRate}%` }}
          />

          <DialogItem
            data={{ title: intl.get('order.serviceFee'), value: `${this.state.result.serviceFee} ${moneySymbol}` }}
          />

          <DialogItem
            data={{ title: intl.get('order.convertPrice'), value: `${this.state.result.convertPrice} ${moneySymbol}` }}
          />
          <DialogItem
            data={{
              title: intl.get('order.applyTime'),
              value: moment(this.state.result.createTime).format('DD/MM/YYYY HH:mm'),
            }}
          />
          <DialogItem data={{ title: intl.get('order.realName'), value: this.state.result.realName }} />
          <DialogItem data={{ title: intl.get('order.bankName'), value: this.state.result.bankName }} />
          <DialogItem data={{ title: intl.get('order.bankCardNum'), value: this.state.result.bankCardNum }} />

          <div className={styles.companyInfo}>{intl.get('order.unitInfo')}</div>
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
