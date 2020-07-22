/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 首页最新列表
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class LatestList extends PureComponent {
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
    const { getLatestList } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
        };
        getLatestList(params).then(() => {
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
    if (nextPorps.latestList.data.length === nextPorps.latestList.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { latestList } = this.props;
    const { isLoading, hasMore } = this.state;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {latestList.data.map(i => {
            return (
              <div key={i.activityTurnId} className={styles.hotItem}>
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
  latestList: state.home.data.latestList,
});

const mapDispatch = dispatch => ({
  getLatestList: params => dispatch.home.fetchGetLatestList(params),
});

export default connect(mapState, mapDispatch)(LatestList);
