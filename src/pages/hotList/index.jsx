import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class HotList extends PureComponent {
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
        };
        getList(params).then(() => {
          this.fetch = false;
        });
      }
    );
  };

  componentWillReceiveProps(nextPorps) {
    console.log(nextPorps.hotList);
    if (nextPorps.hotList.data.length === nextPorps.hotList.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { hotList } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {hotList.data.map((i, index) => {
            return (
              <div key={i.activityId} className={styles.hotItem}>
                <ActivityCard data={i} hot />
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
  hotList: state.home.data.hotList,
});

const mapDispatch = dispatch => ({
  getList: params => dispatch.home.fetchGetHotList(params),
});

export default connect(mapState, mapDispatch)(HotList);
