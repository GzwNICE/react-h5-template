import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Modal , Carousel} from 'antd-mobile';

import moment from 'moment';
import intl from 'react-intl-universal';
import styles from './index.less';

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showImages: false,
    };
  }
  onUpdateClick(activityTurnNum, e) {
    e.stopPropagation();
    this.props.push(`/editShow/${activityTurnNum}`);
  }
  onImageMoreClick(e) {
    e.stopPropagation();
    this.setState({
      showImages: true,
    });
    // this.props.push(`/editShow/${activityTurnNum}`);
  }
  onClose(){
    this.setState({
      showImages: false,
    });
  }
  render() {
    const { data } = this.props;
    const { showImages } = this.state;

    return (
     <div className={styles.orderInfo}>
        <div className={styles.orderTitle}>{data.content}</div>
        <div className={styles.showImgs}>
          {data.imgList.map((i, index) => {
            if(index<=6)
            return <div className={styles.imgInfo}>
              <img className={styles.image} src={i.url} style={index!=0?{marginLeft:'12px'}:{}}></img>
                {index==6?(<div className={styles.imageMore} onClick={this.onImageMoreClick.bind(this)}>+{data.imgList.length}</div>):(<div></div>)} 
              </div>;
          })}
        </div>
        <div className={styles.produecInfo}>
          <img className={styles.logo} src={data.picUrl}></img>
          <div className={styles.name}>{data.productName}</div>
        </div>
        <div className={styles.orderStatus}>
          <div className={styles.status}>审核未通过</div>
          <div className={styles.time}>2019/10/01 13：00</div>
        </div>
        <div className={styles.reason}>{data.remark}</div>
        <div>
          <div className={styles.update} onClick={this.onUpdateClick.bind(this,data.id)}>修改</div>
        </div>
        <Modal
          visible={showImages}
          transparent
          maskClosable
          onClose={this.onClose.bind(this)}
          className={styles.imgPop}
          style={{ width: '322px', height: '430px' }}
        >
          <Carousel
            autoplay={false}
            infinite
            className={styles.banner}
            autoplayInterval={15000}
            dotActiveStyle={{ background: '#FF5209' }}
          >
            {data.imgList.map(val => (
                <img
                  src={val.url}
                  alt=""
                  style={{ width: '100%', height: '430px', verticalAlign: 'center' }}
                />
            ))}
          </Carousel>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Item);
