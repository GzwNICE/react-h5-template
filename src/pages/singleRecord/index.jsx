/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import queryString from 'query-string';
import { NavBar, ListView, Icon, WhiteSpace } from 'antd-mobile';
import ShowCard from '@/components/showCard';
import ImgPreview from '@/components/imgPreview';
import commentJson from '@/assets/json/comment.json';
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
      hasMore: false,
      isLoading: false,
      imgPre: false,
      imgList: [],
      imgIndex: 0,
    };
    this.initList = throttle(this.initList, 1000);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    commentJson.map(i => {
      if (i.id === Number(this.state.productId)) {
        console.log(i.comment);
        this.setState({
          dataSource: dataSource.cloneWithRows(i.comment)
        })
        return
      }
    })
  }

  render() {
    const { dataSource, isLoading, hasMore, imgPre, imgList, imgIndex } = this.state;
    const { showList } = this.props;
    const row = i => {
      return (
        <div className={styles.listItem} key={i.id}>
          <ShowCard data={i} />
        </div>
      );
    };
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
          用户评价
        </NavBar>
        <div className={styles.list}>
            <ListView
              dataSource={dataSource}
              renderFooter={() => (
                <div style={{ textAlign: 'center' }}>
                  {isLoading
                    ? 'Loading...'
                    : hasMore
                    ? intl.get('commodity.loadMore')
                    : intl.get('list.isEnd')}
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
              // onEndReached={this.onEndReached}
              // onEndReachedThreshold={10}
            />
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
