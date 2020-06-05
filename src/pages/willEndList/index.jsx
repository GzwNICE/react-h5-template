// 首页将止列表
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class WillEndList extends PureComponent {
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
    const { getOpenList } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
        };
        getOpenList(params).then(() => {
          this.fetch = false;
        });
      }
    );
  };

  componentWillReceiveProps(nextPorps) {
    if (nextPorps.endList.data.length === nextPorps.endList.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { endList } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {endList.data.map(i => {
            return (
              <div key={i.activityTurnId} className={styles.hotItem}>
                <ActivityCard data={i} />
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
  endList: state.home.data.endList,
});

const mapDispatch = dispatch => ({
  getOpenList: params => dispatch.home.fetchGetEndList(params),
});

export default connect(mapState, mapDispatch)(WillEndList);
