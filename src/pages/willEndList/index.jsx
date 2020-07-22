/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 首页将止列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class WillEndList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 100,
      isLoading: false,
      hasMore: true,
      fetch: false,
    };
  }

  componentDidMount() {
    this.getPageList();
  }

  getPageList = () => {
    if (!this.state.hasMore) return false;
    this.setState({
      fetch: true,
    });
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
          this.setState({
            fetch: false,
            isLoading: false,
          });
        });
      }
    );
  };

  loadMore = () => {
    const { hasMore, fetch } = this.state;
    if (!hasMore || fetch) return;
    this.setState({
      isLoading: true,
    });
    this.getPageList();
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
    const { isLoading, hasMore } = this.state;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {endList.data.map(i => {
            return (
              <div key={i.activityTurnId + 2} className={styles.hotItem}>
                <ActivityCard data={i} />
              </div>
            );
          })}
        </Flex>
        <div className={styles.loading} onClick={this.loadMore}>
          {isLoading ? 'loading...' : hasMore ? '点击加载更多...' : '已经到底了！'}
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
