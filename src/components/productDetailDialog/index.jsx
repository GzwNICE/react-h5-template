import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Button, Modal } from 'antd-mobile';
import DialogItem from '@/components/dialogItem';
import { connect } from 'react-redux';
import moment from 'moment';

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
        statusContent = '审核中';
      } else {
        statusContent = '已完成';
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
          title="兑换详情"
          className={styles.codeModal}
        >
          <DialogItem data={{ title: '兑换状态', value: this.state.status }} />
          <DialogItem
            data={{ title: '奖品零售价', value: `${this.state.result.marketPrice} ${moneySymbol}` }}
          />
          <DialogItem
            data={{ title: '税费/服务费比例', value: `${this.state.result.serviceFeeRate}%` }}
          />

          <DialogItem
            data={{ title: '税费/服务费', value: `${this.state.result.serviceFee} ${moneySymbol}` }}
          />

          <DialogItem
            data={{ title: '预估到账', value: `${this.state.result.convertPrice} ${moneySymbol}` }}
          />
          <DialogItem
            data={{
              title: '申请时间',
              value: moment(this.state.result.createTime).format('DD/MM/YYYY HH:mm'),
            }}
          />
          <DialogItem data={{ title: '持卡人姓名', value: this.state.result.realName }} />
          <DialogItem data={{ title: '银行名称', value: this.state.result.bankName }} />
          <DialogItem data={{ title: '卡号', value: this.state.result.bankCardNum }} />

          <div className={styles.companyInfo}>
            GaGaGO已对接第三方礼品回收公司，并委托第三方公司进行奖品兑现工作。
          </div>
          <div className={styles.footer}>
            <Button className={styles.cancel} onClick={this.onClose.bind(this)}>
              知道了
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
