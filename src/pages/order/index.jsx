// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import WaitOpen from '@/components/waitOpen';
import Win from '@/components/win';
import NoWin from '@/components/nowin';
import Empty from '@/components/empty';
import queryString from 'query-string';

import GoCoinDetailDialog from '@/components/gocoinDetailDialog';
import CashDetailDialog from '@/components/productDetailDialog';
import { NavBar, Icon, PullToRefresh, ListView } from 'antd-mobile';
import { exchangeDetail } from '@/services/order';
import styles from './index.less';

const { label } = queryString.parse(window.location.search);

class OrderList extends PureComponent {
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
      height: document.documentElement.clientHeight,
      refreshing: true,
      goCoinDialog: false,
      cashDialog: false,
      orderId:'',
    };
  }
  componentDidUpdate() {
    if ( this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.bindHandleScroll);
    this.getPageList();
  }
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    const { clearList } = this.props;
    clearList();
  }

  getPageList = () => {
    const { refreshList } = this.props;
    console.log("order_type", queryString.parse(window.location.search).type)
    this.setState(
      {
        page: 1,
        type: queryString.parse(window.location.search).type,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
          type: this.state.type,
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
          type: this.state.type,
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
    // console.log(nextPorps.orderList);
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
  setGoCoinDialog = (_bool, orderId) => {
    this.setState(
      {
        goCoinDialog: _bool,
        orderId: orderId,
      },
      () => {
        if (_bool) {
          const params = {
            orderId: this.state.orderId,
          };
          exchangeDetail(params);
        }
      }
    );
  };
  setCashDialog = (_bool, orderId) => {
    this.setState(
      {
        cashDialog: _bool,
        orderId: orderId,
      },
      () => {
        if (_bool) {
          const params = {
            orderId: this.state.orderId,
          };
          exchangeDetail(params);
        }
      }
    );
  };

  render() {
    const { result } = this.props;
    const { isLoading, goCoinDialog, cashDialog, type } = this.state;
    const Row = d => {
      return (
        <div>
          {type === '1' ? <WaitOpen data={d} /> : null}
          {type === '2' ? <Win parent={this} data={d} /> : null}
          {type === '3' ? <NoWin data={d} /> : null}
        </div>
      );
    };
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
        }}
      />
    );
  
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() =>  this.props.history.go(-1)}
        >
          <div className={styles.title}>{label}</div>
        </NavBar>
        {result.total == 0 ? (
         <Empty />
        ) : (
          <ListView
            ref={el => {
              this.load = el;
            }}
            className={styles.liseView}
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
                    margin: '5px 0',
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
        <GoCoinDetailDialog parent={this} codeModal={goCoinDialog} />
        <CashDetailDialog parent={this} codeModal={cashDialog} />

      </div>
    );
  }
}

const mapState = state => ({
  result: state.order.data.orderList,
});

const mapDispatch = dispatch => ({
  refreshList: params => dispatch.order.getRefreshList(params),
  loadList: params => dispatch.order.getLoadList(params),
  clearList: params => dispatch.order.clearOrderList(params),
  exchangeDetail: params => dispatch.order.getExchangeDetail(params),
});

export default connect(mapState, mapDispatch)(OrderList);
