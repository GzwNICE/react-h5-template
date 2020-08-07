/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import queryString from 'query-string';
import { NavBar, ListView, Icon, WhiteSpace } from 'antd-mobile';
import ShowCard from '@/components/showCard';
import ImgPreview from '@/components/imgPreview';
import styles from './index.less';

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class SingleRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: dataSource,
      productId: queryString.parse(window.location.search).productId,
      page: 1,
      hasMore: true,
      isLoading: false,
      fist: false,
      imgPre: false,
      imgList: [],
      imgIndex: 0,
    };
    this.initList = throttle(this.initList, 1000);
  }

  componentDidMount() {
    this.initList();
    window.scrollTo(0, 0);
  }

  initList = more => {
    const { getShowList } = this.props;
    getShowList({
      productId: this.state.productId,
      page: more ? this.state.page + 1 : this.state.page,
      size: 20,
    }).then(res => {
      if (res.code === 200) {
        this.fetch = false;
        this.setState({
          isLoading: false,
          page: res.data.page,
          dataSource: dataSource.cloneWithRows(this.props.showList.rows),
        });
      }
    });
  };

  onLikeClick = (id, like) => {
    const { userStart, changeStart } = this.props;
    userStart({
      topicId: id,
      likeStatus: like ? 0 : 1,
    }).then(res => {
      if (res.code === 200) {
        changeStart({
          topicId: id,
          likeStatus: like ? 0 : 1,
        }).then(() => {
          this.setState({
            dataSource: dataSource.cloneWithRows(this.props.showList.rows),
          });
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
    if (nextPros.showList.rows.length !== nextPros.showList.total) {
      this.setState({
        hasMore: true,
      });
    } else {
      this.setState({
        hasMore: false,
      });
    }
  }

  imgPreview = (list, index) => {
    this.setState(
      {
        imgList: list,
        imgIndex: index,
      },
      () => {
        this.setState({
          imgPre: true,
        });
      }
    );
  };

  cancelPreview = () => {
    this.setState({
      imgList: [],
      imgIndex: 0,
      imgPre: false,
    });
  };

  render() {
    const { dataSource, isLoading, hasMore, imgPre, imgList, imgIndex } = this.state;
    const { showList } = this.props;
    const row = i => {
      return (
        <div className={styles.listItem} key={i.id}>
          <ShowCard data={i} onLikeClick={this.onLikeClick} preview={this.imgPreview} />
        </div>
      );
    };
    // console.log(dataSource);
    return (
      <div className={styles.singleRecord}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          晒单记录
        </NavBar>
        <div className={styles.list}>
          {showList.total > 0 ? (
            <ListView
              dataSource={dataSource}
              renderFooter={() => (
                <div style={{ textAlign: 'center' }}>
                  {isLoading ? 'Loading...' : hasMore ? '加载更多...' : '没有更多了！'}
                </div>
              )}
              renderRow={row}
              renderSeparator={(sectionID, rowID) => (
                <WhiteSpace
                  key={`${sectionID}-${rowID}`}
                  size="md"
                  style={{ backgroundColor: '#f7f7f7', height: '0.1rem' }}
                />
              )}
              useBodyScroll
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          ) : (
            <div className={styles.loading}>Loading...</div>
          )}
        </div>
        {imgPre ? <ImgPreview data={imgList} index={imgIndex} cancel={this.cancelPreview} /> : null}
      </div>
    );
  }
}

const mapState = state => ({
  showList: state.product.data.showList,
});

const mapDispatch = dispatch => ({
  getShowList: params => dispatch.product.getShowList(params),
  userStart: params => dispatch.product.userStart(params),
  changeStart: params => dispatch.product.changeStart(params),
});

export default connect(mapState, mapDispatch)(SingleRecord);
