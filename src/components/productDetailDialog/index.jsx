import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Button, Modal } from 'antd-mobile';
import DialogItem from '@/components/dialogItem';

import styles from './index.less';

class DetailDialog extends PureComponent {
  render() {
    const { codeModal } = this.props;
    return (
      <div className={styles.regPage}>
        <Modal
          visible={true}
          transparent
          maskClosable={false}
          title="兑换详情"
          className={styles.codeModal}
        >
          <DialogItem data={{ title: '兑换状态', value: '审核中' }} />
          <DialogItem data={{ title: '奖品零售价', value: '10,000,000 ₫' }} />
          <DialogItem data={{ title: '税费/服务费比例', value: '5%' }} />

          <DialogItem data={{ title: '税费/服务费', value: '5,000 ₫' }} />

          <DialogItem data={{ title: '预估到账', value: '9,500,000 ₫' }} />
          <DialogItem data={{ title: '申请时间', value: '11/01/2020 12:23' }} />
          <DialogItem data={{ title: '持卡人姓名', value: '张三' }} />
          <DialogItem data={{ title: '银行名称', value: '招商银行' }} />
          <DialogItem data={{ title: '卡号', value: '6229 1345 1234 1234 321' }} />
          <div className={styles.footer}>
            <Button className={styles.cancel} >知道了</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default DetailDialog;
