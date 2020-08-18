/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import { ListView } from 'antd-mobile';
import IntegralCard from '@/components/integralCard';
import Empty from '@/components/empty';
import styles from './index.less';

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class PointsDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: dataSource,
      page: 1,
      hasMore: true,
      isLoading: false,
    };
    this.initList = throttle(this.initList, 1000);
  }

  componentDidMount() {
    this.initList();
    window.scrollTo(0, 0);
  }

  initList = more => {
    const { getPointsList } = this.props;
    getPointsList({
      page: more ? this.state.page + 1 : this.state.page,
      size: 20,
      tradeType: 'IN',
    }).then(res => {
      if (res.code === 200) {
        this.fetch = false;
        this.setState({
          isLoading: false,
          dataSource: dataSource.cloneWithRows(this.props.pointsList.rows),
        });
      }
    });
  };

  onEndReached = () => {
    if (!this.state.hasMore) {
      return;
    } else {
      this.setState({ isLoading: true });
      this.initList('more');
    }
  };

  componentWillReceiveProps(nextPros) {
    if (nextPros.pointsList.rows.length !== nextPros.pointsList.total) {
      this.setState({
        hasMore: true,
      });
    } else {
      this.setState({
        hasMore: false,
      });
    }
  }

  render() {
    const { dataSource, isLoading, hasMore } = this.state;
    const { pointsList } = this.props;
    const row = (i, d, s) => {
      return (
        <div className={styles.content} key={i.id}>
          <IntegralCard data={i} type="points" last={Number(s) === pointsList.rows.length - 1} />
        </div>
      );
    };
    return (
      <div className={styles.page}>
        {pointsList.total > 0 ? (
          <ListView
            dataSource={dataSource}
            renderFooter={() => (
              <div style={{ textAlign: 'center', padding: '0.1rem 0' }}>
                {isLoading
                  ? 'Loading...'
                  : hasMore
                  ? intl.get('commodity.loadMore')
                  : '- 没有更多内容了-'}
              </div>
            )}
            renderRow={row}
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            scrollRenderAheadDistance={100}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
        ) : (
          <Empty text="暂时还没有积分明细哦" />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  pointsList: state.integral.data.pointsList,
});

const mapDispatch = dispatch => ({
  getPointsList: params => dispatch.integral.getPointsList(params),
});

export default connect(mapState, mapDispatch)(PointsDetail);
