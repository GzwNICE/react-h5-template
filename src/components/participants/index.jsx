/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import intl from 'react-intl-universal';
import { Modal, Button, ListView } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import winning from '@/assets/images/winning_crown.png';
import partMiss from '@/assets/images/partMiss.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

class Participants extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: dataSource,
      page: 0,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { getPersonnel, id } = this.props;
    if (!this.state.hasMore) return false;
    this.fetch = true;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: 20,
          activityTurnId: id,
        };
        getPersonnel(params).then(() => {
          this.fetch = false;
          this.setState({ isLoading: false });
        });
      }
    );
  };

  componentWillReceiveProps(nextPros) {
    if (nextPros.list.rows && nextPros.list.rows.length === nextPros.list.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
        dataSource: dataSource.cloneWithRows(nextPros.list.rows),
      });
    }
  }

  onEndReached = () => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    this.getList();
  };

  onClose = () => {
    this.props.closeRaffle();
  };

  render() {
    const row = i => {
      return (
        <div className={styles.listItem} key={i.index}>
          <div className={styles.picBox}>
            <img src={i.photoUrl} alt="" className={styles.winPic} />
            {i.status ? <img src={winning} alt="" className={styles.winning} /> : null}
          </div>
          <div className={styles.rightBox}>
            <div>
              <span className={styles.winName}>{i.userName}</span>
              {i.ip ? <span className={styles.ip}>{`（${i.ip}）`}</span> : null}
            </div>
            <div className={styles.times}>
              <span>
                参与了 <span className={styles.round}>{i.partakeCount}</span> 人次
              </span>
              <span className={styles.time}>{i.createTime}</span>
            </div>
          </div>
        </div>
      );
    };
    const { visible, list } = this.props;
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
              {list.rows.length > 0 ? (
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
                  onEndReached={this.onEndReached}
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
const mapState = state => ({
  list: state.product.data.personList,
});

const mapDispatch = dispatch => ({
  getPersonnel: params => dispatch.product.getPersonnel(params),
});

export default connect(mapState, mapDispatch)(Participants);
