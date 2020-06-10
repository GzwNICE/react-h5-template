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
      orderType: 1,
    };
  }

  componentDidMount() {
    console.log(111, this.props);
    this.setState({
      orderType: this.props.location.query.orderType.type,
    });
    // this.state.orderType =  this.props.location.query.orderType.type;
    window.addEventListener('scroll', this.bindHandleScroll);
    this.getPageList();
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
          type: this.state.orderType,
        };
        getList(params).then(() => {
          this.fetch = false;
        });
      }
    );
  };

  componentWillReceiveProps(nextPorps) {
    console.log(nextPorps.orderList);
    if (nextPorps.result.data.length === nextPorps.result.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { result } = this.props;
    const { isLoading } = this.state;
    const orderType = this.state.orderType;
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => console.log('onLeftClick')}
        >
          <div className={styles.title}>待开奖</div>
        </NavBar>
        {result.total == 0 ? (
          <div>kong</div>
        ) : (
          <Flex wrap="wrap" justify="between">
            {result.data.map(i => {
              return (
                <div key={i.id} className={styles.item}>
                  {orderType === 1 ? <WaitOpen data={i} /> : null}
                  {orderType === 2 ? <Win data={i} /> : null}
                  {orderType === 3 ? <NoWin data={i} /> : null}
                </div>
              );
            })}
          </Flex>
        )}
        <div ref={lv => (this.load = lv)} className={styles.loading}>
          {isLoading ? 'loading...' : '已经到底了！'}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  result: state.order.data.orderList,
});

const mapDispatch = dispatch => ({
  getList: params => dispatch.order.getOrderList(params),
});

export default connect(mapState, mapDispatch)(OrderList);
