/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Empty from '@/components/empty';
import intl from 'react-intl-universal';
import NoShowItem from '@/pages/user/evaluation/noShow/item';
import { ListView } from 'antd-mobile';
import styles from './index.less';

let page = 0;
let size = 10;

class NoShow extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      useBodyScroll: false,
      height: document.documentElement.clientHeight - 50,
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
    this.refreshList();
  }
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    const { clearList } = this.props;
    clearList();
    document.body.style.overflow = 'auto';
  }

  refreshList = () => {
    const { getList, type} = this.props;
    page = 1;
    const params = {
      isRefresh: true,
      url: `/app/order/show/${type}/list?page=${page}&size=${size}`,
    };
    getList(params).then(() => {
      if (this.props.result.data) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
        });
      }
    });
  };
  loadPageList = () => {
    if (this.props.result.data.length === this.props.result.total) return false;
    const { getList, type } = this.props;
    page = page + 1;
    const params = {
      isRefresh: false,
      url: `/app/order/show/${type}/list?page=${page}&size=${size}`,
    };
    console.log("page",params)

    getList(params).then(() => {
      if (this.props.result.data) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
        });
      }
    });
  };
  componentWillReceiveProps(nextPorps) {
    // console.log(nextPorps.orderList);
    if (nextPorps.result.data) {
      if (nextPorps.result.data.length === nextPorps.result.total) {
        this.setState({
          isLoading: false,
        });
      }
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  render() {
    const {result,push} = this.props;
    const { isLoading } = this.state;
    const Row = d => {
      return (
        <div>
          <NoShowItem data={d} push={push} />
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
      <div>
        {result.total === 0 ? (
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
                    }
                }
                scrollRenderAheadDistance={100}
                onEndReachedThreshold={10}
                scrollEventThrottle={100}
                initialListSize={1000}
                pageSize={10}
                onEndReached={this.loadPageList.bind(this)} // 上啦加载
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
  result: state.user.data.resultNoShowList,
});

const mapDispatch = dispatch => ({
  getList: params => dispatch.user.getNoShowList(params),
  clearList: params => dispatch.user.clearList(params),
});

export default connect(mapState, mapDispatch)(NoShow);
