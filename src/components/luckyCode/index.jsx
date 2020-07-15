/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Modal, Button, ListView } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import partMiss from '@/assets/images/partMiss.png';
import { format } from '@/utils/util';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

class LuckyCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: dataSource,
      page: 0,
      hasMore: true,
    };
  }

  getList = () => {
    const { getDrawCode, id } = this.props;
    console.log(id);
    if (!this.state.hasMore) return false;
    this.fetch = true;
    if (id) {
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
          getDrawCode(params).then(() => {
            this.fetch = false;
            this.setState({
              isLoading: false,
              dataSource: dataSource.cloneWithRows(this.props.codeList.rows),
            });
            if (this.props.codeList.rows.length === this.props.codeList.total) {
              this.setState({
                hasMore: false,
              });
            }
          });
        }
      );
    }
  };

  componentWillReceiveProps(nextPros) {
    // console.log(3, nextPros.visible);
    // console.log(4, this.props.visible);
    if (nextPros.visible !== this.props.visible && nextPros.visible) {
      console.log(1111);
      this.getList();
    }
  }

  onEndReached = () => {
    if (!this.state.hasMore) return false;
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
          <div className={styles.numbering}>{i.prizesCode}</div>
          <div className={styles.time}>{`${intl.get('order.str_order_time')} ${format(i.distributeTime, 'str')}`}</div>
        </div>
      );
    };
    const { visible, codeList } = this.props;
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
              <span className={styles.title}>{`${intl.get('product.myLotteryCode')}（${codeList.total}）`}</span>
              <span className={styles.titleTips}>{intl.get('product.drawCodes')}</span>
            </div>
            <div className={styles.list}>
              {codeList.rows.length > 0 ? (
                <ListView
                  // ref={el => this.lv = el}
                  dataSource={dataSource}
                  renderFooter={() => (
                    <div style={{ textAlign: 'center' }}>
                      {isLoading ? 'Loading...' : `${intl.get('product.noMore')}`}
                    </div>
                  )}
                  renderRow={row}
                  style={{
                    height: '2.9rem',
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
                  <p>{intl.get('product.noRecord')}</p>
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
  codeList: state.product.data.luckCodeList,
});

const mapDispatch = dispatch => ({
  getDrawCode: params => dispatch.product.getDrawCode(params),
});

export default connect(mapState, mapDispatch)(LuckyCode);
