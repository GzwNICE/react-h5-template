import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { Badge, Grid } from 'antd-mobile';
import { format } from '@/utils/util';
import intl from 'react-intl-universal';
import like from '@/assets/images/ic_redstar@3x.png';
import authorImg from '@/assets/images/avatar_.png';
import styles from './index.less';

const imagesContext = require.context('@/assets/images/comment', false, /\.png$/);
class ShowCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
    };
  }

  preview(list, index) {
    this.props.preview(list, index);
  }

  handlerLick(id, like) {
    const { onLikeClick } = this.props;
    onLikeClick(id, like);
  }

  componentWillReceiveProps() {
    this.setState({
      a: !this.state.a,
    });
  }

  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + '.' + m + '.' + d;
  }

  render() {
    const { data } = this.props;
    const { a } = this.state;
    return (
      <div className={styles.showCard}>
        <div className={styles.head}>
          <img src={authorImg} alt="" className={styles.userPic} />
          <div className={styles.rightBox}>
            <p className={styles.userName}>{data.userName}</p>
            <img src={like} alt="" style={{ width: '12px', marginRight: '2px' }}/>
            <img src={like} alt="" style={{ width: '12px', marginRight: '2px' }}/>
            <img src={like} alt="" style={{ width: '12px', marginRight: '2px' }}/>
            <img src={like} alt="" style={{ width: '12px', marginRight: '2px' }}/>
            <img src={like} alt="" style={{ width: '12px', marginRight: '2px' }}/>
          </div>
        </div>
        <div className={styles.content}>
          <span className={styles.text}>{data.content}</span>
        </div>
        {data.imgList ? ( <img
          src={imagesContext(data.imgList)}
          className={styles.imgItem}
          alt="img"
        />) : null}
        <div className={styles.bb}>
          <span className={styles.prodName}>{`${this.getDateStr(-data.time[0])} ${data.time[1]}`}</span>
          <span className={styles.ll}>{`浏览量 ${data.star}`}</span>
        </div>
      </div>
    );
  }
}

export default ShowCard;
