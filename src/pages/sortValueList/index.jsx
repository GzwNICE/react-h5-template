/* eslint-disable react/destructuring-assignment */
// 首页价值列表
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class SortValueList extends PureComponent {
  constructor(props) {
    super(props);
  }

  loadMore = () => {
    this.props.loadMore();
  };

  render() {
    const { sortList, isLoading, hasMore } = this.props;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {sortList.data.map(i => {
            return (
              <div key={i.activityTurnId + 3} className={styles.hotItem}>
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
  sortList: state.home.data.sortList,
});

const mapDispatch = dispatch => ({
  getSortList: params => dispatch.home.fetchGetSortList(params),
});

export default connect(mapState, mapDispatch)(SortValueList);
