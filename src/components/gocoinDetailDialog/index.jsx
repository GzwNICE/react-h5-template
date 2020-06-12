import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Button, Modal } from 'antd-mobile';
import DialogItem from '@/components/dialogItem';

import styles from './index.less';

class DetailDialog extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      showDialog: data.codeModal,
    };
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  render() {
    console.log('DetailDialog1',this.state.showDialog);
    const { showDialog } = this.state;
    return (
      <div className={styles.regPage}>
        <Modal
          visible={showDialog}
          transparent
          maskClosable={false}
          title="兑换详情"
          className={styles.codeModal}
        >
          <DialogItem data={{ title: '奖品价值', value: '3912 GO币' }} />
          <DialogItem data={{ title: '额外赠送比例', value: '5%' }} />
          <DialogItem data={{ title: '额外赠送数量', value: '3912 GO币' }} />
          <DialogItem data={{ title: '最终兑换金额', value: '3912 GO币' }} />
          <DialogItem data={{ title: '兑换时间', value: '11/01/2020 12:23' }} />
          <div className={styles.footer}>
            <Button className={styles.cancel} onClick={this.onClose('showDialog')}>知道了</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default DetailDialog;
