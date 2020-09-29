import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { Badge, Grid } from 'antd-mobile';
import { format } from '@/utils/util';
import intl from 'react-intl-universal';
import like from '@/assets/images/like.png';
import authorImg from '@/assets/images/avatar_notlogin.png';
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

  render() {
    const { data } = this.props;
    const { a } = this.state;
    return (
      <div className={styles.showCard}>
        <div className={styles.head}>
          <img src={authorImg} alt="" className={styles.userPic} />
          <div className={styles.rightBox}>
            <p className={styles.userName}>{data.userName}</p>
            <span className={styles.prodName}>{data.time}</span>
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
      </div>
    );
  }
}

export default ShowCard;
