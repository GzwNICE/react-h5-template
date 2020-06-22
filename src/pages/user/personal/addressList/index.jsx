// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AddressItem from '@/components/addressItem';
import Empty from '@/components/empty';
import { NavBar, Icon, PullToRefresh, ListView, Button } from 'antd-mobile';
import queryString from 'query-string';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class PayHistory extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      refreshing: true,
    };
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
    refreshList().then(() => {
      this.setState({
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(this.props.result.data),
      });
    });
  };
  addAddressClick() {
    this.props.history.push(`/addressAdd?lang=${lang}`);
  }
  render() {
    const { result } = this.props;
    // const { isLoading } = this.state;
    const Row = d => {
      return (
        <div>
          <AddressItem parent={this} data={d} />
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
      <div className={styles.box}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          收货地址管理
        </NavBar>
        {result.total == 0 ? (
          <Empty />
        ) : (
          <ListView
            ref={el => {
              this.load = el;
            }}
            dataSource={this.state.dataSource}
            renderRow={Row}
            renderSeparator={separator}
            useBodyScroll
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
              <PullToRefresh refreshing={this.state.refreshing} onRefresh={this.getPageList} />
            }
          />
        )}
        <div className={styles.addAddress}>
          <Button className={styles.submit} onClick={this.addAddressClick.bind(this)}>+ 添加收货地址</Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  result: state.user.data.addressList,
});

const mapDispatch = dispatch => ({
  refreshList: () => dispatch.user.getAddressList(),
  clearList: () => dispatch.user.clearAddressList(),
});

export default connect(mapState, mapDispatch)(PayHistory);
