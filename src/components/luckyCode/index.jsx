import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Modal, Button, ListView } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
// import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

const data = [
  {
    title: '10000012312',
    des: '2019-10-01 13：00',
  },
  {
    title: '10000012313',
    des: '2019-10-02 13：00',
  },
];

class LuckyCode extends PureComponent {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      isLoading: false,
      dataSource: data.length > 0 ? dataSource.cloneWithRows(data) : dataSource,
    };
  }

  onClose = () => {
    this.props.closeRaffle();
  };

  render() {
    const row = i => {
      return (
        <div className={styles.listItem} key={i.index}>
          <div className={styles.numbering}>{i.title}</div>
          <div className={styles.time}>下单时间：{i.des}</div>
        </div>
      );
    };
    const { visible } = this.props;
    const { dataSource, isLoading } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          transparent
          closable
          maskClosable={false}
          onClose={this.onClose}
          className={styles.modal}
        >
          <div className={styles.content}>
            <div className={styles.titleBox}>
              <span className={styles.title}>我的抽奖码（3）</span>
              <span className={styles.titleTips}>抽奖码越多，中奖概率越高</span>
            </div>
            <div className={styles.list}>
              <ListView
                // ref={el => this.lv = el}
                dataSource={dataSource}
                renderFooter={() => (
                  <div style={{ textAlign: 'center' }}>
                    {isLoading ? 'Loading...' : '没有更多了！'}
                  </div>
                )}
                renderRow={row}
                style={{
                  height: '2.2rem',
                  overflow: 'auto',
                }}
                pageSize={4}
                scrollRenderAheadDistance={500}
                // onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            </div>
            <Button className={styles.buyMore}>购买更多抽奖码</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default LuckyCode;
