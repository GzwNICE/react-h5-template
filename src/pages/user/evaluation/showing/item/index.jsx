import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import intl from 'react-intl-universal';
import styles from './index.less';

class Item extends PureComponent {
  constructor(props) {
    super(props);
  }
  onUpdateClick(activityTurnNum, e) {
    e.stopPropagation();
    this.props.push(`/editShow/${activityTurnNum}`);
  }

  render() {
    const { data } = this.props;
    return (
     <div className={styles.orderInfo}>
        <div className={styles.orderTitle}>{data.content}</div>
        <div className={styles.showImgs}>
          {data.imgList.map((i, index) => {
            return <img className={styles.image} src={i.url} style={index!=0?{marginLeft:'12px'}:{}}></img>;
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
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Item);
