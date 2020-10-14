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
      dataList: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    commentJson.map(i => {
      if (i.id === Number(this.state.productId)) {
        this.setState({
          dataSource: dataSource.cloneWithRows(i.comment),
          dataList: i.comment
        })
        return
      }
    })
  }

  render() {
    const { dataSource, isLoading, hasMore, imgPre, imgList, imgIndex, dataList } = this.state;
    const row = i => {
      return (
        <div className={styles.listItem} key={i.time}>
          <ShowCard data={i} />
        </div>
      );
    };
    const tags =  [
      '好用+1', '便宜实惠+8', '方便好用+15', '价格优惠+5', '发货超快+8', '效果显著+9'
    ]
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
          精选评价
        </NavBar>
        <div className={styles.tagBox}>
          {tags.map(i => {
            return <span key={i}>{i}</span>
          })}
        </div>
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
                  style={{ backgroundColor: '#f7f7f7', height: '0.01rem' }}
                />
              )}
              useBodyScroll
              scrollRenderAheadDistance={500}
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
