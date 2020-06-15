import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Modal, Button, ListView } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import winning from '@/assets/images/winning_crown.png';
import partMiss from '@/assets/images/partMiss.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    name: '张三',
    ip: '越南河内，28.20.192.13',
    time: '2019-10-01 13：00',
    round: '74',
    win: true,
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    name: 'Harry',
    ip: '越南河内，28.20.192.13',
    time: '2019-10-01 13：00',
    round: '74',
    win: false,
  },
];

class Participants extends PureComponent {
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
    // eslint-disable-next-line react/destructuring-assignment
    this.props.closeRaffle();
  };

  render() {
    const row = i => {
      return (
        <div className={styles.listItem} key={i.index}>
          <div className={styles.picBox}>
            <img src={i.img} alt="" className={styles.winPic} />
            {i.win ? <img src={winning} alt="" className={styles.winning} /> : null}
          </div>
          <div className={styles.rightBox}>
            <div>
              <span className={styles.winName}>{i.name}</span>
              <span className={styles.ip}>{`（${i.ip}）`}</span>
            </div>
            <div className={styles.times}>
              <span>
                参与了 <span className={styles.round}>{i.round}</span> 人次
              </span>
              <span className={styles.time}>{i.time}</span>
            </div>
          </div>
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
          className={styles.partModal}
        >
          <div className={styles.content}>
            <div className={styles.titleBox}>
              <span className={styles.title}>本期参与人员</span>
            </div>
            <div className={styles.list}>
              {data.length > 0 ? (
                <ListView
                  dataSource={dataSource}
                  renderFooter={() => (
                    <div style={{ textAlign: 'center' }}>
                      {isLoading ? 'Loading...' : '没有更多了！'}
                    </div>
                  )}
                  renderRow={row}
                  style={{
                    height: '3.1rem',
                    overflow: 'auto',
                  }}
                  pageSize={4}
                  scrollRenderAheadDistance={500}
                  // onEndReached={this.onEndReached}
                  onEndReachedThreshold={10}
                />
              ) : (
                <div className={styles.blankBox}>
                  <img src={partMiss} alt="" />
                  <p>暂时还没有参与记录</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Participants;
