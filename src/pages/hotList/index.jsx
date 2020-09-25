/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 首页人气列表
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import prodJson from '@/assets/product.json';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class HotList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 100,
      isLoading: false,
      hasMore: true,
      fetch: false,
      prodJson: prodJson
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
    if (nextPorps.hotList.data.length === nextPorps.hotList.total) {
      this.setState({
        hasMore: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { hotList } = this.props;
    const { prodJson } = this.state;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {prodJson.map(i => {
            return (
              <div key={i.id} className={styles.hotItem}>
                <ActivityCard data={i} hot />
              </div>
            );
          })}
        </Flex>
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
