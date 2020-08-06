/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Empty from '@/components/empty';
import intl from 'react-intl-universal';
import Item from '@/pages/user/invitation/reward/friendhistory/item';

import { ListView } from 'antd-mobile';
import styles from './index.less';

let page = 1;
let size = 10;

class History extends PureComponent {
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
    const { getList } = this.props;
    page = 1;
    const params = {
      page: page,
      size: size,
      isRefresh: true,
      url: `/app/inviter/friend/record/list`,
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
    const { getList } = this.props;
    page = page + 1;
    const params = {
      page: page,
      size: size,
      isRefresh: false,
      url: `/app/inviter/friend/record/list`,
    };
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
    const { result, type } = this.props;
    const { isLoading } = this.state;
    const Row = d => {
      return (
        <div>
          <Item data={d} type={type} />
        </div>
      );
    };
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 1,
        }}
      />
    );
    return (
      <div>
        {result.total == 0 ? (
          <Empty />
        ) : (
          <div>
             <div className={styles.historyTitle}>
                <div className={styles.title} style={{ textAlign: 'left' }}>
                {intl.get('user.str_friend_account')}
              </div>
              <div className={styles.title} style={{ textAlign: 'left' }}>
                {intl.get('user.str_invited_time')}
                </div>
              <div className={styles.title} style={{ textAlign: 'right' }}>
                {intl.get('user.str_invited_state')}
              </div>
              </div>
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
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  result: state.user.data.resultFriendList,
});

const mapDispatch = dispatch => ({
  getList: params => dispatch.user.getFriendList(params),
  clearList: params => dispatch.user.clearList(params),
});

export default connect(mapState, mapDispatch)(History);
