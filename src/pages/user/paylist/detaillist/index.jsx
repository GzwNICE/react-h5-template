// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PaymentItem from '@/components/paymentitem';
import Empty from '@/components/empty';
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
      useBodyScroll: false,
      height: document.documentElement.clientHeight - 220,
      refreshing: true,
    };
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  componentDidMount() {
    const { type } = this.props;
    this.setState({
      type: type,
    });
    this.getPageList();
    window.addEventListener('scroll', this.bindHandleScroll);
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
            refreshing: false,
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
        page: this.state.page+1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
          tradeType: this.state.type,
        };
        loadList(params).then(() => {
          this.setState({
            refreshing: false,
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
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.getPageList();
  };
  render() {
    const { result } = this.props;
    const { isLoading, type } = this.state;
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
            key={this.state.useBodyScroll ? '0' : '1'}
            dataSource={this.state.dataSource}
            renderRow={Row}
            renderSeparator={separator}
            useBodyScroll={this.state.useBodyScroll}
            style={
              this.state.useBodyScroll
                ? {}
                : {
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '1px 0',
                  }}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={100}
            initialListSize={1000}
            pageSize={10}
            pullToRefresh={
              <PullToRefresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
            />}
            onEndReached={this.loadPageList} // 上啦加载
            renderFooter={() => (
              <div style={{ padding: 10, textAlign: 'center' }}>
                {isLoading ? 'Loading...' : '已经到底了！'}
              </div>
            )}
          />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  result: state.payment.data.paymentList,
});

const mapDispatch = dispatch => ({
  refreshList: params => dispatch.payment.getRefreshList(params),
  loadList: params => dispatch.payment.getLoadList(params),
  clearList: params => dispatch.payment.clearPaymentList(params),
});

export default connect(mapState, mapDispatch)(DetailList);
