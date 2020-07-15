// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import WaitOpen from '@/components/waitOpen';
import Win from '@/components/win';
import NoWin from '@/components/nowin';
import Empty from '@/components/empty';
import queryString from 'query-string';
import intl from 'react-intl-universal';

import GoCoinDetailDialog from '@/components/gocoinDetailDialog';
import CashDetailDialog from '@/components/productDetailDialog';
import RaffleCodeDialog from '@/components/luckyCode';

import { NavBar, Icon, PullToRefresh, ListView } from 'antd-mobile';
import styles from './index.less';

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
      height: document.documentElement.clientHeight - 50,
      refreshing: true,
      goCoinDialog: false,
      cashDialog: false,
      goCoinOrderId: '',
      cashOrderId: '',
      visibleRaffle: false,
      activityTurnId: null,
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
    window.addEventListener('scroll', this.bindHandleScroll);
    this.getPageList();
  }
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    const { clearList } = this.props;
    clearList();
    document.body.style.overflow = 'auto';
  }

  getPageList = () => {
    const { refreshList } = this.props;
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
    if (this.props.result.data.length === this.props.result.total) return false;
    const { loadList } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
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
    this.setState({
      goCoinDialog: _bool,
      goCoinOrderId: orderId,
    });
  };
  setCashDialog = (_bool, orderId) => {
    this.setState({
      cashDialog: _bool,
      cashOrderId: orderId,
    });
  };
  showCodeDialog = turnId => {
    this.setState(
      {
        activityTurnId: turnId,
      },
      () => {
        this.setState({
          visibleRaffle: true,
        });
      }
    );
  };
  closeRaffle = key => () => {
    this.setState({
      [key]: false,
    });
  };
  handlerPush = url => {
    this.props.history.push(url);
  };
  render() {
    const { result } = this.props;
    const { isLoading, goCoinDialog, cashDialog, type, visibleRaffle, activityTurnId } = this.state;
    const label = queryString.parse(window.location.search).label;
    const Row = d => {
      return (
        <div>
          {type === '1' ? <WaitOpen parent={this} data={d} push={this.handlerPush} /> : null}
          {type === '2' ? <Win parent={this} data={d} push={this.handlerPush} /> : null}
          {type === '3' ? <NoWin data={d} push={this.handlerPush}/> : null}
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
          onLeftClick={() => this.props.history.go(-1)}
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
                  }
            }
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={100}
            initialListSize={1000}
            pageSize={10}
            // pullToRefresh={
            //   <PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            // }
            onEndReached={this.loadPageList} // 上啦加载
            renderFooter={() => (
              <div style={{ padding: 10, textAlign: 'center' }}>
                {isLoading ? 'Loading...' : intl.get('list.isEnd')}
              </div>
            )}
          />
        )}
        <RaffleCodeDialog
          visible={visibleRaffle}
          closeRaffle={this.closeRaffle('visibleRaffle')}
          id={activityTurnId}
        />

        {this.state.goCoinOrderId ? (
          <GoCoinDetailDialog
            parent={this}
            codeModal={goCoinDialog}
            orderId={this.state.goCoinOrderId}
          />
        ) : null}
        {this.state.cashOrderId ? (
          <CashDetailDialog parent={this} codeModal={cashDialog} orderId={this.state.cashOrderId} />
        ) : null}
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
