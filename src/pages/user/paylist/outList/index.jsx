/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PaymentItem from '@/components/paymentitem';
import Empty from '@/components/empty';
import intl from 'react-intl-universal';

import { PullToRefresh, ListView } from 'antd-mobile';
import styles from './index.less';

class DetailList extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      page: 0,
      size: 10,
      isLoading: true,
      // useBodyScroll: false,
      height: document.documentElement.clientHeight - 220,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    this.setState({
      type: type,
    });
    this.loadPageList();
  }

  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    const { clearList } = this.props;
    clearList();
  }

  getPageList = () => {
    const { refreshList } = this.props;
    this.setState(
      {
        page: 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
          tradeType: this.state.type,
        };
        refreshList(params).then(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
          });
        });
      }
    );
  };
  loadPageList = () => {
    const { loadList } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
        isLoading: true,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
          tradeType: this.state.type,
        };
        loadList(params).then(() => {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
          });
        });
      }
    );
  };
  componentWillReceiveProps(nextPorps) {
    if (nextPorps.result.data.length === nextPorps.result.total) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { result } = this.props;
    const { isLoading, type, dataSource, height } = this.state;
    const Row = d => {
      return (
        <div>
          <PaymentItem data={d} type={type} />
        </div>
      );
    };
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 1,
          marginLeft: '15px',
        }}
      />
    );
    return (
      <div className={styles.order}>
        {result.total == 0 ? (
          <Empty />
        ) : (
          <ListView
            ref={el => {
              this.load = el;
            }}
            key={1}
            dataSource={dataSource}
            renderRow={Row}
            renderSeparator={separator}
            style={{
              height: height,
              border: '1px solid #ddd',
              margin: '1px 0',
            }}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={100}
            initialListSize={1000}
            pageSize={10}
            onEndReached={this.loadPageList} // 上啦加载
            renderFooter={() => (
              <div style={{ padding: 10, textAlign: 'center' }}>
                {isLoading ? 'Loading...' : intl.get('list.isEnd')}
              </div>
            )}
          />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  result: state.payment.data.outList,
});

const mapDispatch = dispatch => ({
  refreshList: params => dispatch.payment.getRefreshList(params),
  loadList: params => dispatch.payment.getLoadList(params),
  clearList: params => dispatch.payment.clearPaymentList(params),
});

export default connect(mapState, mapDispatch)(DetailList);
