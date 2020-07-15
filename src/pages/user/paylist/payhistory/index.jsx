/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HistoryItem from '@/components/payHistoryItem';
import Empty from '@/components/empty';
import { NavBar, Icon, PullToRefresh, ListView } from 'antd-mobile';
import intl from 'react-intl-universal';

import styles from './index.less';

class PayHistory extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      page: 0,
      size: 20,
      isLoading: true,
      hadMore: true,
      useBodyScroll: false,
      refreshing: true,
    };
  }
  componentDidUpdate() {
    // if (this.state.useBodyScroll) {
    //   document.body.style.overflow = 'auto';
    // } else {
    //   document.body.style.overflow = 'hidden';
    // }
  }
  componentDidMount() {
    this.getPageList();
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
        };
        refreshList(params).then(res => {
          if (res.total != 0) {
            this.setState({
              refreshing: false,
              dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
            });
          }
        });
      }
    );
  };
  loadPageList = () => {
    if (!this.state.hadMore) return;
    const { loadList } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
        };
        loadList(params).then(() => {
          // console.log(this.props.result);
          this.setState({
            isLoading: this.state.page * this.state.size <= this.props.result.total
          });
          this.setState({
            refreshing: false,
            dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
          });
        });
      }
    );
  };
  componentWillReceiveProps(nextPorps) {
    if (nextPorps.result.data && nextPorps.result.data.length === nextPorps.result.total) {
      this.setState({
        isLoading: false,
        hadMore: false,
      });
    }
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.getPageList();
  };
  render() {
    const { result } = this.props;
    const { isLoading } = this.state;
    const Row = d => {
      // console.log('row', d)
      return (
        <div>
          <HistoryItem data={d} />
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
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          {intl.get('user.rechargeList')}
        </NavBar>
        {result.total == 0 ? (
          <Empty />
        ) : (
          <ListView
            ref={el => {
              this.load = el;
            }}
            // key={this.state.useBodyScroll ? '0' : '1'}
            className={styles.container}
            dataSource={this.state.dataSource}
            renderRow={Row}
            renderSeparator={separator}
            style={{
              border: '1px solid #ddd',
              margin: '1px 0',
            }}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={100}
            initialListSize={1000}
            pageSize={10}
            pullToRefresh={
              <PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
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
  result: state.payment.data.historyList,
});

const mapDispatch = dispatch => ({
  refreshList: params => dispatch.payment.getRefreshHistoryList(params),
  loadList: params => dispatch.payment.getLoadHistoryList(params),
  clearList: params => dispatch.payment.clearHistoryList(params),
});

export default connect(mapState, mapDispatch)(PayHistory);
