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
class Exchange extends PureComponent {
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
    const { getRecordList } = this.props;
    getRecordList({
      page: more ? this.state.page + 1 : this.state.page,
      size: 20,
      tradeType: 'OUT',
    }).then(res => {
      if (res.code === 200) {
        this.fetch = false;
        this.setState({
          isLoading: false,
          dataSource: dataSource.cloneWithRows(this.props.recordList.rows),
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
    if (nextPros.recordList.rows.length !== nextPros.recordList.total) {
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
    const { recordList } = this.props;
    const row = (i, d, s) => {
      return (
        <div className={styles.content} key={i.id}>
          <IntegralCard data={i} type="record" last={Number(s) === recordList.rows.length - 1} />
        </div>
      );
    };
    return (
      <div className={styles.page}>
        {recordList.total > 0 ? (
          <ListView
            dataSource={dataSource}
            renderFooter={() => (
              <div style={{ textAlign: 'center', padding: '0.1rem 0' }}>
                {isLoading
                  ? 'Loading...'
                  : hasMore
                  ? intl.get('commodity.loadMore')
                  : intl.get('integral.noMore')}
              </div>
            )}
            renderRow={row}
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
        ) : (
          <Empty text={intl.get('integral.emptyTip1')} />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  recordList: state.integral.data.recordList,
});

const mapDispatch = dispatch => ({
  getRecordList: params => dispatch.integral.getRecordList(params),
});

export default connect(mapState, mapDispatch)(Exchange);
