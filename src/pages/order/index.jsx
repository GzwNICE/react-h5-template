// 我的订单列表
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import WaitOpen from '@/components/waitOpen';
import Win from '@/components/win';
import NoWin from '@/components/nowin';


import { Flex, NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 20,
      isLoading: true,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.getPageList();
    window.addEventListener('scroll', this.bindHandleScroll);
    const a = this.props.location.query;
    console.log('orderType', a);
  }
  bindHandleScroll = event => {
    // 滚动的高度
    const scrollTop =
      (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
      window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
    const sh = scrollTop + event.srcElement.documentElement.clientHeight - 200;
    // eslint-disable-next-line react/no-find-dom-node
    const h = ReactDOM.findDOMNode(this.load).offsetTop;
    if (sh > h) {
      if (!this.fetch) {
        this.getPageList();
      }
    }
  };
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll);
  }

  getPageList = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.hasMore) return false;
    this.fetch = true;
    const { getList } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
          type: 0,
        };
        getList(params).then(() => {
          this.fetch = false;
        });
      }
    );
  };

  componentWillReceiveProps(nextPorps) {
    console.log(nextPorps.orderList);
    if (nextPorps.orderList.length === nextPorps.orderList.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { orderList } = this.props;
    const { isLoading } = this.state;
    console.log("页面数据",orderList);
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209'}}
          onLeftClick={() => console.log('onLeftClick')}>
          <div className={styles.title}>待开奖</div>
        </NavBar>
        <Flex wrap="wrap" justify="between">
          {orderList.map((i, index) => {
            return (
              <div key={i.activityId} className={styles.item}>
                <NoWin data={i} />
              </div>
            );
          })}
        </Flex>
        <div ref={lv => (this.load = lv)} className={styles.loading}>
          {isLoading ? 'loading...' : '已经到底了！'}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  orderList: state.order.data.orderList,
});

const mapDispatch = dispatch => ({
  getList: params => dispatch.order.getOrderList(params),
});

export default connect(mapState, mapDispatch)(OrderList);
